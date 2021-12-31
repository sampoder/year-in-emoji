
import { signIn, signOut, useSession, getSession } from 'next-auth/client'
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
import Icon from 'supercons'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ColourSwitcher from '../components/color-switcher'
import Meta from '../components/meta'
import { useState } from 'react'
import useSWR, { mutate } from 'swr'

export default function Page({ preloadSession, initalRedemptions }) {
  return (
    <Flex sx={{minHeight: '100vh', alignItems: 'center'}}>
      <Container variant="copy" sx={{ textAlign: 'center', my: 4 }}>
        <Box
          sx={{
            maxWidth: '600px',
            margin: 'auto'
          }}
        >
          <img src="https://media3.giphy.com/media/QA7Xiv0KA4JALmdAu4/200.gif" />
          <Heading mt={3}>Check your phone messages for further instructions.</Heading>
        </Box>
      </Container>
    </Flex>
  )
}