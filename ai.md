---
layout: default
title: AI Learning Assistant
---

<style>
  /* Chat container */
  #chat-container {
    max-width: 600px;
    margin: 1rem auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    height: 400px;
    background: #f9f9f9;
  }

  /* Scrollable chat box */
  #chat-box {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  /* Message bubbles */
  .message {
    max-width: 70%;
    margin-bottom: 0.75rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    line-height: 1.3;
    word-wrap: break-word;
  }

  /* User messages (right aligned) */
  .message.user {
    background-color: #0078d7;
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
  }

  /* AI messages (left aligned) */
  .message.ai {
    background-color: #e1e1e1;
    color: #333;
    align-self: flex-start;
    border-bottom-left-radius: 4px;
  }

  /* Input area */
  #input-area {
    display: flex;
    border-top: 1px solid #ccc;
    padding: 0.5rem;
    background: white;
  }

  #user-input {
    flex: 1;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 20px;
    outline: none;
  }

  #send-btn {
    margin-left: 0.5rem;
    background-color: #0078d7;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 0 1rem;
    cursor: pointer;
    font-weight: 600;
  }

  #send-btn:hover {
    background-color: #005ea2;
  }
</style>

<h2 style="text-align:center;">AI Learning Assistant</h2>
<p style="text-align:center;">Type a topic you'd like to be tested on. The AI will quiz you and give feedback as you go!</p>

<div id="chat-container">
  <div id="chat-box"></div>

  <div id="input-area">
    <input type="text" id="user-input" placeholder="Type your answer or topic..." autocomplete="off" />
    <button id="send-btn">Send</button>
  </div>
</div>

<script>
  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  const conversation = [
    {
      role: "system",
      content: `You are a friendly quiz master. 
When the user gives you a topic, ask a deep quiz question about that topic. 
After each user answer, give feedback (correct or not), explain briefly, then ask the next question. 
Be as if you are the ai bot in coursera.`
    }
  ];

  let started = false;

  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
  });

  function addMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message");
    msgDiv.classList.add(sender === "user" ? "user" : "ai");
    msgDiv.textContent = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

 async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  if (!started) {
    conversation.push({ role: "user", content: text });
    started = true;
  } else {
    conversation.push({ role: "user", content: text });
  }

  try {
    const res = await fetch("https://eorl4uarw983g5y.m.pipedream.net", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // CHANGE THIS LINE:
        model: "gemini-pro", // <--- NOW USING GEMINI
        messages: conversation
      })
    });

    const data = await res.json();
    const aiReply = data.response || "Sorry, I didn't get that.";

    conversation.push({ role: "assistant", content: aiReply });
    addMessage(aiReply, "ai");
  } catch (error) {
    // This catch block on the client side will only catch network errors,
    // not HTTP errors like 400.
    // We still need the server-side Pipedream logs to see the actual 400 error message.
    addMessage("⚠️ Error connecting to AI service. Check console for details.", "ai");
    console.error("Fetch error from GitHub Pages:", error);
  }
}
</script>
