const program = require('commander');
const { prompt } = require('inquirer');

const { cluePrompt } = require('./prompts');
const { nexusSearch } = require('./search');

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
            nexusSearch(process.argv.slice(3).join(' '));
        } else {
            prompt(cluePrompt)
                .then(({ clue }) => nexusSearch(clue));
        }
    });

program.parse(process.argv)