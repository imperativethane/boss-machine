const express = require('express');
const ideasRouter = express.Router();

const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    };
});

ideasRouter.get('/', (req, res) => {
    const ideas= getAllFromDatabase('ideas');
    if (ideas[0].id !== undefined) {
        res.send(ideas)
    } else {
        res.status(404).send();
    }
})

ideasRouter.get('/:ideaId', (req, res) => {
    res.send(req.idea)
})

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res) => {
    let updatedInstance = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedInstance);    
})

ideasRouter.post('/', checkMillionDollarIdea, (req, res) => {
    let addedInstance = addToDatabase('ideas', req.body);
    res.status(201).send(addedInstance);
})

ideasRouter.delete('/:ideaId', (req, res) => {
    let deleteInstance = deleteFromDatabasebyId('ideas', req.idea.id);
    res.status(204).send(deleteInstance);
})

module.exports = ideasRouter;
