import { decode } from 'html-entities'
import {
  Button,
  Box,
  Grid,
  Heading,
  Text,
  Image,
  Flex,
  Card,
  Input,
  Link as A,
  Container,
} from 'theme-ui'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import Meta from '../components/meta'
import Head from 'next/head'

export default function Page({ dates }) {
  const router = useRouter()
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data } = useSWR(
    `https://ranmoji.herokuapp.com/emojis/api/v.1.0/`,
    fetcher,
    {
      initialData: { emoji: '😁' },
      refreshInterval: 1000,
    },
  )
  return (
    <Flex sx={{ minHeight: '100vh', alignItems: 'center' }}>
      <Meta title={`Year in Emoji`} />
      <Head>
        <link
          rel="icon"
          href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${decode(
            data.emoji,
          )}</text></svg>`}
        />
      </Head>
      <Container sx={{ my: 4 }}>
        <Grid columns="1fr 1fr 1fr" gap={'32px'}>
          {Object.values(dates).map((month, index) => (
            <Box>
              <Heading sx={{ color: 'muted', mb: 3 }}>
                {month[0].monthWords}
              </Heading>
              <Grid columns="1fr 1fr 1fr 1fr 1fr 1fr 1fr" gap={'8px'}>
                {month.map(day => (
                  <Box
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
                      <Heading as="h1">🚀</Heading>
                    </Flex>
                  </Box>
                ))}
              </Grid>
            </Box>
          ))}
        </Grid>
      </Container>
    </Flex>
  )
}

export async function getServerSideProps() {
  var start = new Date('01/01/2022')
  var end = new Date('12/31/2022')
  let dates = {}
  var loop = new Date(start)
  console.log(loop)
  console.log(end)
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
  console.log(dates)
  return { props: { dates } }
}
