import users from '../models/users.js'

export const createUser = async (req, res) => {
  try {
    const result = await users.create(req.body)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
