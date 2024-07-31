import questions from './questions/index.ts';
import figlet from 'figlet';
import generate from './generate/index.ts';

/**
 * 使用figlet库生成带指定字体的文本艺术字。
 * 这里用于创建一个具有“ANSI Shadow”字体的“Create Lint”艺术字banner。
 * @param {string} text - 要转换为艺术字的文本内容。
 * @param {Object} options - figlet的配置选项，例如字体类型。
 * @returns {string} - 转换后的艺术字字符串。
 */
const banner = figlet.textSync('Create Lint', {
  font: 'ANSI Shadow',
});
// 输出生成的艺术字banner到控制台
console.log(banner);

// 异步询问用户一系列问题，并等待回答
const answers = await questions();
// 根据用户的回答生成相关文件或配置
generate(answers);
