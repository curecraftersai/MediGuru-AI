// DOM Elements
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const authModal = document.getElementById('auth-modal');
const overlay = document.getElementById('overlay');
const closeBtn = document.querySelector('.close');
const modalTitle = document.getElementById('modal-title');
const switchAuth = document.getElementById('switch-auth');
const authSubmit = document.getElementById('auth-submit');
const submitBtn = document.getElementById('submit-btn');
const chatMessages = document.getElementById('chat-messages');
const userForm = document.getElementById('user-form');
const chatInputContainer = document.getElementById('chat-input-container');
const chatInput = document.getElementById('chat-input');
const sendMessageBtn = document.getElementById('send-message-btn');

// Sample medicine database (in a real app, this would be from a server/ML model)
const medicineDatabase = {
  "ibuprofen": {
    name: "Ibuprofen",
    sideEffects: [
      "Upset stomach, nausea, vomiting",
      "Headache, dizziness, drowsiness",
      "Ringing in the ears",
      "Mild heartburn or stomach pain"
    ],
    prevention: [
      "Take with food or milk to reduce stomach upset",
      "Use the lowest effective dose for shortest duration",
      "Avoid alcohol while taking this medication",
      "Stay hydrated and don't take on an empty stomach"
    ],
    whenToSeeDoctor: [
      "Severe stomach pain or black, tarry stools",
      "Chest pain, shortness of breath, or weakness on one side",
      "Swelling of ankles/feet or sudden/unexplained weight gain",
      "Signs of kidney problems (change in urine amount, painful urination)",
      "Symptoms of liver damage (persistent nausea, yellowing eyes/skin, dark urine)"
    ]
  },
  "amoxicillin": {
    name: "Amoxicillin",
    sideEffects: [
      "Nausea, vomiting, or diarrhea",
      "Headache",
      "Change in taste",
      "Yeast infection (oral or vaginal)"
    ],
    prevention: [
      "Take at evenly spaced intervals to maintain consistent levels",
      "Complete the full prescribed course even if you feel better",
      "Consider taking probiotics to maintain gut flora",
      "Take with food if stomach upset occurs"
    ],
    whenToSeeDoctor: [
      "Severe diarrhea (watery or bloody)",
      "Signs of allergic reaction (rash, itching, swelling, severe dizziness)",
      "Dark urine, persistent nausea/vomiting, yellowing eyes/skin",
      "Persistent sore throat, fever, or easy bruising/bleeding",
      "New signs of infection (e.g., white patches in mouth)"
    ]
  },
  "metformin": {
    name: "Metformin",
    sideEffects: [
      "Nausea, vomiting, stomach upset",
      "Diarrhea",
      "Weakness or tiredness",
      "Metallic taste in mouth"
    ],
    prevention: [
      "Take with meals to reduce gastrointestinal side effects",
      "Start with low dose and gradually increase as directed",
      "Drink plenty of fluids to stay hydrated",
      "Avoid excessive alcohol consumption"
    ],
    whenToSeeDoctor: [
      "Signs of lactic acidosis (unusual muscle pain, trouble breathing, feeling cold, dizziness, feeling very weak or tired)",
      "Severe stomach pain, nausea/vomiting that doesn't stop",
      "Signs of low blood sugar (sudden sweating, shaking, fast heartbeat, hunger, blurred vision)",
      "Symptoms of vitamin B12 deficiency (numbness/tingling, mood changes, unusual tiredness)"
    ]
  },
  "lisinopril": {
    name: "Lisinopril",
    sideEffects: [
      "Dizziness, lightheadedness",
      "Dry cough",
      "Headache",
      "High potassium levels (muscle weakness, slow/irregular heartbeat)"
    ],
    prevention: [
      "Rise slowly from sitting/lying positions to minimize dizziness",
      "Stay hydrated but don't over-consume potassium-rich foods",
      "Avoid salt substitutes containing potassium",
      "Protect yourself from excessive sun exposure"
    ],
    whenToSeeDoctor: [
      "Signs of high potassium (muscle weakness, slow/irregular heartbeat)",
      "Fainting or severe dizziness",
      "Symptoms of kidney problems (change in urine amount, blood in urine)",
      "Signs of infection (sore throat, fever) that persist",
      "Yellowing eyes/skin, dark urine, severe stomach/abdominal pain"
    ]
  },
  "atorvastatin": {
    name: "Atorvastatin",
    sideEffects: [
      "Muscle/joint pain",
      "Diarrhea or constipation",
      "Nausea",
      "Headache"
    ],
    prevention: [
      "Take at the same time each day",
      "Avoid grapefruit and grapefruit juice",
      "Report any unexplained muscle pain or weakness immediately",
      "Regular liver function tests as recommended by your doctor"
    ],
    whenToSeeDoctor: [
      "Unexplained muscle pain, tenderness, or weakness (especially with fever or fatigue)",
      "Signs of liver problems (yellowing eyes/skin, dark urine, severe stomach/abdominal pain)",
      "Symptoms of high blood sugar (increased thirst/urination)",
      "Chest pain, shortness of breath, or signs of stroke"
    ]
  }
};

// Authentication Modal
let isLoginMode = true;

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  isLoginMode = true;
  modalTitle.textContent = "Login";
  authModal.style.display = "flex";
  overlay.style.display = "block";
});

signupBtn.addEventListener('click', (e) => {
  e.preventDefault();
  isLoginMode = false;
  modalTitle.textContent = "Sign Up";
  authModal.style.display = "flex";
  overlay.style.display = "block";
});

closeBtn.addEventListener('click', () => {
  authModal.style.display = "none";
  overlay.style.display = "none";
});

overlay.addEventListener('click', () => {
  authModal.style.display = "none";
  overlay.style.display = "none";
});

switchAuth.addEventListener('click', (e) => {
  e.preventDefault();
  isLoginMode = !isLoginMode;
  modalTitle.textContent = isLoginMode ? "Login" : "Sign Up";
});

authSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  // Show under construction message
  alert("The site is under construction. This feature is not yet available.");
});

// Form Submission
submitBtn.addEventListener('click', () => {
  processFormSubmission();
});

// Chat functionality after form submission
sendMessageBtn.addEventListener('click', () => {
  sendChatMessage();
});

chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendChatMessage();
  }
});

// Helper Functions
function processFormSubmission() {
  // Validate form
  const name = document.getElementById('user-name').value.trim();
  const age = document.getElementById('user-age').value.trim();
  const weight = document.getElementById('user-weight').value.trim();
  const medHistory = document.getElementById('med-history').value.trim();
  const allergies = document.getElementById('allergies').value.trim();
  const medicationQuery = document.getElementById('medication-query').value.trim().toLowerCase();
  
  if (!name || !age || !weight || !medicationQuery) {
    addMessage("Please fill in all required fields before submitting.", "error");
    return;
  }
  
  // Show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="loading"></span> Analyzing...';
  submitBtn.classList.add('pulse');
  
  // Simulate API call to ML model
  setTimeout(() => {
    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Analyze <i class="fas fa-paper-plane"></i>';
    submitBtn.classList.remove('pulse');
    
    // Add user message to chat
    addUserMessage(`My name is ${name}, I'm ${age} years old, weigh ${weight} kg. Medical history: ${medHistory || 'None provided'}. Allergies: ${allergies || 'None reported'}. I want to know about ${medicationQuery}.`);
    
    // Check if medication exists in database
    if (medicineDatabase[medicationQuery]) {
      const medInfo = medicineDatabase[medicationQuery];
      displayMedicineInfo(medInfo, name, age, weight, medHistory, allergies);
      
      // After showing medicine info, show the chat input for further questions
      setTimeout(() => {
        showChatInput();
        addMessage(`Thank you for using MediGuard AI, ${name}! You can now ask me any follow-up questions about ${medInfo.name} or other medications. I'm here to help!`, "bot");
      }, 1500);
    } else {
      addMessage(`I'm sorry, but I don't have detailed information about "${medicationQuery}" in my database yet. Please consult with your healthcare provider for information about this medication. I'm continuously learning and expanding my knowledge base!`, "bot");
      
      // Still show chat input for other questions
      setTimeout(() => {
        showChatInput();
        addMessage("Is there another medication you'd like to know about? Or do you have any other health-related questions?", "bot");
      }, 1500);
    }
  }, 1500);
}

function showChatInput() {
  // Hide the form
  userForm.style.display = 'none';
  
  // Show the chat input
  chatInputContainer.style.display = 'block';
  
  // Focus on the chat input
  chatInput.focus();
}

function sendChatMessage() {
  const message = chatInput.value.trim();
  
  if (!message) return;
  
  // Add user message to chat
  addUserMessage(message);
  
  // Clear input
  chatInput.value = '';
  
  // Show typing indicator
  showTypingIndicator();
  
  // Process message (simulated AI response)
  setTimeout(() => {
    hideTypingIndicator();
    processAIResponse(message);
  }, 1000 + Math.random() * 1000); // Random delay for more natural feel
}

function showTypingIndicator() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message bot-message typing-indicator';
  typingDiv.id = 'typing-indicator';
  typingDiv.innerHTML = `
    <div class="message-avatar">
      <i class="fas fa-heartbeat"></i>
    </div>
    <div class="message-content">
      <div class="message-header">
        <span class="message-sender">MediGuard AI</span>
        <span class="message-time">typing...</span>
      </div>
      <div class="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  `;
  chatMessages.appendChild(typingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
  const typingIndicator = document.getElementById('typing-indicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

function processAIResponse(message) {
  // Convert to lowercase for easier matching
  const lowerMsg = message.toLowerCase();
  
  // Simple keyword-based responses
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
    addMessage("Hello again! I'm here to help with any medication questions you might have. Feel free to ask about side effects, interactions, or anything else related to your medications.", "bot");
  }
  else if (lowerMsg.includes('thank') || lowerMsg.includes('thanks')) {
    addMessage("You're very welcome! I'm glad I could help. Remember, I'm always here if you have more questions about your medications or health.", "bot");
  }
  else if (lowerMsg.includes('side effect') || lowerMsg.includes('side effects') || lowerMsg.includes('adverse effect')) {
    addMessage("Side effects can vary depending on the specific medication, your age, weight, and medical history. For the most accurate information, please tell me the name of the medication you're asking about.", "bot");
  }
  else if (lowerMsg.includes('how to') || lowerMsg.includes('prevent') || lowerMsg.includes('avoid')) {
    addMessage("Prevention strategies for medication side effects typically include: taking with food, staying hydrated, using the lowest effective dose, avoiding alcohol, and taking at consistent times. For specific advice, please tell me which medication you're referring to.", "bot");
  }
  else if (lowerMsg.includes('when') && (lowerMsg.includes('doctor') || lowerMsg.includes('medical help') || lowerMsg.includes('emergency'))) {
    addMessage("You should see a doctor immediately if you experience: severe allergic reactions (difficulty breathing, swelling), chest pain, severe dizziness or fainting, unusual bleeding or bruising, severe stomach pain, signs of liver problems (yellowing skin/eyes), or any symptom that significantly impacts your daily life. When in doubt, always consult your healthcare provider.", "bot");
  }
  else if (lowerMsg.includes('interact') || lowerMsg.includes('interaction')) {
    addMessage("I can help you understand potential drug interactions. Please tell me which medications you're taking together, and I'll provide information on possible interactions. For safety, always consult your doctor or pharmacist about drug interactions.", "bot");
  }
  else if (lowerMsg.includes('dose') || lowerMsg.includes('dosage')) {
    addMessage("I can't provide specific dosage recommendations as this should be determined by your healthcare provider based on your individual health profile. Generally, it's best to start with the lowest effective dose and follow your doctor's instructions carefully.", "bot");
  }
  else if (lowerMsg.includes('bye') || lowerMsg.includes('goodbye') || lowerMsg.includes('see you')) {
    addMessage("Thank you for using MediGuard AI! Remember to always consult with your healthcare provider for medical advice. Take care and stay healthy!", "bot");
  }
  else {
    // Check if message contains a medicine name from our database
    let medicineFound = false;
    for (const [key, medInfo] of Object.entries(medicineDatabase)) {
      if (lowerMsg.includes(key)) {
        displayMedicineInfo(medInfo);
        medicineFound = true;
        break;
      }
    }
    
    if (!medicineFound) {
      addMessage("I understand you have a question, but I need a bit more specific information to provide the best answer. Could you tell me which medication you're asking about? Or feel free to ask about side effects, prevention strategies, or when to see a doctor.", "bot");
    }
  }
}

function addUserMessage(text) {
  const now = new Date();
  const timeString = now.getHours() + ":" + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
  
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message user-message';
  messageDiv.innerHTML = `
    <div class="message-content">
      <div class="message-header">
        <span class="message-sender">You</span>
        <span class="message-time">${timeString}</span>
      </div>
      <p>${text}</p>
    </div>
    <div class="message-avatar">
      <i class="fas fa-user"></i>
    </div>
  `;
  
  // For user messages, avatar goes at the end
  const content = messageDiv.querySelector('.message-content');
  const avatar = messageDiv.querySelector('.message-avatar');
  messageDiv.removeChild(avatar);
  messageDiv.appendChild(avatar);
  
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addMessage(text, type = "bot") {
  const now = new Date();
  const timeString = now.getHours() + ":" + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
  
  const messageDiv = document.createElement('div');
  
  if (type === "error") {
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = `
      <div class="message-avatar">
        <i class="fas fa-heartbeat"></i>
      </div>
      <div class="message-content">
        <div class="message-header">
          <span class="message-sender">MediGuard AI</span>
          <span class="message-time">${timeString}</span>
        </div>
        <div class="error-message">${text}</div>
      </div>
    `;
  } else if (type === "success") {
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = `
      <div class="message-avatar">
        <i class="fas fa-heartbeat"></i>
      </div>
      <div class="message-content">
        <div class="message-header">
          <span class="message-sender">MediGuard AI</span>
          <span class="message-time">${timeString}</span>
        </div>
        <div class="success-message">${text}</div>
      </div>
    `;
  } else {
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = `
      <div class="message-avatar">
        <i class="fas fa-heartbeat"></i>
      </div>
      <div class="message-content">
        <div class="message-header">
          <span class="message-sender">MediGuard AI</span>
          <span class="message-time">${timeString}</span>
        </div>
        <p>${text}</p>
      </div>
    `;
  }
  
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function displayMedicineInfo(medInfo, userName, userAge, userWeight, medHistory, allergies) {
  let response = "";
  
  if (userName) {
    response = `Thank you for providing your information, ${userName}. Based on your profile and the medication you asked about, here's what I found for <strong>${medInfo.name}</strong>:`;
    addMessage(response, "bot");
  } else {
    addMessage(`Here's detailed information about <strong>${medInfo.name}</strong>:`, "bot");
  }
  
  // Create medicine info card
  const medicineCard = document.createElement('div');
  medicineCard.className = 'medicine-card';
  medicineCard.innerHTML = `
    <h4>Common Side Effects</h4>
    <ul>
      ${medInfo.sideEffects.map(effect => `<li>${effect}</li>`).join('')}
    </ul>
    
    <h4>Prevention & Management Tips</h4>
    <ul>
      ${medInfo.prevention.map(tip => `<li>${tip}</li>`).join('')}
    </ul>
    
    <div class="warning">
      <strong>When to See a Doctor:</strong>
      <ul>
        ${medInfo.whenToSeeDoctor.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `;
  
  chatMessages.appendChild(medicineCard);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  // Add personalized advice based on user data (if available)
  if (userName) {
    let personalizedAdvice = `<strong>Personalized Considerations for You:</strong> `;
    
    // Age-based advice
    if (parseInt(userAge) > 65) {
      personalizedAdvice += `As someone over 65, you may be more sensitive to certain side effects. Please start with the lowest effective dose and monitor closely for any adverse reactions. `;
    }
    
    // Weight-based advice
    if (parseInt(userWeight) < 50) {
      personalizedAdvice += `Given your weight, you might want to discuss with your doctor if a lower dose would be appropriate for you. `;
    }
    
    // Medical history considerations
    if (medHistory && (medHistory.toLowerCase().includes('kidney') || medHistory.toLowerCase().includes('renal'))) {
      personalizedAdvice += `Since you mentioned kidney issues, please ensure your doctor has evaluated your kidney function before starting this medication, as dosage adjustments may be needed. `;
    }
    
    if (medHistory && (medHistory.toLowerCase().includes('liver') || medHistory.toLowerCase().includes('hepatic'))) {
      personalizedAdvice += `Given your liver condition, your doctor should monitor your liver function while you're on this medication. `;
    }
    
    // Allergy considerations
    if (allergies && allergies.toLowerCase() !== 'none') {
      personalizedAdvice += `Remember to inform any healthcare provider about your allergies (${allergies}) before starting new medications. `;
    }
    
    // Add a disclaimer
    personalizedAdvice += `Remember, I'm an AI assistant and this information doesn't replace professional medical advice. Always consult with your healthcare provider before making any changes to your medication regimen.`;
    
    addMessage(personalizedAdvice, "bot");
  }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  // Add additional typing animation styles
  const style = document.createElement('style');
  style.textContent = `
    .typing-dots {
      display: flex;
      padding: 5px 0;
    }
    .typing-dots span {
      height: 8px;
      width: 8px;
      margin: 0 3px;
      background-color: var(--primary-green);
      display: block;
      border-radius: 50%;
      opacity: 0.4;
      animation: typing 1s infinite;
    }
    .typing-dots span:nth-child(1) {
      animation-delay: 0s;
    }
    .typing-dots span:nth-child(2) {
      animation-delay: 0.2s;
    }
    .typing-dots span:nth-child(3) {
      animation-delay: 0.4s;
    }
    @keyframes typing {
      0%, 100% {
        opacity: 0.4;
      }
      50% {
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Add focus effects to form inputs
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
    });
  });
});