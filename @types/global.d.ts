declare const __DEV__: boolean;

interface GTag {
  (command: string, ...args: any[]): void;
  (command: 'config', targetId: string, config?: any): void;
  (command: 'set', config?: any): void;
  (command: 'event', eventName: string, params?: any): void;
}

interface Window {
  gtag?: GTag;
}
