// Không cần 'use client' nữa!
import React from 'react';
import { getCarById } from '@/api/mockCarApi';

// Import các component con (chúng có thể vẫn là 'use client' nếu cần)
import CarImageSlider from '@/components/cars/CarImageSlider';
import QuickSpecs from '@/components/cars/QuickSpecs';
import SpecificationTable from '@/components/cars/SpecificationTable';
import ActionButtons from '@/components/cars/ActionButtons';
import DisclaimerNotes from '@/components/cars/DisclaimerNotes';


const CarDetailPage = async ({ params }: { params: { id: string } }) => {
    // 1. Lấy carId từ `params` thay vì props
    const { id } = params;

    // 2. Fetch dữ liệu trực tiếp trên server, không cần useEffect, useState
    // Bạn có thể cần xử lý lỗi ở đây nếu getCarById có thể thất bại
    let carData;
    try {
        carData = await getCarById(id);
    } catch (error) {
        // Next.js có các cơ chế xử lý lỗi riêng như notFound()
        // if (error) { notFound(); }
        return <div className="text-center py-20 text-red-600">Lỗi: Không tìm thấy xe.</div>;
    }

    // 3. Không cần state cho loading, error, hay data nữa.
    // Nếu code chạy đến đây, nghĩa là dữ liệu đã có sẵn.

    return (
        <div className="max-w-7xl mx-auto bg-white">
            {/* Bây giờ bạn có thể tự tin rằng carData.images luôn tồn tại */}
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