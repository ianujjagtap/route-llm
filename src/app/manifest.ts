import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Route LLM',
    short_name: 'RLLM',
    description: 'Route LLM - An advanced routing solution for large language models (LLMs) that allows you to create complex routing logic with ease.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/logo-white.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo-white.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
