import users from '../models/users.js'
import jwt from 'jsonwebtoken'

// 新增使用者
export const createUser = async (req, res) => {
  try {
    const result = await users.create(req.body)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 使用者登入
export const login = async (req, res) => {
  try {
    // 查詢是否有此使用者
    const result = await users.findOne(req.body)
    // 若無此使用者, 回傳錯誤訊息
    if (result === null) {
      res.status(404).send({ success: false, message: '帳號或密碼錯誤' })
    } else {
      // 若有此使用者, 簽發一個 jwt, 七天後過期
      const token = jwt.sign(
        // jwt 內容資料
        { _id: result._id.toString() },
        // 加密用的key
        process.env.SECRET,
        // jwt 設定
        { expiresIn: '7 days' }
      )
      result.jwt.push(token)
      result.save()
      res.status(200).send({ success: true, message: '', token })
    }
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// postman authorization bearer token 符合使用者的 jwt 可以取得使用者的資訊, 反之則出現錯誤訊息
export const getUser = async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      res.status(200).send({ success: true, message: '', result: req.user })
    } else {
      res.status(403).send({ success: false, message: '沒有權限' })
    }
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 使用者登出
export const logout = async (req, res) => {
  try {
    req.user.jwt = req.user.jwt.filter(token => {
      return token !== req.token
    })
    req.user.save()
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 上傳檔案
export const changeAvatar = async (req, res) => {
  try {
    const result = await users.findByIdAndUpdate(req.params.id, { avatar: req.filepath })
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
