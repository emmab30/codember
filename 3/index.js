const _ = require('lodash');
const axios = require('axios');

const getFile = () => {
    return axios.get(`https://codember.dev/colors.txt`)
    .then((response) => {
        const data = response.data;
        return data;
    });
}

// Get array of series using lodash transformations
// Based on the input, it will look for a continue serie of at least 3 elements
// Returns an array of colors with longest paths in the following format
// [{ color: 'xx', length: 1 }, { color: 'yy', length: 2 }]
const getSeries = (array) => {
    let series = [];
    let maxIndex = array.length;

    for(var cursorIndex = 0; cursorIndex < maxIndex; cursorIndex++) {
        // Find if we need to read for a pattern
        const possiblePatternMatch = (
            array[cursorIndex] == array[cursorIndex + 2] &&
            array[cursorIndex] != array[cursorIndex + 1]
        );
        
        if(possiblePatternMatch) {
            const colors = [array[cursorIndex], array[cursorIndex + 1]];
            let indexColor = 0;
            let serieLength = 0, lastSerieColor = '';

            for(var i=cursorIndex; i < array.length; i++) {
                const isValidPath = (array[i] == colors[indexColor]);
                if(!isValidPath) break;

                lastSerieColor = colors[indexColor];
                serieLength += 1;
                indexColor = indexColor == 0 ? 1 : 0;
            }

            series.push({
                color: lastSerieColor,
                length: serieLength
            });
        }
    }

    const orderedSeries = _.orderBy(series, ['length'], 'desc');
    return orderedSeries;
}

getFile().then((colors) => {
    const series = getSeries(colors);
    const maxSerie = _.maxBy(series, 'length')
    console.log(`[Solution] The longest serie is ${maxSerie.length} with color ${maxSerie.color}`);
});