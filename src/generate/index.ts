import getTemplateList from './getTemplateList.ts';
import renderTemplateList from './renderTemplateList.ts';
import type { Answers } from '@/types.ts';

/**
 * 根据用户答案渲染模板列表。
 *
 * 本函数旨在根据用户提供的答案信息，获取可用的模板列表，并将这个列表渲染出来。
 * 它首先通过异步调用getTemplateList函数来获取模板信息，随后调用renderTemplateList函数来渲染列表。
 * 这两个步骤都是异步的，以提高程序的响应性。
 *
 * @param answers 用户的答案对象，用于驱动模板列表的渲染。
 * @returns 无返回值。
 */
export default async (answers: Answers) => {
  // 异步获取模板列表信息
  const templateInfo = await getTemplateList(answers);
  // 异步渲染模板列表
  await renderTemplateList(answers, templateInfo);
};
