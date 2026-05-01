'use client'

import { Toaster } from 'react-hot-toast'

export default function ToasterProvider() {
  return (
    <Toaster 
      position="bottom-center"
      toastOptions={{
        style: {
          background: '#000',
          color: '#fff',
          borderRadius: '8px',
          fontWeight: 'bold',
        },
      }}
    />
  )
}
