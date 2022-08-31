#!/usr/bin/env node

const { execSync } = require("child_process");

const runCommand = command => {
    try {
        execSync(`${command}`, { stdio: "inherit" });
    } catch (error) {
        console.error(`Failed to execute ${command}`, error);

        return false;
    }

    return true;
};

const projectName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/fgarrec0397/Granity.git ${projectName}`;
const installDepsCommand = `cd ${projectName} && npm install && cd app && npm install && cd ../server && npm install`

console.log(`Cloning the repositery with name ${projectName}`);

const checkedOut = runCommand(gitCheckoutCommand);

if (!checkedOut) {
    process.exit(-1)
}

console.log(`Installing dependencies for ${projectName}`);

const installingCommand = runCommand(installDepsCommand);

if (!checkedOut) {
    process.exit(-1)
}

console.log(`Congratulation! You are now ready to work`);