const Joi = require('joi');
const expres = require('express');
const app = expres();
const genres = require('./routes/genres');

app.use(expres.json());
app.use('/api/genres', genres);

app.get('/', (req, res) => {
    res.send('Hello mother fucking world!!!');
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at port ${port}...`));