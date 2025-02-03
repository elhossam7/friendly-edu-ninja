declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Tailwind CSS custom at-rules
declare module 'tailwindcss/tailwind.css' {
  const styles: any;
  export default styles;
}

// Custom at-rules
declare const tailwind: any;
declare const apply: any;
declare const config: any;
declare const theme: any;
declare const screen: any;
