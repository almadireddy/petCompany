const express = require('express');
const bodyParser = require('body-parser');

const knex = require("knex")({
    client: 'mysql',
    version: '8.0',
    connection: {
        host : '127.0.0.1',
        user : 'root',
        password : 'password',
        database : 'PET_SALON'
    }
})

const router = express();
router.use(bodyParser.json());

const cors = require('cors');
router.use(cors());

router.post('/', async(req, res, next) => {
    const [ table, data ] = req.body;
    //console.log(table);
    //console.log(data);
    try {
        let x = await knex.insert(data).into(table);
        //console.log(x)
        res.send('inserted ' + table);
    } catch (err) {
        //console.error(err.code, err.sqlMessage);
        res.send(err.sqlMessage);
    }
})

router.get('/sample-query', async(req, res) => {
    //console.log(req.query);
    //console.log(e);
    let x = await valtosql(req.query['value']);
    //console.log(x);
    res.send(x);
})

router.get('/query', async(req, res) => {
    //console.log(req.query);
    let x;
    try {
        x = await knex.raw(req.query['value']);
        x = x[0];
        //console.log(x);
    } catch (err) {
        console.error(err.code, err.sqlMessage);
        x = null;
    }
    res.send(x);
})

async function valtosql(val) {
    try {
        let x;
        switch (parseInt(val)) {
            case 0:
                x = await knex('pet').count('*');
                //console.log(x);
                return x;
                break;
            case 1:
                x = await knex.select('fname', 'lname', 'minit')
                .from('client');
                return x;
                break;
            case 2:
                x = await knex.raw('SELECT DISTINCT r.name AS receptionist, m.name AS manager\
                FROM EMPLOYEE r, EMPLOYEE m, SHIFT \
                WHERE SHIFT.supervisor = r.employee_id AND SHIFT.receptionist = m.employee_id;');
                return x[0];
                break;
            case 3:
                x = await knex.raw('SELECT AVG((HOUR(a.duration) + MINUTE(a.duration)/60) \
                * g.hourly_wage) AS cost\
                FROM APPOINTMENT a, EMPLOYEE g \
                WHERE a.groomer_id = g.employee_id;');
                return x[0];
                break;
            case 4:
                x = await knex.raw('SELECT * \
                FROM APPOINTMENT \
                WHERE date(start_time) = CURDATE() \
                ORDER BY start_time;');
                return x[0];
                break;
            default:
                return null;
                break;
        }
    } catch (err) {
        //console.error(err.code, err.sqlMessage);
        return(null);
    }
}

router.listen(8000, () => console.log('listening on port 8000'));