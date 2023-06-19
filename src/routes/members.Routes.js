const { getMemberById, getAllMembers, createNewMember } = require('../controllers/membersController')


const express = require('express')

const membersRouter = express.Router()

membersRouter.get('/members', getAllMembers)
membersRouter.get('/members/:member_id', getMemberById)
membersRouter.post('/members/:member_id', createNewMember)

module.exports = membersRouter