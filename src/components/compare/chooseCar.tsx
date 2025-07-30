'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'

export default function ImageUpload({ isShrink }: { isShrink: boolean }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const previewUrl = URL.createObjectURL(file)
      setSelectedImage(previewUrl)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div
      className={`
        relative w-full h-64 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer
        bg-gray-50 transition-transform duration-300 transform
        ${isDragging ? 'border-blue-600 bg-blue-50' : ''}
        hover:border-blue-500 hover:bg-blue-50
        ${isShrink ? 'scale-y-30' : ''}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {selectedImage ? (
        <Image
          src={selectedImage}
          alt="Selected image"
          fill
          className="object-contain rounded-lg"
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <div className="text-4xl mb-2">+</div>
          <div className="text-sm font-medium text-amber-600">Lựa chọn xe</div>
        </div>
      )}
    </div>
  )
}