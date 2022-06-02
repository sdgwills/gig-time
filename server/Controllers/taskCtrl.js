module.exports = {
  getGigTasks: async (req, res) => {
    let db = req.app.get('db')
    let { gigId } = req.params

    //doesn't exist yet

    try {
      let gigTasks = await db.get_gig_tasks([gigId])

      res.status(200).send(gigTasks)

    }

    catch (err) {
      res.status(500).send(err)
    }




  },

  createTask: async (req, res) => {
    let { taskTitle, taskDesc, gig_id } = req.body
    let gigId = +gig_id
    console.log(req.body, 'did this get fired?')
    let db = req.app.get('db')
    const { session } = req

    try {
      let dbRes = await db.create_task({ taskTitle, taskDesc, gigId })
      let userGigs = await db.get_gigs_by_user_id(session.user.id)
      session.gigs = userGigs
      for (let i = 0; i < session.gigs.length; i++) {

        let gigTasks = await db.get_tasks_by_gig_id(session.gigs[i].id)
        session.gigs[i].tasks = gigTasks
      }
      session.gigs = userGigs
      console.log(dbRes)
      res.status(200).send(session)
    } catch (error) {
      res.status(500).send(error)
    }



  },

  editTask: async (req, res) => {

    console.log(`update task fired`, req.params, req.body)
    const db = req.app.get('db')
    const { taskId } = req.params;
    const { session } = req
    let id = taskId
    const { task_title, task_desc } = req.body
    await db.edit_task({ id, task_title, task_desc })
    let userGigs = await db.get_gigs_by_user_id(session.user.id)
      session.gigs = userGigs
      for (let i = 0; i < session.gigs.length; i++) {

        let gigTasks = await db.get_tasks_by_gig_id(session.gigs[i].id)
        session.gigs[i].tasks = gigTasks
      }
      session.gigs = userGigs
      
      res.status(200).send(session)

  },


  deleteTask: async(req, res) => {
    const db = req.app.get('db')
    let { taskId } = req.params
    const { session } = req
    console.log(`delete gig was fired`, taskId)

    await db.delete_task({ taskId })
    let userGigs = await db.get_gigs_by_user_id(session.user.id)
      session.gigs = userGigs
      for (let i = 0; i < session.gigs.length; i++) {

        let gigTasks = await db.get_tasks_by_gig_id(session.gigs[i].id)
        session.gigs[i].tasks = gigTasks
      }
      session.gigs = userGigs
      
      res.status(200).send(session)
    

  },

}
