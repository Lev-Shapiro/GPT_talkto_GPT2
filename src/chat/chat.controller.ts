import { AgentEntity } from 'agent/agent.entity';
import { AgentService } from 'agent/agent.service';
import OpenAI from 'openai';

export class ChatController {
  STOP = 10;
  history: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];

  constructor(
    private readonly agentService: AgentService,
    private readonly agentA: AgentEntity,
    private readonly agentB: AgentEntity,
  ) {}

  async launch(message: string) {
    this.history.push({
      role: 'system',
      content: message,
    });

    return await this.chat(this.agentA.name);
  }

  private async chat(startAgentName: string) {
    const agent = startAgentName === this.agentA.name ? this.agentA : this.agentB;

    const agentAnswer = await this.agentService.handle(this.history, agent, startAgentName === this.agentB.name ? this.agentA : this.agentB);

    this.history.push({
      role: 'user',
      content: `${agent.name}: "${agentAnswer}"`,
    });

    console.log(this.history);
    if (this.history.length > this.STOP) {
      return this.history;
    }

    await this.chat(startAgentName === this.agentA.name ? this.agentB.name : this.agentA.name);
  }
}
