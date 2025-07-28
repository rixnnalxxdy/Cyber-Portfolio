---
layout: default
title: AI Quiz Assistant
---

<h1>🧠 AI Quiz Assistant</h1>

<p>Select a topic to be quizzed on:</p>

<select id="topic-select">
  <option value="">-- Choose a topic --</option>
  <option value="web">Web Exploitation</option>
  <option value="networking">Networking</option>
  <option value="recon">Reconnaissance</option>
</select>

<div id="chat-box" style="margin-top: 1em; border: 1px solid #ccc; padding: 1em; height: 300px; overflow-y: scroll;"></div>

<input id="user-input" type="text" placeholder="Type your answer..." style="width: 80%;" />
<button onclick="sendMessage()">Send</button>

<script src="/assets/js/quiz.js"></script>
