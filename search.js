const fetch = require('isomorphic-fetch');
const { URL } = require('url');

const { NEXUS_URL } = require('./constants');



const searchClueFactory = (urlBuilder, htmlParser) => async clue => {
    const answers = await fetch(urlBuilder(clue))
        .then(res => res.text())
        .then(htmlParser)
        .catch(console.error);

    console.log(answers.join('\n'));
};

const nexusURLBuilder = clue => {
    const url = new URL(NEXUS_URL);

    url.searchParams.append('clue', clue);

    return url.href;
};

const nexusHTMLParser = html =>
    html.match(/(?<=href="\/word\/)(\w+)/gmi) || [];

const nexusSearch = searchClueFactory(nexusURLBuilder, nexusHTMLParser);

module.exports = {
    nexusSearch,
};
