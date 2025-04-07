import { createClerkToolkit } from '@clerk/agent-toolkit/ai-sdk';
import { streamText } from '@fck/lib/ai';
import { models } from '@fck/lib/ai/lib/models';
import { systemPrompt } from '@fck/lib/ai/lib/prompts';
import { log } from '@fck/lib/observability/log';
import { auth } from '@fck/server/auth/server';

export const POST = async (req: Request) => {
  const authContext = await auth.protect();
  const body = await req.json();
  const toolkit = await createClerkToolkit({ authContext });

  log.info('🤖 Chat request received.', { body });
  const { messages } = body;

  log.info('🤖 Generating response...');
  const result = streamText({
    model: models.chat,
    system: toolkit.injectSessionClaims(systemPrompt),
    tools: toolkit.users(),
    messages,
  });

  log.info('🤖 Streaming response...');
  return result.toDataStreamResponse();
};
