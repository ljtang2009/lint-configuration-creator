import { fileURLToPath } from 'node:url';
import path from 'node:path';
import _fs from 'node:fs';
import type { Answers, TemplateInfo } from '@/types.ts';

const fs = _fs.promises;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * 异步遍历目录及其子目录，返回所有文件路径的数组。
 *
 * @param directoryPath 要遍历的目录路径。
 * @returns Promise，解析为包含所有文件路径的数组。
 */
async function traverseDirectory(directoryPath: string) {
  // 初始化文件数组
  let files: string[] = [];
  // 以异步方式读取指定目录，并包括文件类型信息
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  // 遍历目录中的每个条目
  for (const entry of entries) {
    // 构建条目对应的完整路径
    const entryPath = path.join(directoryPath, entry.name);
    // 如果条目是目录，则递归遍历该子目录
    if (entry.isDirectory()) {
      // 递归调用本函数，获取子目录中的文件路径数组，并合并到files中
      const subFiles = await traverseDirectory(entryPath);
      files = files.concat(subFiles);
    } else {
      // 如果条目是文件，则直接将其路径添加到files数组中
      files.push(entryPath);
    }
  }
  // 返回包含所有文件路径的数组
  return files;
}

/**
 * 默认导出一个异步函数，用于获取模板目录中的文件路径列表。
 *
 * 该函数主要解决了以下问题：
 * - 确定模板目录的路径。
 * - 遍历模板目录以获取所有文件路径。
 * - 构建并返回包含模板目录信息和文件路径列表的对象。
 *
 * @param answers 用户的答案对象，用于填充模板。
 * @returns {Promise<TemplateInfo>} 返回一个Promise，解析为一个包含模板信息的对象。
 */
export default async (answers: Answers) => {
  // 解析模板目录的绝对路径。
  const templateDir = path.resolve(__dirname, '../../templates', answers.projectType);
  // 遍历模板目录，获取所有文件路径的Promise。
  const templatelist = await traverseDirectory(templateDir);
  // 初始化结果对象，包含模板目录和文件路径列表。
  const result: TemplateInfo = {
    dir: templateDir,
    filePathList: [],
  };
  // 将文件路径相对模板目录的路径添加到结果的文件路径列表中。
  for (const filePath of templatelist) {
    result.filePathList.push(filePath.substring(templateDir.length + 1));
  }
  // 返回构建好的模板信息对象。
  return result;
};
