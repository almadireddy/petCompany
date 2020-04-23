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

const generate = async (hourly, min, max) => {
  for (let i = min; i < max; i++) {
    const e = {
      employeeId: i,
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

(async () => {
  await generate(true, 1, 51);
  await generate(false, 52, 52+15);
  knex.destroy();
})()
