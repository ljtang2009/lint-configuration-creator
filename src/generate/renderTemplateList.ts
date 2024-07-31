import type { Answers, TemplateInfo } from '@/types.ts';
import _fs from 'node:fs';
import path from 'node:path';
import Handlebars from 'handlebars';

const fs = _fs.promises;

/**
 * 确保给定路径的目录存在。
 * 如果目录不存在，则尝试创建它，包括其路径中缺失的任何父目录。
 * 如果给定路径是一个文件，则尝试创建该路径的父目录。
 *
 * @param dirPath 需要确保存在的目录路径。
 */
async function ensureDir(dirPath: string) {
  let stats;
  try {
    // 尝试获取目录的统计信息以检查其存在性和类型。
    stats = await fs.stat(dirPath);
    // 如果获取的路径不是目录，则尝试创建其父目录。
    if (!stats.isDirectory()) {
      await fs.mkdir(path.dirname(dirPath));
    }
  } catch (err) {
    // 如果错误是由于路径不存在造成的，则创建目录，包括所有必要的父目录。
    if (err != null && typeof err === 'object' && 'code' in err && err.code === 'ENOENT') {
      await fs.mkdir(dirPath, { recursive: true });
    } else {
      // 抛出除路径不存在错误之外的任何其他错误。
      throw err;
    }
  }
}

/**
 * 根据答案和模板信息，生成项目文件。
 *
 * 此函数遍历模板信息中的文件路径列表，对每个文件进行处理：如果文件是以.hbs结尾的模板文件，
 * 则使用Handlebars编译器根据提供的答案解析文件内容；然后，将解析后的内容写入到项目目录中对应的新文件中。
 * 对于非模板文件，直接将其内容写入项目目录中。
 *
 * @param answers 用户的答案对象，用于填充模板。
 * @param templateInfo 模板信息对象，包含模板文件路径列表和模板目录。
 */
export default async (answers: Answers, templateInfo: TemplateInfo) => {
  // 遍历模板文件路径列表
  for (const filePath of templateInfo.filePathList) {
    // 读取模板文件内容
    let content = (await fs.readFile(path.resolve(templateInfo.dir, filePath))).toString();
    let newFilePath = filePath;
    // 如果文件是Handlebars模板文件
    if (filePath.endsWith('.hbs')) {
      // 使用Handlebars编译并渲染模板
      content = Handlebars.compile(content)(answers);
      // 移除文件路径中的.hbs后缀
      newFilePath = newFilePath.substring(0, filePath.length - 4);
    }
    // 构建文件在项目目录中的完整路径
    const wholeFilePath = path.resolve(answers.projectDir, newFilePath);
    // 确保文件目录存在
    await ensureDir(path.dirname(wholeFilePath));
    // 写入处理后的内容到项目文件
    await fs.writeFile(wholeFilePath, content);
  }
};
