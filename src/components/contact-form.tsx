/** @jsx jsx */
import HCaptcha from '@hcaptcha/react-hcaptcha'
import axios from 'axios'
import * as React from 'react'
import {
  jsx,
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Label,
  Link,
  Spinner,
  Text,
  Textarea
} from 'theme-ui'

const ContactForm = () => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [status, setStatus] = React.useState('waiting')

  const captchaRef = React.useRef<HCaptcha>(null)

  const handleSubmit = (event) => {
    captchaRef.current?.execute()
    event.preventDefault()
  }

  const handleCaptchaVerified = (token) => {
    setStatus('submitting')
    axios
      .post('https://submit-form.com/h0CULjhe', {
        name: name,
        email: email,
        message: message,
        'h-captcha-response': token,
        _email: {
          from: name,
          subject: 'New enquiry from lachlan.io',
          template: {
            title: false,
            footer: false
          }
        }
      })
      .then(() => {
        setStatus('sent')
        captchaRef.current?.resetCaptcha()
      })
  }

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Grid gap={3} columns={[1, 2]} mb={3}>
        <Box>
          <Label htmlFor="name" mb={2}>
            Full Name
          </Label>
          <Input
            id="name"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="山田 太郎"
          />
        </Box>
        <Box>
          <Label htmlFor="email" mb={2}>
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="yamada.taro@example.com"
          />
        </Box>
      </Grid>
      <Label htmlFor="message" mb={2}>
        Message
      </Label>
      <Textarea
        sx={{ fontFamily: 'inherit' }}
        id="message"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        placeholder="メッセージをご記入ください。"
        rows={4}
        mb={4}
      />
      <Flex sx={{ alignItems: 'center', minHeight: 42 }} mb={3}>
        {status === 'waiting' ? <Button>Send message</Button> : null}
        {status === 'submitting' ? <Spinner size={30} /> : null}
        {status === 'sent' ? (
          <Text sx={{ color: 'success', fontSize: [1] }}>
            Message sent! I'll get back to you soon.
          </Text>
        ) : null}
      </Flex>
      <Text sx={{ a: { variant: 'links.secondary' }, fontSize: [0] }}>
        This form is protected by hCaptcha and its{' '}
        <Link href="https://hcaptcha.com/privacy">Privacy Policy</Link> and{' '}
        <Link href="https://hcaptcha.com/terms">Terms of Service</Link> apply.
      </Text>
      <HCaptcha
        sitekey="0632a3be-a50f-42b8-a273-03416c40d3df"
        size="invisible"
        onVerify={handleCaptchaVerified}
        ref={captchaRef}
      />
    </Box>
  )
}

export default ContactForm
