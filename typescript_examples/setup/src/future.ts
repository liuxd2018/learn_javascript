import { EMSGSIZE } from 'constants';

export function future(age: string, gap: number) {
  return `In ${gap} years you will be ${Number(age) + gap}`;
}
