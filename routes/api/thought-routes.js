const router = require('express').Router();

const {
    getAllThought,
    getOneThought,
    addThought,
    updateThought,
    removeThought
} = require('../../controllers/thought-controller')

router
    .route('/')
    .get(getAllThought)
    .post(addThought);

router
    .route('/:id')
    .get(getOneThought)
    .put(updateThought)
    .delete(removeThought);

module.exports = router;