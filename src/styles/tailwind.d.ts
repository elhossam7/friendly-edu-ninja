declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Add Tailwind CSS at-rules to TypeScript
declare module 'tailwindcss' {
  export interface Config {
    content?: string[];
    theme?: {
      extend?: {
        [key: string]: any;
      };
      [key: string]: any;
    };
    plugins?: any[];
  }
}
