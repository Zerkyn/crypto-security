const bcrypt = require('bcryptjs')
const users = []

module.exports = {
  login: (req, res) => {
    console.log('Logging In User')
    // console.log(req.body)
    const { username, password } = req.body
    for (let i = 0; i < users.length; i++) {
      const existingPass = bcrypt.compareSync(password, users[i].password)
      if (users[i].username === username && existingPass) {

        let userReturn = { ...users[i] }
        delete userReturn.password
        console.log(userReturn)
        return res.status(200).send(userReturn)
      }
    }
    res.status(400).send("User not found.")
  },
  register: (req, res) => {
    console.log('Registering User')
    // console.log(req.body)
    const { username, email, firstName, lastName, password } = req.body
    const salt = bcrypt.genSaltSync(5)
    const passHash = bcrypt.hashSync(password, salt)
    let user = {
      username,
      email,
      firstName,
      lastName,
      password: passHash
    }
    users.push(user)
    let securePass = { ...user }
    // console.log(users)
    // delete securePass.password
    // console.log(securePass)
    res.status(200).send(securePass)
  }
}