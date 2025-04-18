export const fileExtensionExpression: RegExp = /(?:\.([^.]+))?$/;

export const imageExtensions: string[] = [
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.svg',
  '.woff', '.woff2', '.ttf',
  '.mp3', '.ogg',
  '.mp4',
  '.pdf', '.json', '.html'
];

export const imageMimeTypes: Map<string, string> = new Map([
  ['.png', 'image/png'],
  ['.jpg', 'image/jpg'],
  ['.jpeg', 'image/jpeg'],
  ['.gif', 'image/gif'],
  ['.webp', 'image/webp'],
  ['.ico', 'image/x-icon'],
  ['.svg', 'image/svg+xml'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
  ['.ttf', 'font/ttf'],
  ['.mp3', 'audio/mpeg'],
  ['.ogg', 'audio/ogg'],
  ['.mp4', 'video/mp4'],
  ['.pdf', 'application/pdf'],
  ['.json', 'application/json'],
  ['.html', 'text/html']
]);