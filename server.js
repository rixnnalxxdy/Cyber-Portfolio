const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Read notes once at startup
const learnings = fs.readFileSync('./learnings.md', 'utf-8');
const projects = fs.readFileSync('./projects.md', 'utf-8');
const combinedNotes = `User's Learnings Notes:\n${learnings}\n\nUser's Projects Notes:\n${projects}`;

// Simple in-memory quiz state store (for demo purposes only)
// In prod, use session or DB to track user quiz states
let quizState = {
  active: false,
  topic: '',
  questions: [],
  currentIndex: 0,
  score: 0,
  missedQuestions: []
};

// Helper: Generate quiz questions via OpenAI
async function generateQuiz(topic) {
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

  try {
    // Extract JSON from response
    const content = response.data.choices[0].message.content;

    // Parse JSON safely (strip any text before/after JSON)
    const jsonStart = content.indexOf('[');
    const jsonEnd = content.lastIndexOf(']') + 1;
    const jsonString = content.substring(jsonStart, jsonEnd);
    const questions = JSON.parse(jsonString);

    return questions;
  } catch {
    // fallback: if parsing fails, return empty
    return [];
  }
}

app.post('/ai-helper', async (req, res) => {
  const { mode, topic, answer } = req.body;

  if (mode === 'startQuiz') {
    // Start quiz with topic
    quizState.active = true;
    quizState.topic = topic;
    quizState.currentIndex = 0;
    quizState.score = 0;
    quizState.missedQuestions = [];

    try {
      quizState.questions = await generateQuiz(topic);
      if (quizState.questions.length === 0) {
        return res.json({ reply: `Sorry, I couldn't generate questions for the topic "${topic}". Please try another topic.` });
      }

      const firstQ = quizState.questions[0].question;
      return res.json({ reply: `Great! Let's start the quiz on "${topic}". Here is your first question:\n\n${firstQ}`, quizFinished: false });

    } catch (err) {
      console.error(err.response?.data || err.message);
      return res.json({ reply: 'Sorry, I had trouble generating the quiz. Please try again later.' });
    }
  }

  if (mode === 'answer') {
    if (!quizState.active) {
      return res.json({ reply: 'Please start a quiz by telling me what topic you want to be tested on.' });
    }

    const currentQ = quizState.questions[quizState.currentIndex];
    const correctAnswer = currentQ.answer.toLowerCase().trim();
    const userAnswer = (answer || '').toLowerCase().trim();

    // Basic fuzzy check - contains keywords or exact
    const isCorrect = userAnswer.includes(correctAnswer) || correctAnswer.includes(userAnswer);

    let feedback;
    if (isCorrect) {
      feedback = '✅ Correct!';
      quizState.score++;
    } else {
      feedback = `❌ Not quite. The correct answer was: "${currentQ.answer}". Here's a little more info:\n\n${await elaborateAnswer(currentQ.answer, quizState.topic)}`;
      quizState.missedQuestions.push(currentQ);
    }

    quizState.currentIndex++;

    if (quizState.currentIndex >= quizState.questions.length) {
      // Quiz finished
      quizState.active = false;
      feedback += `\n\n🎉 Quiz finished! Your score: ${quizState.score} / ${quizState.questions.length}\n`;

      if (quizState.missedQuestions.length > 0) {
        feedback += `You missed these questions:\n${quizState.missedQuestions.map(q => `- ${q.question}`).join('\n')}`;
      } else {
        feedback += `Perfect score! Well done! 🎉`;
      }

      return res.json({ reply: feedback, quizFinished: true });
    } else {
      // Next question
      const nextQ = quizState.questions[quizState.currentIndex].question;
      feedback += `\n\nNext question:\n${nextQ}`;
      return res.json({ reply: feedback, quizFinished: false });
    }
  }

  return res.status(400).json({ reply: 'Invalid request.' });
});

// Helper to elaborate on an answer
async function elaborateAnswer(answer, topic) {
  const prompt = `Explain this answer in simple terms and provide more details relevant to the topic "${topic}":\n\n${answer}`;

  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }]
  }, {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  return response.data.choices[0].message.content;
}

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
