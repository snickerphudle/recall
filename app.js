// Import the pdfjs-dist library
const pdfjsLib = require('pdfjs-dist');
require('dotenv').config();

// UI Buttons
const minusBtn = document.getElementById('minusBtn');
const plusBtn = document.getElementById('plusBtn');
const numberInput = document.getElementById('numberInput');

minusBtn.addEventListener('click', () => {
    if (numberInput.value != 0) {
        numberInput.value = parseInt(numberInput.value) - 1;
    }
});

plusBtn.addEventListener('click', () => {
    numberInput.value = parseInt(numberInput.value) + 1;
});

const doItBtn = document.getElementById('doItBtn');
doItBtn.addEventListener('click', () => {
    const value = parseInt(numberInput.value);
    // Perform your action here with the value
    console.log(`Let's do it with value: ${value}`);
});

async function generateSummary(pdfUrl, numPages) {
    // Get the text from the PDF
    const text = await getText(pdfUrl, numPages);

    // Make API call to OpenAI's GPT-3 model
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.OPENAI_API_KEY
        },
        body: JSON.stringify({
            prompt: text,
            max_tokens: 100 // Adjust as needed
        })
    });

    const data = await response.json();

    // The summary is in the 'choices' array in the returned data
    const summary = data.choices[0].text.trim();

    return summary;

    return summary;
}

async function getText(pdfUrl, numPages) {
    // Load the PDF
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;

    let text = '';
    for (let i = pdf.numPages; i > pdf.numPages - numPages; i--) {
        // Get the page
        const page = await pdf.getPage(i);

        // Extract the text
        const content = await page.getTextContent();
        const strings = content.items.map(item => item.str);
        text += strings.join(' ');
    }

    return text;
}