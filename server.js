const express = require('express');
const bodyParser = require('body-parser');

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

const router = express();
router.use(bodyParser.json());

const cors = require('cors');
router.use(cors());

router.post('/', async(req, res, next) => {
    const [ table, data ] = req.body;
    console.log(table);
    console.log(data);
    try {
        await knex.insert(data).into(table);
        res.send('completed');
    } catch (err) {
        console.error(err.code, err.sqlMessage);
        res.send('error');
    }
})

router.get('/', (res, req) => {
    console.log('hello world')
    res.send('completed');
});

router.listen(8000, () => console.log('listening on port 8000'));