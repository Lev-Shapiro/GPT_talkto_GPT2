export interface AiModel {
  name: AiModelName;
  output: number;
  input: number;
}

export enum AiModelName {
  gpt3turbo = 'gpt-3.5-turbo-0125',
  gpt4turbo = 'gpt-4-1106-preview',
  gpt4o = 'gpt-4o',
  // Not to date, invalid exams:
  mindopus = 'ft:gpt-3.5-turbo-1106:personal::9Pvy8ZEx',
}

export type ModelDataType = Record<AiModelName, AiModel>;

export const models: ModelDataType = {
  [AiModelName.gpt3turbo]: {
    name: AiModelName.gpt3turbo,
    input: 0.0015 / 1000,
    output: 0.002 / 1000,
  },
  [AiModelName.gpt4turbo]: {
    name: AiModelName.gpt4turbo,
    input: 0.01 / 1000,
    output: 0.03 / 1000,
  },
  [AiModelName.gpt4o]: {
    name: AiModelName.gpt4o,
    input: 0.005 / 1000,
    output: 0.015 / 1000,
  },
  [AiModelName.mindopus]: {
    name: AiModelName.mindopus,
    input: 0.003 / 1000,
    output: 0.006 / 1000,
  },
};
