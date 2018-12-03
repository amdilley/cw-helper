const fetch = require('isomorphic-fetch');
const { URL } = require('url');

const {
    CROSSWORD_HEAVEN_URL,
    NEXUS_URL,
} = require('./constants');

const searchClueFactory = (siteName, urlBuilder, htmlParser) => async (clue, pattern) => {
    const borderString = Array(siteName.length + 1).join('-');
    const answers = await fetch(urlBuilder(clue, pattern))
        .then(res => res.text())
        .then(htmlParser)
        .catch(console.error);

    console.log(borderString);
    console.log(siteName);
    console.log(borderString);
    console.log(answers.join('\n').toUpperCase(), '\n');
};

const crosswordHeavenURLBuilder = (clue, pattern) => {
    const url = new URL(CROSSWORD_HEAVEN_URL);

    url.searchParams.append('clue', clue);
    url.searchParams.append('answer', pattern);

    return url.href;
};

const crosswordHeavenHTMLParser = html =>
    html.match(/(?<=href="\/words\/)(\w+)/gmi) || [];

const crosswordHeavenSearch = searchClueFactory(
    'Crossword Heaven',
    crosswordHeavenURLBuilder,
    crosswordHeavenHTMLParser
);

const nexusURLBuilder = (clue, pattern) => {
    const url = new URL(NEXUS_URL);

    url.searchParams.append('clue', clue);
    url.searchParams.append('pattern', pattern);

    return url.href;
};

const nexusHTMLParser = html =>
    html.match(/(?<=href="\/word\/)(\w+)/gmi) || [];

const nexusSearch = searchClueFactory(
    'Nexus',
    nexusURLBuilder,
    nexusHTMLParser
);

module.exports = {
    crosswordHeavenSearch,
    nexusSearch,
};
