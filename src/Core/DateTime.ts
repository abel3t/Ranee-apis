export function unixTime(): number {
  return Math.round((new Date()).getTime() / 1000);
}