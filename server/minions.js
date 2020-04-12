const express = require('express');
const minionsRouter = express.Router();

const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, getWorkByMinionId } = require('./db.js')

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send();
    };
});

minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
        req.work = work;
        next();
    } else {
        res.status(404).send();
    };
});

minionsRouter.get('/', (req, res) => {
    const minions = getAllFromDatabase('minions');
    if (minions[0].id !== undefined) {
        res.send(minions)
    } else {
        res.status(404).send();
    }
})

minionsRouter.get('/:minionId', (req, res) => {
    res.send(req.minion)
})

minionsRouter.put('/:minionId', (req, res) => {
    let updatedInstance = updateInstanceInDatabase('minions', req.body);
    res.send(updatedInstance);    
})

minionsRouter.post('/', (req, res) => {
    let addedInstance = addToDatabase('minions', req.body);
    res.status(201).send(addedInstance);
})

minionsRouter.delete('/:minionId', (req, res) => {
    let deleteInstance = deleteFromDatabasebyId('minions', req.minion.id);
    res.status(204).send(deleteInstance);
})

minionsRouter.get('/:minionId/work', (req, res, next) => {
    const minionWork = getAllFromDatabase('work').filter((singleWork) => {
        return singleWork.id === req.minion.id
    })
    res.send(minionWork)
})

minionsRouter.put('/:minionId/work/:workId', (req, res) => {
    req.body.minionId  = req.params.minionId;

    if (req.params.minionId === req.work.minionId) {
        res.send(updateInstanceInDatabase('work', req.body));       
    } else {
        res.status(400).send();
    }
})

minionsRouter.post('/:minionId/work', (req, res) => {
    res.status(201).send(addToDatabase('work', req.body));
})

minionsRouter.delete('/:minionId/work/:workId', (req, res) => {
    let deleteInstance = deleteFromDatabasebyId('work', req.work.id);
    res.status(204).send(deleteInstance);
})



module.exports = minionsRouter;