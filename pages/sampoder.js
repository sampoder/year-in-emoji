import { decode } from 'html-entities'
import prisma from '../lib/prisma'
import {
  Box,
  Grid,
  Heading,
  Flex,
  Link,
  Container,
} from 'theme-ui'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import Meta from '../components/meta'
import Head from 'next/head'

export default function Page({ dates, emojis, emojisArray, username }) {
  const router = useRouter()
  const fetcher = (...args) =>
    fetch(...args).then(res => ({
      emoji: emojisArray[Math.floor(Math.random() * emojisArray.length)],
    }))
  const { data } = useSWR(
    `https://ranmoji.herokuapp.com/emojis/api/v.1.0/`,
    fetcher,
    {
      initialData: {
        emoji: emojisArray[Math.floor(Math.random() * emojisArray.length)],
      },
      refreshInterval: 1000,
    },
  )
  return (
    <Flex sx={{ minHeight: '100vh', alignItems: 'center' }}>
      <Meta title={`@${username}'s Year in Emoji`} />
      <Head>
        <link
          rel="icon"
          href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${decode(
            data.emoji,
          )}</text></svg>`}
        />
      </Head>
      <Container sx={{ my: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Heading
            sx={{ fontSize: 8 }}
            dangerouslySetInnerHTML={{ __html: `${data.emoji}` }}
          ></Heading>
          <Heading as="h1" mb={3} mt={3}>
            @{username}'s Year in Emoji
          </Heading>
        </Box>
        <Grid
          columns={['1fr', '1fr 1fr', '1fr 1fr 1fr']}
          gap={'32px'}
          sx={{ py: 3 }}
        >
          {Object.values(dates).map((month, index) => (
            <Box key={month[0].monthWords}>
              <Heading sx={{ color: 'muted', mb: 3 }}>
                {month[0].monthWords}
              </Heading>
              <Grid columns="1fr 1fr 1fr 1fr 1fr 1fr 1fr" gap={'8px'}>
                {month.map(day => (
                  <Box
                    key={month[0].monthWords + day.date + day.day}
                    sx={{
                      width: '100%',
                      height: 0,
                      paddingTop: '100%',
                      position: 'relative',
                      bg: day.date == 0 ? 'white' : 'sunken',
                    }}
                  >
                    <Flex
                      sx={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                      }}
                    >
                      <Heading as="h1">
                        {typeof emojis[day.month.toString()] == 'undefined'
                          ? ''
                          : emojis[day.month.toString()][day.date.toString()]}
                      </Heading>
                    </Flex>
                  </Box>
                ))}
              </Grid>
            </Box>
          ))}
        </Grid>
        <Box sx={{ fontSize: 2, fontWeight: 800, textAlign: 'center' }}>
          By <Link target="_blank" href="https://github.com/sampoder">@sampoder</Link>, open
          sourced <Link href="https://github.com/sampoder">here</Link>.
        </Box>
      </Container>
    </Flex>
  )
}

export async function getStaticProps() {
  var start = new Date('01/01/2022')
  var end = new Date('12/31/2022')
  let dates = {}
  var loop = new Date(start)
  while (loop <= end) {
    if (loop.getDate() == 1) {
      dates[loop.getMonth().toString()] = []
      if (loop.getDay() != 1) {
        let counter = 1
        while (counter != loop.getDay() && counter <= 6) {
          dates[loop.getMonth().toString()].push({
            date: 0,
            day: counter,
            month: loop.getMonth(),
            monthWords: new Intl.DateTimeFormat('en-US', {
              month: 'long',
            }).format(loop),
          })
          counter += 1
        }
      }
    }
    dates[loop.getMonth().toString()].push({
      date: loop.getDate(),
      day: loop.getDay(),
      month: loop.getMonth(),
    })
    var newDate = loop.setDate(loop.getDate() + 1)
    loop = new Date(newDate)
  }
  const user = await prisma.user.findUnique({
    where: {
      username: 'sampoder',
    },
    include: {
      Emojis: true,
    },
  })
  let emojis = {}
  let emojisArray = []
  for (let emojiIndex in user.Emojis) {
    let emojiDate = new Date(user.Emojis[emojiIndex].day)
    console.log(emojiDate)
    if (typeof emojis[emojiDate.getMonth().toString()] == 'undefined') {
      emojis[emojiDate.getMonth().toString()] = {}
    }
    emojis[emojiDate.getMonth().toString()][emojiDate.getDate().toString()] =
      user.Emojis[emojiIndex].emoji
    emojisArray.push(user.Emojis[emojiIndex].emoji)
  }
  return { props: { dates, emojis, emojisArray, username: user.username } }
}
