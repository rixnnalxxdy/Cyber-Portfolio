---
layout: default
title: AI Learning Assistant
---

<h2>AI Learning Assistant</h2>
<p>Type a topic you'd like to be tested on. The AI will quiz you and give feedback as you go!</p>

<div id="chat-box" style="height: 300px; overflow-y: scroll; border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;"></div>

<input type="text" id="user-input" placeholder="Type your answer or a topic to start..." style="width: 70%;">
<button onclick="sendMessage()">Send</button>

<script>
  const chatBox = document.getElementById('chat-box');
  const input = document.getElementById('user-input');
  let progress = 0;
  let started = false;
  let topic = '';

  async function sendMessage() {
    const userText = input.value.trim();
    if (!userText) return;

    chatBox.innerHTML += `<p><strong>You:</strong> ${userText}</p>`;
    input.value = '';

    if (!started) {
      topic = userText;
      started = true;
      progress = 0;
      chatBox.innerHTML += `<p><strong>AI:</strong> Great! Let’s begin testing your knowledge on <em>${topic}</em>.</p>`;
      await askAI("Let's start the quiz.");
      return;
    }

    await askAI(userText);
  }

  async function askAI(userInput) {
    const response = await fetch("https://eorl4uarw983g5y.m.pipedream.net", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: topic,
        user_input: userInput,
        progress: progress
      })
    });

    const data = await response.json();
    const aiText = data.response || "Something went wrong.";

    progress += 25;
    const cappedProgress = progress >= 100 ? 100 : progress;

    chatBox.innerHTML += `<p><strong>AI:</strong> ${aiText}</p>`;
    chatBox.innerHTML += `<p><em>✅ ${cappedProgress}% complete.</em></p>`;

    if (cappedProgress >= 100) {
      chatBox.innerHTML += `<p><strong>AI:</strong> 🎉 You've completed the quiz! Great job!</p>`;
      started = false;
      progress = 0;
      topic = '';
    }

    chatBox.scrollTop = chatBox.scrollHeight;
  }
</script>
