import { ChatOpenAI } from "@langchain/openai";
import { createClerkToolkit } from "@clerk/agent-toolkit/langchain";
import { auth } from "@fck/server/auth/server";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { LangChainAdapter } from "@fck/lib/ai";
import { systemPrompt } from "@fck/lib/ai/lib/prompts";
import { log } from '@fck/lib/observability/log';

export const maxDuration = 30;

export async function POST(req: Request) {
  const authContext = await auth.protect();
  const { prompt } = await req.json();

  log.info('🤖 Langchain request received.', { prompt });

  const model = new ChatOpenAI({ model: "gpt-4o", temperature: 0 });
  const toolkit = await createClerkToolkit({ authContext });
  const modelWithTools = model.bindTools(toolkit.allTools());

  log.info('🤖 Generating response...');
  const messages = [new SystemMessage(toolkit.injectSessionClaims(systemPrompt)), new HumanMessage(prompt)];
  const aiMessage = await modelWithTools.invoke(messages);
  messages.push(aiMessage);

  log.info('🤖 Processing tool calls...');
  for (const toolCall of aiMessage.tool_calls || []) {
    // @ts-expect-error @nikos - need to make the types less strict here
    const selectedTool = toolkit.toolMap()[toolCall.name];
    const toolMessage = await selectedTool.invoke(toolCall);
    messages.push(toolMessage);
  }

  log.info('🤖 Streaming response...');
  const stream = await modelWithTools.stream(messages);
  return LangChainAdapter.toDataStreamResponse(stream);
}
