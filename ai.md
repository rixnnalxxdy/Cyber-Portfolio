<h1>Cyber</h1>

<!-- AI Helper Section -->
<div id="ai-helper-container" style="height: 80vh; display: flex; border: 1px solid #0ff; margin-top: 20px;">
  <section class="ai-panel" style="flex:1; display:flex; flex-direction: column; border-right: 1px solid #0ff; background:#121212; color:#0ff; font-family: 'Share Tech Mono', monospace;">
    <h2 style="text-align:center; padding:10px 0; margin:0; font-weight: normal; letter-spacing:2px; font-size:1.6rem; text-shadow:0 0 5px #0ff;">AI Assistant</h2>
    <div id="aiChat" style="flex-grow:1; margin: 10px 20px; border:1px solid #0ff; background:#050505; border-radius:8px; box-shadow:0 0 15px #0ff88; overflow-y:auto; padding:15px; white-space: pre-wrap;"></div>
  </section>

  <section class="user-panel" style="flex:1; display:flex; flex-direction: column; background:#181818; color:#0ff; font-family: 'Share Tech Mono', monospace;">
    <h2 style="text-align:center; padding:10px 0; margin:0; font-weight: normal; letter-spacing:2px; font-size:1.6rem; text-shadow:0 0 5px #0ff;">Your Input</h2>
    <textarea id="inputText" rows="5" placeholder="Type your answer or topic here..." style="background:#111; border:1px solid #0ff; color:#0ff; font-size:1rem; padding:10px; border-radius:4px; margin: 10px 20px 10px 20px; resize:none; width: calc(100% - 40px);"></textarea>
    <button id="submitBtn" style="background:#111; border:1px solid #0ff; color:#0ff; font-family: 'Share Tech Mono', monospace; font-size:1rem; padding:10px; border-radius:4px; margin: 0 20px 20px 20px; cursor:pointer; transition: background-color 0.3s ease;">Submit</button>
  </section>
</div>

<script>
  const aiChat = document.getElementById('aiChat');
  const inputText = document.getElementById('inputText');
  const submitBtn = document.getElementById('submitBtn');

  let quizStarted = false;
  let awaitingTopic = true;

  function addMessage(content, sender) {
    const div = document.createElement('div');
    div.classList.add('chat-message', sender);
    div.textContent = content;
    aiChat.appendChild(div);
    aiChat.scrollTop = aiChat.scrollHeight;
  }

  // Add minimal styling for chat messages
  const style = document.createElement('style');
  style.textContent = `
    .chat-message.ai { color: #0ff; margin-bottom: 15px; line-height: 1.4; }
    .chat-message.user { color: #f0f0f0; text-align: right; margin-bottom: 15px; line-height: 1.4; }
    button:hover { background: #0ff; color: #111; border-color: #0cc; }
  `;
  document.head.appendChild(style);

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
      payload = { mode: 'startQuiz', topic: userInput };
      awaitingTopic = false;
      quizStarted = true;
    } else {
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
        addMessage('Quiz complete! You can refresh the page to start a new session.', 'ai');
        inputText.disabled = true;
        submitBtn.disabled = true;
      } else {
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
