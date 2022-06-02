const { GOOGLE } = process.env
const axios= require('axios')

module.exports = {


  sendEmail: function () {


    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dropinappinfo@gmail.com',
        pass: GOOGLE
      }
    });

    var mailOptions = {
      from: 'dropinappinfo@gmail.com',
      to: 'jhankney@gmail.com',
      subject: 'Sending Email using Node.js',
      text: 'DANK MEMES'
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    
    return "email sent"
    
  },


  testDb: async (obj) => {
    let user_id = 6
    const db = obj.app.get('db')
    const { gigName, gigDesc, rate, clientFName, clientLName, clientPhone, email } = obj


    try {
      let oldGigs = await db.get_gigs_by_user_id(user_id)
      await db.create_gig([user_id, gigName, gigDesc, rate])
      let newGigs = await db.get_gigs_by_user_id(user_id)


    } catch (error) {
      res.status(500).send(error)
    }

  },


  testGet: () => {
    //find a get request and test the expected behavior
    axios.get('/getsession').then(res => {
      console.log('get session', res)
      return res.data.session
    })

  },


  login: (email, pass) => {
    //test login function 
    axios.post('/users/login', { email, pass }).then(res => {
      //update redux store
      console.log(res.data, 'res data')



    })
  },

  //tests the redux store update when passed in something. 

  reducer: (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
      case 'USER_INFO':
        return {
          ...state,
          user_id: payload.user.id,
          firstName: payload.user.first_name,
          lastName: payload.user.last_name,
          email: payload.user.email,
          phoneNumber: payload.user.phone_number,
          jobTitle: payload.user.job_title,
          street: payload.user.street,
          city: payload.user.city,
          zip: payload.user.zip,
          _state: payload.user._state,
          gigs: payload.gigs
        }
      case 'LOGOUT':
        return initialState
      case 'TASK_TIME':
        return {
          ...state,
          taskTime: payload + state.taskTime
        }

      case 'UPDATE_GIGS':
        return {
          ...state,
          gigs: payload
        }

      default:
        return state
    }
  },

fetchData: async (query, config) => {
    try {
      const { data } = await axios.request({
        method: 'get',
        url: encodeURI(query),
        ...config
      });
  
      return data;
    } catch (e) {
      console.error('Could not fetchData', e);
    }
  }

}