'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageOverlayProps {
  src: string
  alt: string
}

const ImageOverlay: React.FC<ImageOverlayProps> = ({ src, alt }) => {
  const [isOpen, setIsOpen] = useState(false)

  const openOverlay = () => setIsOpen(true)
  const closeOverlay = () => setIsOpen(false)

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={200}
        height={150}
        className="rounded cursor-pointer"
        onClick={openOverlay}
      />
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeOverlay}
        >
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={src}
              alt={alt}
              width={1200}
              height={900}
              className="rounded"
              objectFit="contain"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ImageOverlay
