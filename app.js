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

async function generateSummary() {
    //get page number and URL of PDF file
    const pdfURL = window.location.href;
    const pageNumberElement = document.getElementById('pageSelector');
    if (pageNumberElement) {
        const pageNumber = parseInt(pageNumberElement.value, 10);
        console.log(`Current page number: ${pageNumber}`);
    } else {
        console.error('Element with ID "pageSelector" not found');
    }

    const num_pages = document.getElementById('numberInput');
    if (numberInputElement) {
        const numberInputValue = parseInt(numberInputElement.value, 10);
        console.log(`Value from numberInput: ${numberInputValue}`);
    } else {
        console.error('Element with ID "numberInput" not found');
    }

    const response = await fetch('http://localhost:3000/generate-summary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pdfUrl: pdfURL,
            numPages: numberInputValue,
            currPage: pageNumber
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Select the summary-box element
    let summaryBox = document.querySelector('.summary-box');

    // Check if the summary-box element exists
    if (summaryBox) {
        // If it exists, replace its HTML content with the summary
        summaryBox.innerHTML = data.summary;
    } else {
        // If it doesn't exist, create a new div element
        summaryBox = document.createElement('div');

        // Add the class "summary-box" to the new div
        summaryBox.classList.add('summary-box');

        // Set the text content of the new div
        summaryBox.textContent = data.summary;

        // Select the outer-container element
        const outerContainer = document.querySelector('.outer-container');

        // Append the new div to the outer-container
        if (outerContainer) {
            outerContainer.appendChild(summaryBox);
        } else {
            console.error('Element with class "outer-container" not found');
        }
    }
}