import React from 'react'
import MessageList from './messagelist'
import ChatInput from './chatinput'
import { Message } from '@/typings';

async function Homepage() {
  const data = await fetch(`${process.env.VERCEL_URL}/api/getMessages`).then(res => res.json());
  const messages: Message[] = data.messages;

  return (
    <main>
      <MessageList initialMessages={messages} />
      <ChatInput />
    </main>
  )
}

export default Homepage