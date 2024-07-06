import { CompletionUsage } from 'openai/resources';
import { ChatCompletion } from 'openai/resources/chat/completions';
import { AiModel } from './ai-model';

export class AIResponseDto<T> {
  pricing: number;
  content: T;
  usage: CompletionUsage;

  constructor(
    public readonly model: AiModel,
    public readonly completion: ChatCompletion,
    public readonly isJson: boolean,
  ) {
    const usage = completion.usage;
    if (!usage) throw new Error('Missing usage result');

    const content = completion.choices[0]!.message.content;
    if (!content) throw new Error('Missing content result');

    this.usage = usage;
    this.content = isJson ? JSON.parse(content) : content;

    this.pricing =
      usage.prompt_tokens * model.output +
      usage.completion_tokens * model.input;
  }
}
