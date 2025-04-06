'use client';

import { Message } from '@fck/lib/ai/components/message';
import { Thread } from '@fck/lib/ai/components/thread';
import { useChat } from '@fck/lib/ai/lib/react';
import { Button } from '@fck/components/ui/button';
import { Input } from '@fck/components/ui/input';
import { handleError } from '@fck/lib/utils';
import { SendIcon } from 'lucide-react';

export const Chatbot = () => {
  const { messages, input, handleInputChange, isLoading, handleSubmit } =
    useChat({
      maxSteps: 5,
      onError: handleError,
      api: '/api/chat',
    });

  return (
    <div className="flex h-[calc(100vh-64px-16px)] flex-col divide-y overflow-hidden">
      <Thread>
        {messages.map((message) => (
          <Message key={message.id} data={message} />
        ))}
      </Thread>
      <form
        onSubmit={handleSubmit}
        className="flex shrink-0 items-center gap-2 px-8 py-4"
        aria-disabled={isLoading}
      >
        <Input
          placeholder="Ask a question!"
          value={input}
          onChange={handleInputChange}
        />
        <Button type="submit" size="icon" disabled={isLoading}>
          <SendIcon className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};