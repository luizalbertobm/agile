import { STORAGE_KEYS } from '@/constants';
import { storage } from '@/utils/storage';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const buildStoryContext = (story) => {
  const details = [
    `Title: ${story.title || 'Untitled story'}`,
    story.description ? `Description: ${story.description}` : null,
    story.priority ? `Priority: ${story.priority}` : null,
    story.estimate ? `Story Points: ${story.estimate}` : null,
    story.status ? `Status: ${story.status}` : null,
    story.markdown ? `Markdown:\n${story.markdown}` : null
  ].filter(Boolean);

  return details.join('\n');
};

export const generateAiPromptForStory = async (story) => {
  const storedApiKey = storage.get(STORAGE_KEYS.OPENAI_API_KEY, '');
  const apiKey = storedApiKey || import.meta.env.VITE_OPENAI_API_KEY;
  const model = import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini';
  const temperatureRaw = import.meta.env.VITE_OPENAI_TEMPERATURE;
  const parsedTemperature = Number.parseFloat(temperatureRaw);
  const temperature = Number.isFinite(parsedTemperature) ? parsedTemperature : 0.2;

  if (!apiKey) {
    const error = new Error('missing_api_key');
    error.code = 'missing_api_key';
    throw error;
  }

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      temperature,
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em engenharia de software. Gere um prompt claro para um agente de IA implementar a história de usuário fornecida. O prompt deve incluir objetivo, escopo, critérios de aceitação e lembretes de qualidade. Responda apenas com o prompt final.'
        },
        {
          role: 'user',
          content: `Crie um prompt para implementar a história de usuário abaixo.\n\n${buildStoryContext(story)}`
        }
      ]
    })
  });

  if (!response.ok) {
    let message = 'openai_request_failed';

    try {
      const errorData = await response.json();
      message = errorData?.error?.message || message;
    } catch (error) {
      // ignore JSON parse errors
    }

    const requestError = new Error(message);
    requestError.code = 'openai_request_failed';
    throw requestError;
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content?.trim() || '';
};
