const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const topicSelect = document.getElementById('topic-select');

let currentTopic = '';
let questionIndex = 0;
let currentQuestions = [];

const questions = {
  web: [
    { q: "What is XSS and how can it be mitigated?", a: "xss" },
    { q: "Explain how CSRF attacks work.", a: "csrf" }
  ],
  networking: [
    { q: "What port does SSH use?", a: "22" },
    { q: "What is the difference between TCP and UDP?", a: "tcp vs udp" }
  ],
  recon: [
    { q: "What tool can you use to scan open ports?", a: "nmap" },
    { q: "What is subdomain enumeration?", a: "subdomain" }
  ]
};

topicSelect.addEventListener('change', () => {
  currentTopic = topicSelect.value;
  questionIndex = 0;
  currentQuestions = questions[currentTopic] || [];
  chatBox.innerHTML = '';
  if (currentQuestions.length > 0) {
    addBotMessage(`Let's start the quiz on **${currentTopic}**!`);
    askQuestion();
  }
});

function askQuestion() {
  if (questionIndex < currentQuestions.length) {
    addBotMessage(currentQuestions[questionIndex].q);
  } else {
    addBotMessage("🎉 Quiz complete! Great job!");
  }
}

function sendMessage() {
  const userMsg = userInput.value;
  if (!userMsg) return;
  addUserMessage(userMsg);
  userInput.value = '';

  // simple keyword check
  const expected = currentQuestions[questionIndex].a.toLowerCase();
  if (userMsg.toLowerCase().includes(expected)) {
    addBotMessage("✅ Correct!");
  } else {
    addBotMessage("❌ Not quite. Review your notes and try again.");
  }

  questionIndex++;
  setTimeout(askQuestion, 1000);
}

function addUserMessage(msg) {
  chatBox.innerHTML += `<p><strong>You:</strong> ${msg}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}

function addBotMessage(msg) {
  chatBox.innerHTML += `<p><strong>Bot:</strong> ${msg}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}
