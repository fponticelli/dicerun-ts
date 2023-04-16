export function prettify (s: string): string {
  return s.replaceAll('_', ' ')
}

export function trimCharsLeft (s: string, chars: string): string {
  let i = 0
  while (i < s.length && chars.includes(s.charAt(i))) {
    i++
  }
  return s.substring(i)
}
