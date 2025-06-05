// Function to extract information from the page
function extractInformation() {
    // Extract inventory number from the Inventario cell
    const inventory = document.querySelector('tr th:contains("Inventario") + td').textContent.trim();

    // Extract hidden input values
    const hiddenInputs = document.querySelectorAll('input[type="hidden"]');
    const idt = hiddenInputs[0].value;
    const table = hiddenInputs[1].value;

    console.log(idt, table);
    // Extract museum code from the last hidden input name
    const museumCode = hiddenInputs[1].name.match(/[^0-9]+$/)[0];

    return {
        idt,
        inventory,
        table,
        museum: museumCode
    };
}

// Function to generate the CERES URL
function generateCERESUrl() {
    const info = extractInformation();
    return `https://ceres.mcu.es/pages/Main?idt=${info.idt}&inventary=${info.inventory}&table=${info.table}&museum=${info.museum}`;
}

// Create a button to copy the URL
function createCopyButton() {
    console.log("Creating button");
    const button = document.createElement('button');
    button.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        z-index: 1000;
    `;
    button.textContent = 'Copy CERES URL';

    button.addEventListener('click', () => {
        const url = generateCERESUrl();
        navigator.clipboard.writeText(url).then(() => {
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = 'Copy CERES URL';
            }, 2000);
        });
    });

    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
        position: relative;
        width: 100%;
        height: 50px;
        background-color: #4CAF50;
        display: flex;
        justify-content: center;
        align-items: center;
    `;
    button.style.cssText += `
        font-size: 24px;
        padding: 10px 40px;
    `;
    buttonContainer.appendChild(button);
    document.body.insertBefore(buttonContainer, document.body.firstChild);
}

// Add the button when the page loads
document.addEventListener('DOMContentLoaded', createCopyButton);
