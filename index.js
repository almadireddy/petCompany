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

const generate = async (hourly, count) => {
  console.log("inserting employees")
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
    } catch (e) {
      console.error(e.code, e.sqlMessage);
    }
  }  
}

const employeeTypes = async () => {
  console.log(`inserting employees into receptionist`)
  for (let i = 1; i <= 5; i++) {
    await knex.insert({ Receptionist_ID: i }).into("receptionist")
  }

  console.log(`inserting employees into groomers`)
  for (let i = 6; i <= 62; i++) {
    await knex.insert({ Groomer_ID: i}).into("groomer");
  }

  console.log(`inserting employees 63, 64, 65 into managers`)
  await knex.insert([
    { Manager_ID: 65 },
    { Manager_ID: 64 },
    { Manager_ID: 63 },
  ]).into("manager");
}

const clients = async () => {
  console.log("Inserting clients")
  for (let i = 0; i < 825; i++) {
    const c = {
      fname: chance.first(),
      lname: chance.last(),
      minit: chance.letter({casing: "upper"}),
      phone_number: chance.phone({formatted: false}),
      email: chance.email(),
      address: chance.address(),
      birthday: chance.birthday()
    }
    
    try {
      await knex.insert(c).into("client");
    } catch (e) {
      console.log(`Failed to insert client ${i}`)
    }
  }
}

(async () => {
  try {
    await generate(true, 50);
    await generate(false, 15);
    await employeeTypes();
    await clients();
  } catch (e) {
    console.log(e);
    console.log("Error has occured. Rerun SQL file and run this again.")
  }
  knex.destroy();
})()
