export const sliceText = (str: string): string => {
  if(str.length < 25) return str
  return str.slice(0, 25) + "…"
}