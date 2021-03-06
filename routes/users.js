import express from 'express'
import auth from '../middleware/auth.js'
import upload from '../middleware/upload.js'
import { createUser, login, getUser, logout, changeAvatar } from '../controller/users.js'

const router = express.Router()

router.post('/', createUser)
router.post('/login', login)
// 要放在 auth 上面
router.delete('/logout', auth, logout)
router.get('/:id', auth, getUser)
// 先後順序, 先確認使用者有無權限(auth), 在處理上傳(upload)
router.patch('/:id', auth, upload, changeAvatar)

export default router
