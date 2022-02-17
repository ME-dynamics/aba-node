export function logIdStringify(logIdLabel: string[]) {
  let stringified = "";
  for (let index = 0; index < logIdLabel.length; index++) {
    const label = logIdLabel[index];
    const isLast = index === logIdLabel.length - 1;
    stringified += `:${label}${isLast ? "" : ", "}`;
  }
  return stringified;
}
