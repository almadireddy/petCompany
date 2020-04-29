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
    console.log(table);
    console.log(data);
    try {
        let x = await knex.insert(data).into(table);
        console.log(x)
        res.send('inserted ' + table);
    } catch (err) {
        console.error(err.code, err.sqlMessage);
        res.send(err.sqlMessage);
    }
})

router.get('/query', async(req, res) => {
    console.log(req.query);
    //console.log(e);
    let x = await valtosql(req.query['value']);
    console.log(x);
    res.send({x});
})

async function valtosql(val) {
    try {
        switch (parseInt(val)) {
            case 0:
                let x = await knex('pet').count('*');
                return x[0]['count(*)'];
                break;
            default:
                return 'error';
                break;
        }
    } catch (err) {
        console.error(err.code, err.sqlMessage);
        return(err.sqlMessage);
    }
}

router.listen(8000, () => console.log('listening on port 8000'));