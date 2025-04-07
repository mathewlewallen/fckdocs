'use client';

import { Button } from '@fck/components/ui/Button';
import { Input } from '@fck/components/ui/Input';
import { Thread } from '@fck/lib/ai/components/thread';
import { useCompletion } from '@fck/lib/ai/lib/react';
import { handleError } from '@fck/lib/utils';
import { SendIcon } from 'lucide-react';

export default function Langchain() {
  const { completion, input, handleInputChange, handleSubmit } = useCompletion({
    onError: handleError,
    api: '/api/langchain',
  });

  return (
    <div className="flex h-[calc(100vh-64px-16px)] flex-col divide-y overflow-hidden">
      <Thread>{completion}</Thread>
      <form
        onSubmit={handleSubmit}
        className="flex shrink-0 items-center gap-2 px-8 py-4"
      >
        <Input
          placeholder="Ask a question!"
          value={input}
          onChange={handleInputChange}
        />
        <Button type="submit" size="icon">
          <SendIcon className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};
