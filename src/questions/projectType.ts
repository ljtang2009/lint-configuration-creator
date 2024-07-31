import { select } from '@inquirer/prompts';
import type { ProjectType } from '@/types.ts';

export default async (): Promise<ProjectType> => {
  const answer = await select({
    message: 'Project type:',
    choices: [
      {
        name: 'Monorepo',
        value: 'monorepo',
        description: 'A monorepo is a repository that contains more than one logical project.',
      },
      {
        name: 'Multirepo',
        value: 'multirepo',
        description: 'A multi-repo is a software development approach where different projects or components of a larger application are stored and managed as separate repositories.',
      },
      {
        name: 'Doc',
        value: 'doc',
        description: 'Document website',
      },
    ],
  });
  return answer as ProjectType;
};
