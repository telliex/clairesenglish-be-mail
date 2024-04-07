
# Mail to someone

You can build whatever you need to achieve the following functionality. When someone on our team is on a computer and makes the following request over the public internet, they should see an email in their inbox with the specified sender, subject and body.


## Install

```bash
npm install or pnpm install
```

## Deployment

#### To build API service

```bash
  node server.js
```

#### Web page
Use tools (e.x. Go Live) to run live server with index.html. Then try below information to invoke API.

```bash
POST https://interview-to-mail-api.glitch.me/emails
with JSON body:
{
  to: "myemail@example.com",
  subject: "hi",
  body: "Hello World!"
}

```

## Demo
API view https://interview-to-mail-api.glitch.me




