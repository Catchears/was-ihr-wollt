export function pluralize(count: number, s: string): string {
  if (count === 1) {
    return `1 ${s}`
  } else {
    return `${count} ${s}s`
  }
}

export function pluralizeDatei(count: number): string {
  if (count === 1) {
    return `1 Datei`
  } else {
    return `${count} Dateien`
  }
}

export function capitalize(s: string): string {
  return s.substring(0, 1).toUpperCase() + s.substring(1)
}
