import express from 'express'
import { createUser } from '../controller/users.js'
const router = express.Router()

router.post('/', createUser)

export default router
