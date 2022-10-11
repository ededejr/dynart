import ModelBuilder from "../model-builder";

export function createGradient(name: string, ...args: string[]) {
  const count = args.length;
  return (
    <linearGradient id={name} key={name}>
      {args.map((arg, index) => <stop key={`gradient-stop-${index}`} offset={ModelBuilder.numToPercent((index + 1/count) * 100)} stopColor={arg} />)}
    </linearGradient>
  );
}