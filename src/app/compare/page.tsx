'use client'

import { useState, useEffect } from 'react'
import ImageUpload from '@/components/compare/chooseCar'
import CompareTabs from '@/components/compare/compareTab'


export default function UploadPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isSticky, setIsSticky] = useState(false)
    const [isShrink, setIsShrink] = useState(false)

    const handleUpload = async () => {
        if (!selectedFile) return

        const formData = new FormData()
        formData.append('image', selectedFile)

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            if (response.ok) {
                const result = await response.json()
                console.log('Upload successful:', result)
                alert('Tải ảnh lên thành công!')
            } else {
                throw new Error('Upload failed')
            }
        } catch (error) {
            console.error('Upload error:', error)
            alert('Có lỗi xảy ra khi tải ảnh lên!')
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            const triggerSticky = window.innerHeight / 10
            const triggerShrink = window.innerHeight / 10

            setIsSticky(scrollY > triggerSticky)
            setIsShrink(scrollY > triggerShrink)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="min-h-screen  bg-white py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Tải Ảnh Lên
                </h1>

                <div
                    className={`${isSticky
                        ? 'fixed top-0 left-0 right-0 w-full h-50 z-49 bg-white shadow-md'
                        : 'relative'
                        } transition-all duration-300`}
                >
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <ImageUpload isShrink={isShrink} />
                            <ImageUpload isShrink={isShrink} />
                            <ImageUpload isShrink={isShrink} />
                        </div>
                    </div>
                </div>

                <div className={`${isShrink ? 'mt-60' : 'mt-0'}`}> {/* Add top margin so it doesn't hide under sticky */}
                    <CompareTabs />
                </div>

                <div className="h-[2000px]" /> {/* Dùng để test scroll */}

                {selectedFile && (
                    <div className="mt-8 text-center">
                        <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
<h3 className="font-semibold mb-2">Thông tin file:</h3>
                            <p className="text-sm text-gray-600">Tên: {selectedFile.name}</p>
                            <p className="text-sm text-gray-600">
                                Kích thước: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            <p className="text-sm text-gray-600">Loại: {selectedFile.type}</p>
                        </div>

                        <button
                            onClick={handleUpload}
                            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium"
                        >
                            Tải lên server
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
