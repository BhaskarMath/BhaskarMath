import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";


let API_KEY = localStorage.getItem("bhaskarmat_api_key");

window.askTeacher = async function() {
    const mathPrompt = document.getElementById('math-prompt').value;
    const resultBox = document.getElementById('result-box');
    const aiResponseText = document.getElementById('ai-text');
    const loadingIndicator = document.getElementById('loader');

    
    if (!mathPrompt) {
        alert("Please, enter a math problem or question!");
        return;
    }

    
    if (!API_KEY) {
        API_KEY = prompt("Enter your Google AI API Key (This will be saved locally in your browser):");
        if (API_KEY) {
            localStorage.setItem("bhaskarmat_api_key", API_KEY);
        } else {
            alert("API Key is required to use the AI Teacher.");
            return;
        }
    }

    
    loadingIndicator.style.display = "block";
    resultBox.style.display = "none";

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const systemInstruction = `
            You are a high-level mathematics professor at BhaskarMath Academy.
            Solve and explain this problem to the student: ${mathPrompt}.
            Follow these rules:
            1. Use pedagogical and clear language (Always answer in English).
            2. Explain the mathematical formula used before applying it.
            3. Highlight important results and steps.
            4. Use line breaks to ensure the text is easy to read on mobile.
        `;

        const result = await model.generateContent(systemInstruction);
        const response = await result.response;
        const formattedText = response.text();

        
        aiResponseText.innerHTML = formattedText.replace(/\n/g, "<br>");

        
        loadingIndicator.style.display = "none";
        resultBox.style.display = "block";

    } catch (error) {
        loadingIndicator.style.display = "none";
        console.error("BhaskarMath Error:", error);
        
        
        if (error.message.includes("API_KEY_INVALID") || error.message.includes("403")) {
            alert("Invalid API Key! Please check your Google AI Studio settings. Resetting key...");
            localStorage.removeItem("bhaskarmat_api_key");
            API_KEY = null;
        } else {
            alert("Connection error. Please check your internet or API limits.");
        }
    }
}


window.resetApiKey = function() {
    localStorage.removeItem("bhaskarmat_api_key");
    alert("API Key removed from browser storage.");
    location.reload();
}
