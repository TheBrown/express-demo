const Joi = require('joi');
const expres = require('express');
const app = expres();

app.use(expres.json());

const genres = [
    { id: 1, video: "kuy1" },
    { id: 2, video: "kuy2", },
    { id: 3, video: "kuy3", },
    { id: 4, video: "kuy4", }
];

app.get('/', (req, res) => {
    res.send('Hello mother fucking world!!!');
})

app.get('/api/genres', (req, res) => {
    res.send(genres);
})

app.get('/api/genres/:id', (req, res) => {
    genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('the genre with the given id was not found');
    res.send(genre);
})

app.post('/api/genres', (req, res) => {
    const { error } = validationVideo(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        video: req.body.video
    };

    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The course with the given ID was not found')

    const { error } = validationVideo(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.video = req.body.video;
    res.send(genre);



});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The course with the given ID was not found')

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);


});

function validationVideo(video) {
    const schema = {
        video: Joi.string().min(5).required()
    }

    return Joi.validate(video, schema);

}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at port ${port}...`));