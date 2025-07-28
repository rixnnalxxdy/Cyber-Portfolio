<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Cyber AI Study Helper</title>
  <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet" />
  <style>
    body, html {
      margin: 0; padding: 0; height: 100%;
      font-family: 'Share Tech Mono', monospace;
      background: #0f0f0f;
      color: #0fefef;
      display: flex;
      overflow: hidden;
      height: 100vh;
    }
    .container {
      display: flex;
      width: 100%;
      height: 100%;
    }
    .ai-panel, .user-panel {
      flex: 1;
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      border: 1px solid #0fefef;
      overflow: hidden;
    }
    .ai-panel {
      background: #121212;
      border-right: none;
      overflow-y: auto;
    }
    .user-panel {
      background: #181818;
      border-left: none;
      justify-content: flex-start;
    }
    h1 {
      margin-top: 0;
      font-weight: normal;
      text-align: center;
      letter-spacing: 2px;
      font-size: 1.8rem;
      color: #0ff;
      text-shadow: 0 0 5px #0ff;
    }
    .chat-box {
      flex-grow: 1;
      overflow-y: auto;
      margin-bottom: 20px;
      border: 1px solid #0ff;
      padding: 15px;
      background: #050505;
      border-radius: 8px;
      box-shadow: 0 0 15px #0ff88;
    }
    .chat-message {
      margin-bottom: 15px;
      line-height: 1.4;
      white-space: pre-wrap;
    }
    .chat-message.ai {
      color: #0ff;
    }
    .chat-message.user {
      color: #f0f0f0;
      text-align: right;
    }
    textarea, button {
      background: #111;
      border: 1px solid #0ff;
      color: #0ff;
      font-family: 'Share Tech Mono', monospace;
      font-size: 1rem;
      padding: 10px;
      border-radius: 4px;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 10px;
      resize: none;
    }
    button {
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    button:hover {
      background: #0ff;
      color: #111;
      border-color: #0cc;
    }
  </style>
</head>
<body>
  <div class="container">
    <section class="ai-panel">
      <h1>AI Assistant</h1>
      <div id="aiChat" class="chat-box"></div>
    </section>

    <section class="user-panel">
      <h1>Your Input</h1>
      <textarea id="inputText" rows="5" placeholder="Type your answer or topic here..."></textarea>
      <button id="submitBtn">Submit</button>
    </section>
  </div>

  <script>
    const aiChat = document.getElementById('aiChat');
    const inputText = document.getElementById('inputText');
    const submitBtn = document.getElementById('submitBtn');

    // Conversation state to track quiz flow
    let conversationId = null; // (optional if you want to track)
    let quizStarted = false;
    let awaitingTopic = true;

    function addMessage(content, sender) {
      const div = document.createElement('div');
      div.classList.add('chat-message', sender);
      div.textContent = content;
      aiChat.appendChild(div);
      aiChat.scrollTop = aiChat.scrollHeight;
    }

    // Start by prompting the user for the topic
    addMessage('Hello! What cybersecurity topic would you like to be tested on today?', 'ai');

    async function submitRequest() {
      const userInput = inputText.value.trim();
      if (!userInput) return alert('Please enter a response.');

      addMessage(`You: ${userInput}`, 'user');
      inputText.value = '';
      inputText.disabled = true;
      submitBtn.disabled = true;

      let payload = {};
      if (awaitingTopic) {
        // First user input: topic selection
        payload = { mode: 'startQuiz', topic: userInput };
        awaitingTopic = false;
        quizStarted = true;
      } else {
        // Then user is answering quiz questions
        payload = { mode: 'answer', answer: userInput };
      }

      try {
        const res = await fetch('/ai-helper', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();

        addMessage(`AI: ${data.reply}`, 'ai');

        if (data.quizFinished) {
          // Quiz finished: disable input or reset flow
          addMessage('Quiz complete! You can refresh the page to start a new session.', 'ai');
          inputText.disabled = true;
          submitBtn.disabled = true;
        } else {
          // Allow next user input
          inputText.disabled = false;
          submitBtn.disabled = false;
          inputText.focus();
        }
      } catch (err) {
        addMessage('AI: Sorry, something went wrong.', 'ai');
        inputText.disabled = false;
        submitBtn.disabled = false;
      }
    }

    submitBtn.addEventListener('click', submitRequest);
    inputText.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submitRequest();
      }
    });
  </script>
</body>
</html>
