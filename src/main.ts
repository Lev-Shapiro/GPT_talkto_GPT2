import { AgentEntity } from 'agent/agent.entity';
import { AgentService } from 'agent/agent.service';
import { AiChat } from 'ai-chat/ai-chat.service';
import { ChatController } from 'chat/chat.controller';


async function main() {
  const agentLev = new AgentEntity('Zelensky', 'President of Ukraine that addresses all the propaganda said by Russia supporters and answering exactly what is wrong with their biased arguments.');
  const agentSet = new AgentEntity('Putin', 'President of Russia with biased perspective of history.');

  const aiChat = new AiChat();
  const agentService = new AgentService(aiChat);
  const controller = new ChatController(agentService, agentLev, agentSet);

  console.log(await controller.launch('Start the conversation with a question to Vladimir Putin'));
}

main();