import OpenAI from 'openai';

import { ConsoleStep } from '@shapilev/console-step';
import { AiModelName, models } from './ai-model';
import { AIResponseDto } from './ai-response.dto';

export class AiChat {
  openAI: OpenAI;

  constructor() {
    this.openAI = new OpenAI({
      apiKey: '[OPEN_API_KEY]',
    });
  }

  async ask(
    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
    isJson: boolean,
    temperature = 0.7,
    model: AiModelName = AiModelName.gpt4turbo,
  ) {
    const askStep = new ConsoleStep('Performing GPT request');

    const t1 = performance.now();

    const res = await this.openAI.chat.completions.create({
      model: models[model].name,
      response_format: { type: isJson ? 'json_object' : 'text' },
      temperature,
      messages,
    });

    const result = new AIResponseDto<string>(models[model], res, isJson);
    const t2 = performance.now();

    askStep.logAfter((step) => {
      step.createStep('Completed GPT request: ').createStepObject({
        took: t2 - t1 + 'ms',
        pricing: result.pricing,
        usage: result.usage,
        wordAmount: result.content.split(' ').length,
      });
    });

    return result;
  }
}
