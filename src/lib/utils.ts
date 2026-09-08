export function cn(
  ...inputs: (string | undefined | null | false | Record<string, boolean | undefined | null> | (string | undefined | null | false)[])[]
): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === 'string') {
      classes.push(input.trim());
    } else if (Array.isArray(input)) {
      const resolved = cn(...input);
      if (resolved) classes.push(resolved);
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.filter(Boolean).join(' ');
}
