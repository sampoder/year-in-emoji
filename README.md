# year-in-emoji
😁 Log your year in emoji!
## Inspiration

Emojis are everywhere nowadays, and I love them! I enjoy reacting with them and messaging with them etc. So that inspired the emoji part. The SMS factor and the simplicity of the logging was inspired by the fact that I'd tried journaling and scrapbooking before but I always found that I'd leave it very late in the day (11:55pm normally) and in the end I'd get lazy and slack off. So I wanted to create something so simple that not even I could be too lazy to log something each day.

## What it does

Year in Emoji is a tool that lets you use SMS to log each day with an emoji. It then generates a web page for you to look back on and share with others if you’d like.

So a user starts by signing up on the website. They’ll then receive a text asking them to confirm their account. And as every day goes by, they’ll receive a friendly message prompting them to reflect on their day with an emoji. The user can then respond back with an emoji which will be added to their page. 

In the end they'll have a web page full of emoji showing how each and every day of the year went for them such as: [year-in-emoji.vercel.app/sampoder](https://year-in-emoji.vercel.app/sampoder).

## How I built it

I built my hack using Twilio for the SMS integration, Next.js for the web viewer alongside Prisma & PostgreSQL for all my database needs. 

Twilio's SDK is used within Node.js Serverless Functions that are called within the app and by CRON jobs. I use TwiML to parse incoming messages from the user.

Next.js is used to statically generate the pages and to "house" the Serverless Functions through API Routes. Theme UI is also used for styling.

Prisma is used an ORM for my PostgreSQL DB.

## Challenges I ran into

The main challenge I ran into was designing a good user experience around SMS. This was my first time building a hack around SMS so I had to experiment with different user flows to find one that worked well. The main challenge was finding a balance between what should be based in the web and what should be done through SMS.

Another challenge was Javascript Dates (ahhhh!!!). I had tried to steer clear of them over the past few years but I had to use them for this hack so it was a challenge finding my way around them but also interesting at times.

## Accomplishments that I'm proud of

I'm quite proud that I gave building my project SMS a shot, originally it was going to be web based but I'm proud I jumped out of my comfort zone to try something different. 

## What I learned

Something I haven't mentioned early that I learnt about was about the inner workings of emoji... which didn't translate much into the project but I went down the rabbit hole. In all seriousness, I learnt about JS Dates & Twilio's SDK as I've mentioned early. TwiML, specifically, was something I learnt a lot more about.

## What's next for Year in Emoji

A lot of polishing and hopefully buying some credit so I can launch it for others to use!
