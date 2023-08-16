const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-btn");

function sendMessage() {
    const userMessage = userInput.value;
    userInput.value = "";

    // Adicione a mensagem do usuário ao chat
    chatLog.innerHTML += `<div class="user-message">${userMessage}</div>`;

    // Faça uma chamada à API do ChatGPT
    fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: "Você é um psicoterapeuta rogeriano." }, { role: "user", content: userMessage }]
        })
    })
    .then(response => response.json())
    .then(data => {
        const botReply = data.choices[0].message.content;

        // Adicione a resposta do bot ao chat
        chatLog.innerHTML += `<div class="bot-message">${botReply}</div>`;
    });
}

sendButton.addEventListener("click", () => {
    sendMessage();
});

userInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        event.preventDefault(); // Evita a quebra de linha padrão do Enter
        sendMessage();
    }
});
