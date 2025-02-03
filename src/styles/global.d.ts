declare module '*.css' {
  const styles: { [className: string]: string }
  export default styles
}

declare module 'tailwindcss/tailwind-config' {
  interface TailwindConfig {
    content: string[]
    theme: {
      extend: Record<string, unknown>
    }
    plugins: unknown[]
  }
  const config: TailwindConfig
  export default config
}

// Declare Tailwind CSS at-rules
declare module 'postcss' {
  export const atRule: {
    tailwind: string
    apply: string
    layer: string
    responsive: string
    screen: string
    variants: string
  }
}
