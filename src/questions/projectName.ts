import { input } from '@inquirer/prompts';
import { basename } from 'node:path';
import chalk from 'chalk';

/**
 * Asynchronously prompts for and returns the project name.
 * If the user does not input a project name, the default is the name of the current directory.
 *
 * @param projectDir The path of the project directory, used as the default project name if no input is provided.
 * @returns The project name input by the user or the default project name.
 */
export default async (projectDir: string) => {
  let projectName = '';

  // Prompt the user to input the project name, with the current directory name as the default.
  projectName = await input({
    message: 'Project Name ( Default is the current directory name ):',
  });

  // If the user did not input a project name, use the default name.
  if (projectName.length === 0) {
    projectName = basename(projectDir);
    // Notify the user that the default project name is being used.
    console.log(chalk.whiteBright.bgGreen('Use default project name:', projectName));
  }

  return projectName;
};
