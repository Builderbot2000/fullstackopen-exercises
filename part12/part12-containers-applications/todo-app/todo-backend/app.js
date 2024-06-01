const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');
const { getAsync } = require('./redis');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());

/* GET counter value */
app.get('/statistics', async (req, res)=>{
    let stats = await getAsync('counter')
    if (!stats || stats === "NaN") stats = 0
    res.json({addedTodos: parseInt(stats)})
})

app.use('/', indexRouter);
app.use('/todos', todosRouter);

module.exports = app;
