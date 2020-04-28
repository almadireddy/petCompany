const chance = require("chance").Chance();
const knex = require("knex")({
  client: 'mysql',
  version: '8.0',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'PET_SALON'
  },
})

const shifts = async () => {
  console.log(`Inserting shifts and assigning employees`);
  const now = new Date();
  
  for (let d = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()); d <= now; d.setDate(d.getDate() + 1)) {
    const shift = {
      date: d,
      shift_type: "am",
      supervisor: chance.integer({min: 63, max: 65}),
      receptionist: chance.integer({min: 1, max: 5}),
    }
    const pmShift = {
      date: d, 
      shift_type: "pm",
      supervisor: chance.integer({min: 63, max: 65}),
      receptionist: chance.integer({min: 1, max: 5}),
    }
    
    let [amId] = await knex.insert(shift).into("shift");    
    let [pmId] = await knex.insert(pmShift).into("shift");
    
    let end = 5;
    const amGroomers = new Set()
    const pmGroomers = new Set()
    for (let i = 0; i < end; i++) {
      let am = chance.integer({min: 6, max: 62});
      if(amGroomers.has(am)) {
        end++;
        continue;
      }
      amGroomers.add(am)
    }

    end = 5;
    for (let i = 0; i < end; i++) {
      let pm = chance.integer({min: 6, max: 62});
      if(pmGroomers.has(pm)) {
        end++;
        continue;
      }
      pmGroomers.add(pm)
    }

    const pets = await knex.select("*").from("PET");

    for (const g_id of amGroomers) {
      try {
        await knex.insert({groomer_id: g_id, shift_id: amId})
          .into("groomer_shift")
      } catch (e) {
        console.error("failed to insert groomer into am shift")
      }

      const appointmentDate = new Date(d.getFullYear(), 
        d.getMonth(), 
        d.getDate(), 
        chance.integer({min: 8, max: 11}), 
        chance.integer({min: 0, max: 59}));

      const petIndex = chance.integer({min: 0, max: pets.length - 1});

      const app = {
        duration: "01:00:00",
        start_time: appointmentDate,
        groomer_id: g_id,
        owner_id: pets[petIndex]["Owner_ID"],
        pet_name: pets[petIndex]["Name"],
      }
      try {
        await knex.insert(app).into("appointment")
      } catch (e) {
        console.error("Failed to insert appointment", e)
        return
      }
    }
    for (const g_id of pmGroomers) {
      try {
        await knex.insert({groomer_id: g_id, shift_id: pmId})
          .into("groomer_shift")
      } catch (e) {
        console.error("failed to insert groomer into am shift")
      }

      const appointmentDate = new Date(d.getFullYear(), 
        d.getMonth(), 
        d.getDate(), 
        chance.integer({min: 12, max: 16}), 
        chance.integer({min: 0, max: 59}));

      const petIndex = chance.integer({min: 1, max: pets.length - 1});

      const app = {
        duration: "01:00:00",
        start_time: appointmentDate,
        groomer_id: g_id,
        owner_id: pets[petIndex]["Owner_ID"],
        pet_name: pets[petIndex]["Name"],
      }
      try {
        await knex.insert(app).into("appointment")
      } catch (e) {
        console.error("Failed to insert appointment", e)
        return
      }
    }
  }
  console.log(`Done inserting shifts and assigning employees`);
}


(async () => {
  try {
    await shifts();
  } catch (e) {
    console.log(e);
    console.log("Error has occured. Rerun SQL file and run this again.")
  }
  knex.destroy();
})()
