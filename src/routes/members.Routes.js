const {getMemberById} = require ('../controllers/membersController')


const express = require('express')

const router = express.Router()

router.get('/members/:member_id', getMemberById)


module.exports =router