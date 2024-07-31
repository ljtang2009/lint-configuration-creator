import type { Plugin } from 'vite';

/**
 * 插入代码的插件生成函数。
 *
 * 该函数旨在创建一个Rollup插件，该插件可以在指定的输出文件中预或后插入指定的代码。
 *
 * @param fileName 要插入代码的文件名。
 * @param code 要插入的代码字符串。
 * @param position 插入代码的位置，可选值为'pre'（前置插入）或'post'（后置插入），默认为'pre'。
 * @returns 返回一个Rollup插件对象。
 */
export default function insertCodePlugin(fileName: string, code: string, position: 'pre' | 'post' = 'pre'): Plugin {
  return {
    name: 'rollup-plugin-insert-code',
    enforce: 'post',
    /**
     * 在生成包后操作代码。
     *
     * 此方法遍历生成的包对象，找到指定的文件名，然后根据插入位置的要求，在代码中插入指定的代码字符串。
     *
     * @param _options Rollup配置选项，此处未使用，保留参数位置。
     * @param bundle 生成的包对象。
     */
    generateBundle(_options, bundle) {
      for (const fileNameBundle in bundle) {
        if (bundle[fileNameBundle]!.type === 'chunk' && fileNameBundle === fileName) {
          const chunk = bundle[fileNameBundle];
          if (chunk != null) {
            // 根据插入位置的要求，拼接代码。
            chunk.code = position === 'pre' ? `${code}\n${chunk.code}` : `${chunk.code}\n${code}`;
          }
        }
      }
    },
  };
}
