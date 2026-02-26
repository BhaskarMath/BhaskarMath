<script type="module">
  
    import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

    const API_KEY = "YOUR_API_KEY_HERE"; 
    const genAI = new GoogleGenerativeAI(API_KEY);

    window.askTeacher = async function() {
        const mathPrompt = document.getElementById('math-prompt').value;
        const resultBox = document.getElementById('result-box');
        const aiResponseText = document.getElementById('ai-text');
        const loadingIndicator = document.getElementById('loader');

        if (!mathPrompt) {
            alert("Please, enter a math problem or question!");
            return;
        }

        
        loadingIndicator.style.display = "block";
        resultBox.style.display = "none";

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            
            const systemInstruction = `
                You are a high-level mathematics professor at BhaskarMath Academy.
                Solve and explain this problem to the student: ${mathPrompt}.
                Follow these rules:
                1. Use a pedagogical and clear language (Answer in Portuguese).
                2. Explain the mathematical formula used before applying it.
                3. Highlight important results.
                4. Use line breaks to ensure the text is easy to read.
            `;

            const result = await model.generateContent(systemInstruction);
            const response = await result.response;
            const formattedText = response.text();

            // Formatting the response for HTML (replacing newlines with <br>)
            aiResponseText.innerHTML = formattedText.replace(/\n/g, "<br>");
            
            // UI: Hide loading and show result
            loadingIndicator.style.display = "none";
            resultBox.style.display = "block";

        } catch (error) {
            loadingIndicator.style.display = "none";
            alert("Connection error with the AI engine. Please check your API Key.");
            console.error("BhaskarMath Error:", error);
        }
    }
</script>

