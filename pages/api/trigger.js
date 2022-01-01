import prisma from '../../lib/prisma'
const client = require('twilio')(process.env.TWILIO_ID, process.env.TWILIO_AUTH);

export default async function trigger(req, res) {
  const accounts = await prisma.user.findMany();
  accounts.map(account => {
      if(account.phone == "+12066819835"){
        client.messages 
        .create({         
           from: '+17065842114', 
           to: '+12066819835',
           body: 'Emoji time! Send over an emoji to represent your day.'
         }) 
        .then(message => console.log(message.sid)) 
        .done();
      }
  })
  res.send("Done!")
}
