const bcrypt = require('bcryptjs')

module.exports = {

  register: async (req, res) => {
    console.log('reg hit')
    let dbInstance = req.app.get('db')
    let { phone, firstName, email, lastName, venmo } = req.body
    const { session } = req
    phone = phone.toString()

    console.log('PHONE', typeof (phone.toString()))

    let exists = await dbInstance.find_user_by_phone([phone])
    exists = +exists[0].count
    console.log('exists value', exists)
    //if user does not exist
    if (exists !== 0) {
      return res.sendStatus(409)
    }


    let salt = bcrypt.genSaltSync(10)
    let hashedPass = bcrypt.hashSync(req.body.pass, salt)


    const user = await dbInstance.register_new_user([firstName, lastName, email, phone, hashedPass, venmo])


    user[0].isLoggedIn = true


    session.user = user[0]

    console.log(session)

    res.status(200).send(session)

  },

  login: async (req, res) => {
    console.log('hit login', req.body)
    let { email: loginEmail } = req.body
    let dbInstance = req.app.get('db')
    const { session } = req


    try {
      let loginUser = await dbInstance.find_user_by_email([loginEmail])
      if(!loginUser[0]){
        return res.sendStatus(409)
      }
      loginUser[0].isLoggedIn = true
      console.log(loginUser, "loginAttempt", req.body.pass, loginUser[0].pass_hash, "passwords")
      
      session.user = loginUser[0]

      const authenticated = bcrypt.compareSync(req.body.pass, loginUser[0].pass_hash)

      console.log(authenticated, 'authenticated?')

      if (authenticated) {

        delete session.user.pass_hash

        try {
          //get user's gigs
          let userGigs = await dbInstance.get_gigs_by_user_id(session.user.id)
          // console.log(userGigs, "USER GIGS")

          session.gigs = userGigs


          //get gig's tasks

          for (let i = 0; i < session.gigs.length; i++) {

            let gigTasks = await dbInstance.get_tasks_by_gig_id(session.gigs[i].id)
            session.gigs[i].tasks = gigTasks

          }

// session.gigs.forEach(async (el, i)=>{
//    gigTasks= await dbInstance.get_tasks_by_gig_id(el.id)
//   session.gigs[i].tasks=gigTasks
// })




// console.log("tasks added", session.gigs[0].tasks)

          //get client. 


        } catch (error) {
          console.log('error in for loop', error)
        }


        res.status(200).send(session)
      } 
      // else {
      //   throw new Error(401)
      // }

    } catch (err) {
      res.sendStatus(500)  //this is hitting when we log in with new users causing problems
      console.log(err)
    }






  },

  logout: (req, res) => {
    req.session.destroy()

    res.sendStatus(200)
  },

  deleteUser: (req, res) => {

  },

  getSession: (req, res) => {
    if (req.session.user) {
      res.send(req.session).status(200)

    } else {
      res.sendStatus(418)
    }

  }

}