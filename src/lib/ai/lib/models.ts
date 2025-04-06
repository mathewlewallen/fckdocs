import { createOpenAI } from '@ai-sdk/openai';
import { env } from '@fck/env';

const openai = createOpenAI({
  apiKey: env.OPENAI_API_KEY,
  compatibility: 'strict',
});

export const models = {
  chat: openai('gpt-4o-mini'),
  embeddings: openai('text-embedding-3-small'),
};
