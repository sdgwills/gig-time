require('dotenv').config()

const {TWILIO_SID, TWILIO_AUTH_TOKEN}= process.env

const client=require('twilio')(TWILIO_SID, TWILIO_AUTH_TOKEN)


module.exports= {

textAlert: (clientPhone, gigTotal, userFirst, userVenmo)=>{

console.log('client phone', clientPhone)

  client.messages.create({
    body:`Your project has been finished! Please send ${gigTotal} to ${userFirst}'s venmo ${userVenmo} at your earliest convenience.`,
    from:"+17244715070", 
    to:`+1${clientPhone}` 
  }).then(message=>{
    console.log("the message worked you're a genius")
  return "message sent"
  }
  )


}



}





