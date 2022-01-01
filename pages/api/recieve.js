import prisma from '../../lib/prisma'
const MessagingResponse = require('twilio').twiml.MessagingResponse
const extractEmojis = require('extract-emojis')

export default async function trigger(req, res) {
  const twiml = new MessagingResponse()
  const user = await prisma.user.findUnique({
    where: {
      phone: req.body.From,
    },
  })
  if (user.confirmed == false) {
    if (req.body.Body.includes('🍎')) {
      const updateUser = await prisma.user.update({
        where: {
          phone: req.body.From,
        },
        data: {
          confirmed: true,
        },
      })
      twiml.message('Yahoo! Account confirmed.')
      res.writeHead(200, { 'Content-Type': 'text/xml' })
      res.end(twiml.toString())
    } else {
      twiml.message('I am sad to say but your account is yet to be confirmed.')
      res.writeHead(200, { 'Content-Type': 'text/xml' })
      res.end(twiml.toString())
    }
  } else {
    if (extractEmojis(req.body.Body).length == 0) {
      twiml.message(`🔎 I couldn't find any emoji in your message.`)
      res.writeHead(200, { 'Content-Type': 'text/xml' })
      res.end(twiml.toString())
    } else {
      let todaysEmoji = extractEmojis(req.body.Body)[0]
      const updateUser = await prisma.user.update({
        where: {
          phone: req.body.From,
        },
        data: {
          Emojis: {
            create: [{ emoji: todaysEmoji }],
          },
        },
      })
      twiml.message('☑️ Logged.')
      res.writeHead(200, { 'Content-Type': 'text/xml' })
      res.end(twiml.toString())
    }
  }
}
