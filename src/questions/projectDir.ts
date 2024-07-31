import { input } from '@inquirer/prompts';
import fs from 'node:fs';
import chalk from 'chalk';

/**
 * 异步函数，用于获取用户输入的项目目录路径。
 * 如果用户没有提供路径，则默认使用当前工作目录。
 *
 * @returns {Promise<string>} 用户输入的项目目录路径或默认当前工作目录。
 */
export default async () => {
  const fsPromises = fs.promises;
  let projectDir = '';
  // 通过用户输入来获取项目目录路径。
  projectDir = await input({
    message: 'Project directory path ( Default is the current directory ):',
    validate: async (answer) => {
      const errorMessage = `No such directory as "${answer}"`;
      // 如果用户没有输入任何内容，验证通过，允许为空。
      if (answer.length === 0) {
        return true;
      }
      let stats;
      try {
        // 尝试获取用户输入路径的统计信息。
        stats = await fsPromises.stat(answer);
      } catch (err) {
        // 如果路径不存在，返回错误消息。
        if (err != null && typeof err === 'object' && 'code' in err && err.code === 'ENOENT') {
          return errorMessage;
        }
        // 如果是其他错误，抛出异常。
        throw err;
      }
      // 如果路径存在但不是目录，返回错误消息。
      if (!stats.isDirectory()) {
        return errorMessage;
      }
      // 如果路径存在且是目录，验证通过。
      return true;
    },
  });

  // 如果用户没有输入路径，则使用当前工作目录。
  if (projectDir.length === 0) {
    projectDir = process.cwd();
    console.log(chalk.whiteBright.bgGreen(`Using current directory as project directory: ${projectDir}`));
  }

  // 返回项目目录路径。
  return projectDir;
};
