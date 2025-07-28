// src/app/Cars/[id]/page.tsx

import React, { useState, useEffect } from 'react';
import { getCarById } from '../../../api/mockCarApi'; // Đường dẫn tới API giả

// Import các component con
import CarImageSlider from '../../../components/carDetail/CarImageSlider';
import QuickSpecs from '../../../components/carDetail/QuickSpecs';
import SpecificationTable from '../../../components/carDetail/SpecificationTable';
import ActionButtons from '../../../components/carDetail/ActionButtons';
import DisclaimerNotes from '../../../components/carDetail/DisclaimerNotes';

interface CarDetailPageProps {
    carId?: string;
}

interface CarDatabaseItem {
    id: string;
    name: string;
    images: string[];
    quickSpecs: Array<{ label: string; value: string }>;
    fullSpecs: Array<{ category: string; value: string; category2?: string; value2?: string }>;
    disclaimers: string[];
}

// Truyền carId vào đây. Trong một ứng dụng thực tế, bạn sẽ lấy nó từ URL (ví dụ: next/link)
const CarDetailPage = ({ carId = 'herio-green' }: CarDetailPageProps) => {
    const [carData, setCarData] = useState<CarDatabaseItem | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        getCarById(carId)
            .then((data: CarDatabaseItem) => {
                setCarData(data);
            })
            .catch((err: Error) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [carId]); // Chạy lại hiệu ứng khi carId thay đổi

    if (loading) {
        return <div className="text-center py-20">Đang tải dữ liệu xe...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-600">Lỗi: {error}</div>;
    }

    if (!carData) {
        return null; // Hoặc hiển thị thông báo "Không tìm thấy xe"
    }

    // Khi đã có dữ liệu, render ra trang hoàn chỉnh
    return (
        <div className="max-w-7xl mx-auto bg-white">
            <CarImageSlider images={carData.images} />

            <div className="text-center py-6">
                <h1 className="text-3xl font-bold text-gray-800">{carData.name}</h1>
            </div>

            <QuickSpecs specs={carData.quickSpecs} />

            <SpecificationTable specifications={carData.fullSpecs} />

            <ActionButtons />

            <DisclaimerNotes notes={carData.disclaimers} />
        </div>
    );
};

export default CarDetailPage;