import prisma from '../../lib/prisma'
const client = require('twilio')(process.env.TWILIO_ID, process.env.TWILIO_AUTH);

export default async function Create(req, res) {
  try {
    console.log(req.body)
    const account = await prisma.user.create({
      data: {
        username: req.query.username,
        phone: req.query.phone
      },
    })
    await client.messages 
      .create({         
         from: '+17065842114', 
         to: '+12066819835',
         body: 'Welcome to Year in Emoji! To verify your account send an 🍎.'
       }) 
      .then(message => console.log(message.sid)) 
      .done();
    res.redirect('/welcome')
  } catch(e) {
    console.error(e)
    res.redirect('/?error=true')
  }
}
