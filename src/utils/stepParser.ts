// utils/directionParser.ts

export default function splitDirections(text: string): string[] {
  let steps = text.split(/(?:Step\s*\d+:|\d+\.)\s*/);
  steps = steps.filter((step) => step.trim());
  if (steps.length <= 1) {
    steps = text.split("\n").filter((step) => step.trim());
  }
  return steps.map((step) => step.trim());
}
