import { execSync } from "child_process";

export const runCommand = (command: string) => {
    try {
        execSync(`${command}`, { stdio: "inherit" });
    } catch (error) {
        return false;
    }

    return true;
};
