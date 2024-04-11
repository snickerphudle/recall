import { getDocument } from 'pdfjs-dist/es5/build/pdf.js';

async function generateSummary(pdfUrl, currPage, numPages) {
    // Get the text from the PDF
    const text = await getText(pdfUrl, currPage, numPages);

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

    print(summary)

    return summary;
}

async function getText(pdfUrl, currentPage, numPages) {
    try {
        // Load the PDF
        const loadingTask = getDocument(pdfUrl);
        const pdf = await loadingTask.promise;

        let text = '';
        for (let i = Math.max(1, currentPage - numPages + 1); i <= currentPage; i++) {
            // Get the page
            const page = await pdf.getPage(i);

            // Extract the text
            const content = await page.getTextContent();
            const strings = content.items.map(item => item.str);
            text += strings.join(' ');
        }

        return text;
    } catch (error) {
        console.error(`Failed to get text from PDF: ${error}`);
        throw error;  // or return some fallback value
    }
}

module.exports = {
    getText,
    generateSummary
};