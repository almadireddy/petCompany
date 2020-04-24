const chance = require("chance").Chance();

const knex = require("knex")({
  client: 'mysql',
  version: '8.0',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'PET_SALON'
  }
})

const generate = async (hourly, count) => {
  for (let i = 0; i < count; i++) {
    const e = {
      ssn: chance.ssn(), 
      name: chance.name(), 
      phone_number: chance.phone({ formatted: false}),
      email: chance.email(),
      hourly_wage: hourly ? chance.floating({min: 0, max: 70, fixed: 2}) : 0,
      salary: hourly ? 0 : chance.integer({ min: 50000, max: 100000 }) 
    }
  
    try {
      await knex.insert(e).into("employee")
      console.log("inserted", i)
    } catch (e) {
      console.error(e.code, e.sqlMessage);
    }
  }  
}

const employeeTypes = async () => {
  for (let i = 1; i <= 5; i++) {
    console.log(`inserting employee ${i} into receptionist`)
    await knex.insert({ ReceptionistID: i }).into("receptionist")
  }

  for (let i = 6; i <= 62; i++) {
    console.log(`inserting employee ${i} into groomers`)
    await knex.insert({ GroomerID: i}).into("groomer");
  }

  console.log(`inserting employees 63, 64, 65 into managers`)
  await knex.insert([
    { ManagerID: 65 },
    { ManagerID: 64 },
    { ManagerID: 63 },
  ]).into("manager");
}

const shifts = async () => {
  const now = new Date();
  
  for (let d = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()); d <= now; d.setDate(d.getDate() + 1)) {
    const date = new Date(d);
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
    
    console.log(`Inserting shifts on ${d}`);
    let [amId] = await knex.insert(shift).into("shift");    
    let [pmId] = await knex.insert(pmShift).into("shift");
    
    console.log(`Inserting groomers for that shift.`);
    let end = 5;
    for (let i = 0; i < end; i++) {
      try {
        await knex.insert({groomer_id: chance.integer({min: 6, max: 62}), shift_id: amId})
          .into("groomer_shift")
        await knex.insert({groomer_id: chance.integer({min: 6, max: 62}), shift_id: pmId})
          .into("groomer_shift")
      } catch (e) {
        end++;
      }
    }
  }
}

(async () => {
  try {
    await generate(true, 50);
    await generate(false, 15);
    await employeeTypes();
    await shifts();

  } catch (e) {
    console.log(e);
    console.log("Error has occured. Rerun SQL file and run this again.")
  }
  knex.destroy();
})()
