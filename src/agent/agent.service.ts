import { AiChat } from 'ai-chat/ai-chat.service';
import { AiModelName } from 'ai-chat/ai-model';
import OpenAI from 'openai';
import { AgentEntity } from './agent.entity';

export class AgentService {
  constructor(private readonly aiChat: AiChat) {}

  async handle(history: OpenAI.Chat.Completions.ChatCompletionMessageParam[], agent: AgentEntity, agentOpponent: AgentEntity) {
    const res = await this.aiChat.ask(
      [
        ...history,
        {
          role: 'system',
          content: `Answer like you're ${agent.name}, which has the following agenda:\n\n${agent.agenda}\n\n--\n\nMake sure to answer concisely and speak with feelings to sound more natural, often address the person you're speaking with by name (${agentOpponent.name}) to make the conversation more personal. Do not repeat yourself and always accuse the other side of lies and got to History roots.`,
        },
      ],
      false,
      0.7,
      AiModelName.gpt4o
    );

    return res.content;
  }
}
