import { anthropic } from '@ai-sdk/anthropic';

export const webSearch = anthropic.tools.webSearch_20250305({
  maxUses: 50,
});
