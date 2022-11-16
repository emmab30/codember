const _ = require('lodash');
const axios = require('axios');

const fromAscii = (text) => {
    // Read text

    let substrings = [];
    let charCodes = [];
    let index = 0;

    while(index < text.length) {
        if(text[index] == ' ') {
            index += 1;
            charCodes.push(32);
            substrings.push(' ');
        } else if(parseInt(text[index]) == 9) {
            substrings.push(text.substring(index, index + 2));
            charCodes.push(text.substring(index, index + 2));
            index += 2;
        } else if(text[index] == '1') {
            substrings.push(text.substring(index, index + 3));
            charCodes.push(text.substring(index, index + 3));
            index += 3;
        }
    }

    const retVal = String.fromCharCode.apply(null, charCodes);
    return retVal;
}

const input = `11610497110107115 102111114 11210897121105110103 9911110010110998101114 11210810197115101 11510497114101`;
console.log(`The response is: \`${fromAscii(input)}\``);