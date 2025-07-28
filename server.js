app.post('/ai-helper', async (req, res) => {
  const { mode, question } = req.body;

  // Read both markdown files
  const learnings = fs.readFileSync('./learnings.md', 'utf-8');
  const projects = fs.readFileSync('./projects.md', 'utf-8');

  // Combine the notes content
  const combinedNotes = `User's Learnings Notes:\n${learnings}\n\nUser's Projects Notes:\n${projects}`;

  let messages = [];

  if (mode === 'ask') {
    messages = [
      { role: 'system', content: `You are an AI assistant. Use the following notes to help the user:\n\n${combinedNotes}` },
      { role: 'user', content: question }
    ];
  } else if (mode === 'review') {
    messages = [
      { role: 'system', content: `Summarize or highlight key points from the following notes:\n\n${combinedNotes}` }
    ];
  } else if (mode === 'test') {
    messages = [
      { role: 'system', content: `Generate a short quiz (3 questions) based on the following notes:\n\n${combinedNotes}` }
    ];
  } else {
    return res.status(400).json({ reply: 'Invalid mode selected.' });
  }

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages
    }, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({ reply: response.data.choices[0].message.content });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ reply: 'AI request failed.' });
  }
});
