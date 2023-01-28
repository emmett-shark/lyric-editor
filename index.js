'use strict';
const copy = function() {
    let copyText = document.getElementById('output');
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
};

const generate = function() {
    try {
        let inputText = document.getElementById('input').value;
        let separator = document.getElementById('separator').value;
        let csv = $.csv.toArrays(inputText, {'separator': getSeparatorChar(separator)});
        let generatedLyrics = [];
        csv.forEach((row, i) => {
            if (!row[1]) throw new Error('row ' + i + ' has no lyrics');
            let beat = parseFloat(row[0]);
            if (!beat && beat !== 0) throw new Error('row ' + i + ' beat is not a number');
            generatedLyrics.push({ "bar": beat, "text": row[1] });
        });
        let copyText = document.getElementById('output');
        copyText.innerHTML = JSON.stringify(generatedLyrics);
        copyText.select();
        navigator.clipboard.writeText(copyText.value);
        let message = document.getElementById('message');
        message.style.color = 'black';
        message.innerHTML = 'copied to clipboard!'
    } catch (e) {
        let message = document.getElementById('message');
        message.style.color = 'red';
        message.innerHTML = e;
    }
};

const getSeparatorChar = function(text) {
    switch(text) {
        case 'comma': return ',';
        case 'colon': return ':';
        case 'space': return ' ';
        case 'pipe': return '|';
        case 'tab':
        default: return '\t';
    }
}