type EllipseFunction = {
  maxCharacter?: number;
  str: string;
}

export function ellipszeWord ({ maxCharacter = 20, str }: EllipseFunction) {
  return `${str.slice(0, maxCharacter)}${str.length > maxCharacter ? '...' : ''}`;
}