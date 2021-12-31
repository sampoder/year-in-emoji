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

export default function Page({ preloadSession, initalRedemptions }) {
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
      <Container variant="copy" sx={{ textAlign: 'center', my: 4 }}>
        <Heading
          sx={{ fontSize: 8 }}
          dangerouslySetInnerHTML={{ __html: `${data.emoji}` }}
        ></Heading>
        <Heading as="h1" mb={3} mt={3}>
          Year in Emoji
        </Heading>
        {router?.query?.error == 'true' && (
          <Box
            sx={{
              margin: 'auto',
              maxWidth: '400px',
              width: '100%',
              bg: 'sunken',
              borderRadius: 4,
              py: 2,
              mb: 3,
              border: '0.5px solid',
              borderColor: 'muted',
            }}
          >
            <b>Error.</b> Please make sure your username and phone number have
            not been registered.
          </Box>
        )}
        <Box
          as="form"
          action="/api/create-user"
          sx={{
            display: 'grid',
            gap: '8px',
            maxWidth: '400px',
            margin: 'auto',
          }}
          method="get"
        >
          <Input
            type="text"
            placeholder="Username"
            name="username"
            id="username"
          />
          <Input
            type="text"
            placeholder="Phone Number"
            name="phone"
            id="phone"
          />
          <Button>Sign Up</Button>
        </Box>
      </Container>
    </Flex>
  )
}
