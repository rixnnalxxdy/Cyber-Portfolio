<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Cyber AI Study Helper</title>
  <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet" />
  <style>
    body {
      margin: 0;
      height: 100vh;
      font-family: 'Share Tech Mono', monospace;
      background: #0f0f0f;
      color: #0fefef;
      display: flex;
      overflow: hidden;
    }
    .container {
      display: flex;
      width: 100%;
      height: 100vh;
    }
    .ai-panel, .user-panel {
      flex: 1;
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      border: 1px solid #0fefef;
    }
    .ai-panel {
      background: #121212;
      border-right: none;
      overflow-y: auto;
    }
    .user-panel {
      background: #181818;
      border-left: none;
      justify-content: space-between;
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
    }
    .chat-message.ai {
      color: #0ff;
    }
    .chat-message.user {
      color: #f0f0f0;
      text-align: right;
    }
    select, textarea, button {
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
      <select id="modeSelect" aria-label="Select mode">
        <option value="ask">Ask a Question</option>
        <option value="review">Review Notes</option>
        <option value="test">Take a Test</option>
      </select>
      <textarea id="inputText" rows="5" placeholder="Type your question here..."></textarea>
      <button onclick="submitRequest()">Submit</button>
    </section>
  </div>

  <script>
    const aiChat = document.getElementById('aiChat');
    const inputText = document.getElementById('inputText');
    const modeSelect = document.getElementById('modeSelect');

    // Add messages to chat box
    function addMessage(content, sender) {
      const div = document.createElement('div');
      div.classList.add('chat-message', sender);
      div.textContent = content;
      aiChat.appendChild(div);
      aiChat.scrollTop = aiChat.scrollHeight;
    }

    async function submitRequest() {
      const mode = modeSelect.value;
      const question = inputText.value.trim();

      if (mode === 'ask' && question === '') {
        alert('Please enter a question.');
        return;
      }

      addMessage(`You: ${question || `[${mode} mode]`}`, 'user');
      inputText.value = '';

      // Call backend
      try {
        const res = await fetch('/ai-helper', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mode, question })
        });

        const data = await res.json();
        addMessage(`AI: ${data.reply}`, 'ai');
      } catch (err) {
        addMessage('AI: Sorry, something went wrong.', 'ai');
      }
    }
  </script>
</body>
</html>
