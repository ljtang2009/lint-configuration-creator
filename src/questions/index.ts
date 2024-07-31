import { ExitPromptError } from '@inquirer/core';
import type { Answers } from '@/types.ts';
import getProjectDir from './projectDir.ts';
import getProjectName from './projectName.ts';
import getProjectType from './projectType.ts';

/**
 * 默认导出一个异步函数，用于获取项目目录和项目名称。
 *
 * @returns {Promise<Answers>} 返回一个承诺，该承诺解析为包含项目目录和项目名称的对象。
 */
export default async (): Promise<Answers> => {
  try {
    // 获取项目类型。
    const projectType = await getProjectType();
    // 获取当前项目的目录。
    const projectDir = await getProjectDir();
    // 在获取的项目目录中获取项目名称。
    const projectName = await getProjectName(projectDir);
    // 返回包含项目目录和项目名称的对象。
    return {
      projectType,
      projectDir,
      projectName,
    };
  } catch (err) {
    // 如果错误是ExitPromptError类型，则优雅地退出进程。
    if (err instanceof ExitPromptError) {
      process.exit(0);
    }
    // 对于其他错误，重新抛出以供上层处理。
    throw err;
  }
};
