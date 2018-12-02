const fetch = require('isomorphic-fetch');
const { URL } = require('url');

const { NEXUS_URL } = require('./constants');



const searchClueFactory = (siteName, urlBuilder, htmlParser) => async clue => {
    const borderString = Array(siteName.length + 1).join("-");
    const answers = await fetch(urlBuilder(clue))
        .then(res => res.text())
        .then(htmlParser)
        .catch(console.error);

    console.log(borderString);
    console.log(siteName);
    console.log(borderString);
    console.log(answers.join('\n'));
};

const nexusURLBuilder = clue => {
    const url = new URL(NEXUS_URL);

    url.searchParams.append('clue', clue);

    return url.href;
};

const nexusHTMLParser = html =>
    html.match(/(?<=href="\/word\/)(\w+)/gmi) || [];

const nexusSearch = searchClueFactory('NEXUS', nexusURLBuilder, nexusHTMLParser);

module.exports = {
    nexusSearch,
};
