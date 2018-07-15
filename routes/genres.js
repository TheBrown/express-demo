const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, video: "kuy1" },
    { id: 2, video: "kuy2", },
    { id: 3, video: "kuy3", },
    { id: 4, video: "kuy4", }
];

router.get('/', (req, res) => {
    res.send(genres);
})

router.get('/:id', (req, res) => {
    genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('the genre with the given id was not found');
    res.send(genre);
})

router.post('/', (req, res) => {
    const { error } = validationVideo(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        video: req.body.video
    };

    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The course with the given ID was not found')

    const { error } = validationVideo(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.video = req.body.video;
    res.send(genre);



});

router.delete('/:id', (req, res) => {
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

module.exports = router;