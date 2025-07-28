const axios = require('axios');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { mode, topic, answer } = JSON.parse(event.body);

  // You can add your quizState logic here or implement stateless version (for demo, keep simple)

  // For demo: just generate 1 question on 'startQuiz'
  if (mode === 'startQuiz') {
    try {
      const combinedNotes = "Your combined notes here or load from somewhere";
      const prompt = `You are a cybersecurity quiz master. Using the following notes:\n${combinedNotes}\n\nGenerate a quiz of 3 questions on the topic "${topic}". Format your response as JSON array with objects: { question: string, answer: string } only.`;

      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }]
      }, {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const content = response.data.choices[0].message.content;
      // Parse JSON safely as before...
      const jsonStart = content.indexOf('[');
      const jsonEnd = content.lastIndexOf(']') + 1;
      const jsonString = content.substring(jsonStart, jsonEnd);
      const questions = JSON.parse(jsonString);

      // Return first question only for demo
      return {
        statusCode: 200,
        body: JSON.stringify({
          reply: `Great! Let's start the quiz on "${topic}". Here is your first question:\n\n${questions[0].question}`,
          quizFinished: false
        })
      };
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify({ reply: "Sorry, error generating quiz." })
      };
    }
  }

  // For demo: just respond to answers with placeholder
  if (mode === 'answer') {
    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: "Answer received. (Functionality to be implemented)",
        quizFinished: true
      })
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ reply: 'Invalid request.' })
  };
};
