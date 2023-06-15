const {getMemberById,getAllMembers,createNewMember} = require ('../controllers/membersController')


const express = require('express')

const router = express.Router()

router.get('/members', getAllMembers)
router.get('/members/:member_id', getMemberById)
router.post('/members/:member_id', createNewMember)

module.exports =router