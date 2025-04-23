document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const convertButton = document.getElementById('convertButton');
    const copyButton = document.getElementById('copyButton');
    const clearButton = document.getElementById('clearButton');

    function sponge(s) {
        let result = '';
        for (let i = 0; i < s.length; i++) {
            let c = s.charAt(i);
            if (/[a-zA-Z]/.test(c)) {
                result += (i % 2 === 0) ? c.toUpperCase() : c.toLowerCase();
            } else {
                result += c;
            }
        }
        return result;
    }

    convertButton.addEventListener('click', () => {
        outputText.value = sponge(inputText.value)
    });

    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(outputText.value).then(() => {
            alert('Text copied to clipboard');
        }).catch(err => {
            console.log('Failed to copy text', err);
            alert('Failed to copy text');
        });
    });

    clearButton.addEventListener('click', () => {
        inputText.value = '';
        outputText.value = '';
    });
});