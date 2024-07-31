/**
 * 定义项目类型的枚举。
 *
 * 本枚举用于区分不同类型的项目组织方式，支持以下三种类型：
 * - 'monorepo': 单仓库组织方式，所有代码都存在于一个版本控制仓库中。
 * - 'multirepo': 多仓库组织方式，每个独立的代码模块都有自己的版本控制仓库。
 * - 'doc': 文档项目类型，主要用于存放文档资料，不涉及代码管理。
 */
export type ProjectType = 'monorepo' | 'multirepo' | 'doc';

/**
 * 用户回答的问卷接口。
 *
 * 该接口定义了用户在创建新项目时提供的信息结构。
 * 主要包括项目目录路径和项目名称。
 */
export interface Answers {
  /**
   * 项目类型
   *
   * 该项目类型用于区分不同类型的项目，可能的类型由ProjectType枚举定义。
   */
  projectType: ProjectType;
  /**
   * 项目目录的路径
   */
  projectDir: string;
  /**
   * 项目的名称
   */
  projectName: string;
}

/**
 * 模板信息接口。
 *
 * 该接口定义了模板的目录路径和该模板下所有文件的路径列表。
 * 用于指导新项目的创建，基于指定的模板复制文件到目标位置。
 */
export interface TemplateInfo {
  /**
   * 模板目录的路径
   */
  dir: string;
  /**
   * 模板下所有文件的路径列表
   */
  filePathList: string[];
}
