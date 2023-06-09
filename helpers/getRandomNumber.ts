export function getRandomNumber(min: number, max: number) {
  if (min > max) {
    console.error('Min > max, returning 1')
    return 1
  }
  return Math.floor(
    Math.random() * (max - min) + min)
}