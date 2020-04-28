const express = require('express');
const bodyParser = require('body-parser');

const router = express();
router.use(bodyParser.json());

const cors = require('cors');
router.use(cors());

router.post('/', async(req, res, next) => {
    const [ table, state ] = req.body;
    console.log(table);
    console.log(state);
    res.send('completed');
})

router.get('/', (res, req) => {
    console.log('hello world')
    res.send('completed');
});

router.listen(8000, () => console.log('listening on port 8000'));