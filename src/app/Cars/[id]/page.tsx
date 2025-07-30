// Không cần 'use client' nữa!
import React from 'react';
import { getCarById } from '@/api/mockCarApi';

// Import các component con (chúng có thể vẫn là 'use client' nếu cần)
import HeroBanner from '@/components/home/HeroBanner';
import QuickSpecs from '@/components/cars/QuickSpecs';
import SpecificationTable from '@/components/cars/SpecificationTable';
import ActionButtons from '@/components/cars/ActionButtons';
import DisclaimerNotes from '@/components/cars/DisclaimerNotes';

// Biến component thành một async function
const CarDetailPage = async ({ params }: { params: { id: string } }) => {
    // 1. Lấy carId từ `params` thay vì props
    const { id } = params;

    // 2. Fetch dữ liệu trực tiếp trên server, không cần useEffect, useState
    // Bạn có thể cần xử lý lỗi ở đây nếu getCarById có thể thất bại
    let carData;
    let slider1_Data = [];
    try {
        carData = await getCarById(id);
        slider1_Data = [
            {
                image: 'https://xekhach-bacviet.vn/wp-content/uploads/2024/11/hyundai-solti-dl-e5-mau-den-6.jpg',
                title: 'Hyundai Solti DL E5',
                subtitle: 'Màu đen sang trọng',
                exploreText: 'Khám phá ngay',
                testDriveText: 'Đăng ký lái thử'
            },
            {
                image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
                title: 'Xe mẫu',
                subtitle: 'Ảnh minh họa',
                exploreText: 'Khám phá ngay',
                testDriveText: 'Đăng ký lái thử'
            }
        ];
    } catch (error) {
        // Next.js có các cơ chế xử lý lỗi riêng như notFound()
        // if (error) { notFound(); }
        return <div className="text-center py-20 text-red-600">Lỗi: Không tìm thấy xe.</div>;
    }

    // 3. Không cần state cho loading, error, hay data nữa.
    // Nếu code chạy đến đây, nghĩa là dữ liệu đã có sẵn.

    return (
        <div className="max-w mx-auto bg-white">

            <HeroBanner
                slides={slider1_Data}

                maxHeight="80vh"
            />

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