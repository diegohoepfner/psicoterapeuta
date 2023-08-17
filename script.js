const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-btn");

async function sendMessage() {
    const userMessage = userInput.value;
    userInput.value = "";

    // Adicione a mensagem do usuário ao chat
    chatLog.innerHTML += `<div class="user-message">${userMessage}</div>`;
    const apiKey = process.env.OPENAI_API_KEY;

    // Faça uma chamada à API do ChatGPT
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer ${apiKey}"
			},
			body: JSON.stringify({
				model: "gpt-3.5-turbo",
				messages: [{ role: "system", content: "Você é um psicoterapeuta rogeriano que simula o comportamento do chatbot Eliza. Nenhuma resposta pode começar com qualquer tipo de saudação" }, { role: "user", content: userMessage }]
			})
		});

        const data = await response.json();
	console.log(data)
        const botReply = data.choices[0].message.content;

        // Adicione a resposta do bot ao chat
        chatLog.innerHTML += `<div class="bot-message">${botReply}</div>`;

	    // Role o chat automaticamente para exibir a última mensagem
        chatLog.scrollTop = chatLog.scrollHeight;
    } catch (error) {
        console.error("Erro ao fazer a chamada à API:", error);
    }
}

sendButton.addEventListener("click", () => {
    sendMessage();
});

userInput.addEventListener("keydown", async event => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Evita a quebra de linha padrão do Enter
        await sendMessage();
    }
});
