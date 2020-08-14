export function past(age: string, gap: number) {
  return `${gap} years age you were ${Number(age) - gap}<br />`;
}
