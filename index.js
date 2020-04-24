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
