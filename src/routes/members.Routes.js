const { getMemberById, getAllMembers, createNewMember } = require('../controllers/membersController')


const express = require('express')

const membersRouter = express.Router()


membersRouter.post('/members/:member_id', createNewMember)

membersRouter.get('/members', getAllMembers)
membersRouter.get('/members/:member_id', getMemberById)


module.exports = membersRouter