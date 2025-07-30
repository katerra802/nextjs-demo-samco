'use client'

import { useState } from 'react'

export default function CompareSection() {
    const [activeTab, setActiveTab] = useState<string>('size')
    const [activeDropdown, setActiveDropdown] = useState<string | null>('size')

    const tabs = [
        { key: 'size', label: 'Kích thước' },
        { key: 'engine', label: 'Động cơ & Vận hành' },
        { key: 'exterior', label: 'Ngoại thất' },
        { key: 'security', label: 'An ninh & An toàn' },
    ]

    const toggleDropdown = (key: string) => {
        setActiveDropdown(activeDropdown === key ? null : key)
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            {/* Tabs */}
            <div className="flex space-x-24  border-b">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`py-2 px-4 ${activeTab === tab.key
                            ? 'border-b-2 border-blue-500 text-blue-600 font-semibold'
                            : 'text-black'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Accordions */}
            <div className="mt-6 space-y-4">
                {tabs.map((tab) => (
                    <div key={tab.key} className="border rounded overflow-hidden">
                        <button
                            onClick={() => toggleDropdown(tab.key)}
                            className="w-full flex justify-between items-center px-4 py-3 bg-gray-200 text-black"
                        >
                            <span className="font-medium">{tab.label}</span>
                            <span>{activeDropdown === tab.key ? '▲' : '▼'}</span>
                        </button>

                        {activeDropdown === tab.key && (
                            <div className="px-4 py-4 bg-gray-50 text-black">
                                {/* Replace with real content */}
                                <p>Nội dung của {tab.label} sẽ hiển thị ở đây.</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
