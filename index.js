const program = require('commander');
const { prompt } = require('inquirer');

const { cluePrompt } = require('./prompts');
const {
    crosswordHeavenSearch,
    nexusSearch,
} = require('./search');

const SEARCH_WHITELIST = [
    crosswordHeavenSearch,
    nexusSearch,
];

const resolveSearches = (clue, pattern = '') =>
    Promise.all(
        SEARCH_WHITELIST.map(searchFn => searchFn(clue, pattern))
    );

program
    .version('0.0.1')
    .description('Crossword Helper');

program
    .command('clue')
    .alias('c')
    .description('search matching clues')
    .action(() => {
        // only prompt if no args are passed
        // assumes cw="node index.js clue" alias has been set
        if (process.argv[3]) {
            resolveSearches(process.argv.slice(3).join(' '));
        } else {
            prompt(cluePrompt)
                .then(({ clue, pattern }) => resolveSearches(clue, pattern));
        }
    });

program.parse(process.argv);
