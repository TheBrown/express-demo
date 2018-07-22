const mongoose = require('mongoose');

const expres = require('express');
const app = expres();
const genres = require('./routes/genres');
const customers = require('./routes/customers');

mongoose.connect('mongodb://localhost/vidly')
.then(() => console.log(' Connect to MongoDb...'))
.catch(err => console.error('Could not connect to MongoDB...'));

app.use(expres.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers)

app.get('/', (req, res) => {
    res.send('Hello mother fucking world!!!');
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at port ${port}...`));