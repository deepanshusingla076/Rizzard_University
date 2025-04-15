const chatbotContainer = document.querySelector('.chatbot-container');
const chatToggle = document.getElementById('chatbot-toggle');
const closeButton = document.getElementById('close-chatbot');
const chatInput = document.getElementById('chatbot-input-field');
const sendButton = document.getElementById('send-message'); 
const messagesContainer = document.querySelector('.chatbot-messages');

chatToggle.addEventListener('click', () => {
    chatbotContainer.classList.add('visible'); 
    chatToggle.classList.add('hidden');
});

closeButton.addEventListener('click', () => {
    chatbotContainer.classList.remove('visible'); 
    chatToggle.classList.remove('hidden');
});

sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    chatInput.value = '';

    const loadingId = Date.now().toString();
    addMessage("Thinking...", 'bot', loadingId);

    try {
        const response = await fetch("https://grok-3-0-ai.p.rapidapi.com/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-rapidapi-host": "grok-3-0-ai.p.rapidapi.com",
                "x-rapidapi-key": "9e4b42b01emsh217d7238d693e10p1a1b6bjsn7f96acee788f"
            },
            body: JSON.stringify({
                model: "grok-3",
                messages: [{ role: "user", content: message }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);
 
        removeMessage(loadingId);

        // Process Grok API response format
        if (data && data.choices && data.choices[0] && data.choices[0].message) {
            addMessage(data.choices[0].message.content, 'bot');
        } else {
            addMessage("Error: Unexpected response format from AI service.", 'bot');
        }
    } catch (error) {
        removeMessage(loadingId);
        addMessage("Error: Unable to reach AI service. Please try again later.", 'bot');
        console.error("Chatbot API Error:", error);
    }
}

function addMessage(content, sender, id = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    if (id) {
        messageDiv.id = id;
    }
    
    const timestamp = new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    messageDiv.innerHTML = `
        <div class="message-content">${content}</div>
        <div class="message-timestamp">${timestamp}</div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeMessage(id) {
    const message = document.getElementById(id);
    if (message) {
        message.remove();
    }
}

