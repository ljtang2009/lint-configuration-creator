import {
  describe, it, expect, vi, afterEach,
} from 'vitest';
import { fs, vol } from 'memfs';

describe('getUserProjectDirectory', () => {
  const targetModulePath = '@/questions/projectDir.ts';

  vi.mock('node:fs', () => {
    return {
      default: fs,
    };
  });

  afterEach(() => {
    vol.reset();
    vi.resetModules();
  });

  it('should return current working directory if no input is provided', async () => {
    vi.doMock('@inquirer/prompts', () => {
      return {
        input: async (inputConfig: {
          message: string;
          validate: (value: string)=> boolean | string | Promise<string | boolean>;
        }) => {
          const validateResult = await inputConfig.validate('');
          expect(validateResult).toBe(true);
          return '';
        },
      };
    });
    const { default: getProjectDir } = await import(targetModulePath);
    const cwd = process.cwd();
    const result = await getProjectDir();
    expect(result).toBe(cwd);
  });

  it('should return the input directory if it exists and is a directory', async () => {
    const inputStr = '/aaa/bbb';
    // 设置模拟文件系统中的目录结构
    vol.fromJSON({
      [inputStr]: null,
    });
    vi.doMock('@inquirer/prompts', () => {
      return {
        input: async (inputConfig: {
          message: string;
          validate: (value: string)=> boolean | string | Promise<string | boolean>;
        }) => {
          const validateResult = await inputConfig.validate(inputStr);
          expect(validateResult).toBe(true);
          return inputStr;
        },
      };
    });
    const { default: getProjectDir } = await import(targetModulePath);
    const result = await getProjectDir();
    expect(result).toBe(inputStr);
  });

  it('should throw an error if the input directory does not exist', async () => {
    const inputStr = '/aaa/bbb';
    // 清空模拟文件系统中的所有内容
    vol.fromJSON({});
    vi.doMock('@inquirer/prompts', () => {
      return {
        input: async (inputConfig: {
          message: string;
          validate: (value: string)=> boolean | string | Promise<string | boolean>;
        }) => {
          const validateResult = await inputConfig.validate(inputStr);
          expect(typeof validateResult).toBe('string');
          return false;
        },
      };
    });
    const { default: getProjectDir } = await import(targetModulePath);
    const result = await getProjectDir();
    expect(result).toBe(false);
  });

  it('should throw an error if the input is not a directory', async () => {
    const inputStr = '/aaa/bbb';
    // 在模拟文件系统中设置输入为文件而不是目录
    vol.fromJSON({
      [inputStr]: 'a',
    });
    vi.doMock('@inquirer/prompts', () => {
      return {
        input: async (inputConfig: {
          message: string;
          validate: (value: string)=> boolean | string | Promise<string | boolean>;
        }) => {
          const validateResult = await inputConfig.validate(inputStr);
          expect(typeof validateResult).toBe('string');
          return false;
        },
      };
    });
    const { default: getProjectDir } = await import(targetModulePath);
    const result = await getProjectDir();
    expect(result).toBe(false);
  });
});
