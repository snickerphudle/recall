import { getText } from './summary.js';

async function testGetText() {
    const pdfUrl = 'https://www.rfpmm.org/pdf/how-to-win-friends-and-influence-people.pdf';  // Replace with your PDF URL
    const currentPage = 1;
    const numPages = 1;

    try {
        const text = await getText(pdfUrl, currentPage, numPages);
        console.log(text);
    } catch (error) {
        console.error(`Failed to get text: ${error}`);
    }
}

testGetText();