import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Institut ISHES',
    short_name: 'ISHES',
    description: 'Institut Supérieur des Humanités et Études Supérieures',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#008953',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
