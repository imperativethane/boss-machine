const express = require('express');
const meetingsRouter = express.Router();

const { createMeeting, getAllFromDatabase, addToDatabase, deleteAllFromDatabase } = require('./db.js');

meetingsRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('meetings'));
})

meetingsRouter.post('/', (req, res) => {
    createdMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(createdMeeting);
})

meetingsRouter.delete('/', (req, res) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
})

module.exports = meetingsRouter;
