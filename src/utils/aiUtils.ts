/**
 * Returns an AI generated image
 * @param prompt
 * @returns
 */
async function getAImage(prompt: string) {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPEN_AI_KEY}`, // Replace with your OpenAI API key
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      n: 1,
      size: '1024x1024',
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.data[0].url;
  } else {
    throw new Error('Could not generate image');
  }
}

export { getAImage };
