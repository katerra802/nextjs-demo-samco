// src/api/mockCarApi.ts

import { Vehicle, NewsArticle } from '../types';

interface QuickSpec {
    label: string;
    value: string;
}

interface FullSpec {
    category: string;
    value: string;
    category2?: string;
    value2?: string;
}

interface CarDatabaseItem {
    id: string;
    name: string;
    images: string[];
    quickSpecs: QuickSpec[];
    fullSpecs: FullSpec[];
    disclaimers: string[];
}

// Dữ liệu giả lập cho nhiều xe
const carDatabase: Record<string, CarDatabaseItem> = {
    'herio-green': {
        id: 'herio-green',
        name: 'HERIO GREEN',
        images: [
            'https://xekhach-bacviet.vn/wp-content/uploads/2024/11/hyundai-solti-dl-e5-mau-den-6.jpg',
            'https://static.automotor.vn/w640/images/upload/2024/11/05/pin-the-ran-xe-dien-vneconomyautomotive.jpeg',
            'https://xekhach-bacviet.vn/wp-content/uploads/2024/11/hyundai-solti-dl-e5-mau-den-6.jpg',
        ],
        quickSpecs: [
            { label: 'Kích thước tổng thể (mm)', value: '3967 x 1723 x 1579' },
            { label: 'Chiều dài cơ sở', value: '2514 mm' },
            { label: 'Khoảng sáng gầm xe', value: '160 mm' },
            { label: 'Công suất tối đa', value: '100 kW' },
        ],
        fullSpecs: [
            { category: "Kích thước tổng thể (mm)", value: "3967 x 1723 x 1579", category2: "Chiều dài cơ sở", value2: "2514 mm" },
            { category: "Khoảng sáng gầm xe", value: "160 mm", category2: "Công suất tối đa", value2: "100 kW" },
        ],
        disclaimers: [
            'Tính năng và trang bị có thể thay đổi theo từng phiên bản mà không cần báo trước. Vui lòng liên hệ Showroom/Đại lý để biết thêm chi tiết.',
            'Quãng đường di chuyển thực tế có thể khác so với tiêu chuẩn NEDC tùy thuộc vào điều kiện sử dụng thực tế.',
        ],
    },
    'samco-allergo': {
        id: 'samco-allergo',
        name: 'SAMCO ALLERGO 2024',
        images: [
            'https://samco.com.vn/vnt_upload/product/xe_khach_xe_bus/allergo/SAMCO_ALLERGO_2024.jpg',
            'https://samco.com.vn/vnt_upload/product/xe_khach_xe_bus/allergo/SAMCO-ALLERGO-2024-4.png',
        ],
        quickSpecs: [
            { label: 'Số chỗ', value: '29 Chỗ' },
            { label: 'Động cơ', value: 'ISUZU' },
            { label: 'Công suất', value: '150 Ps' },
            { label: 'Tiêu chuẩn khí thải', value: 'EURO V' },
        ],
        fullSpecs: [
            { category: "Kích thước tổng thể (mm)", value: "7780 x 2180 x 3000", category2: "Chiều dài cơ sở", value2: "3845 mm" },
        ],
        disclaimers: [
            'Thông số kỹ thuật có thể thay đổi bởi nhà sản xuất mà không cần báo trước.'
        ],
    }
};

// Hàm giả lập việc gọi API, trả về Promise
export const getCarById = (id: string): Promise<CarDatabaseItem> => {
    console.log(`Fetching data for car ID: ${id}`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (carDatabase[id]) {
                resolve(carDatabase[id]);
            } else {
                reject(new Error('Car not found'));
            }
        }, 500); // Giả lập độ trễ mạng 0.5s
    });
};

// Mock vehicles data conforming to Vehicle interface
export const mockVehicles: Vehicle[] = [
    {
        id: 'samco-growin-2024',
        name: 'SAMCO GROWIN 2024',
        model: 'GROWIN',
        year: 2024,
        price: 1500000000,
        images: [
            'https://samco.com.vn/vnt_upload/weblink/Banner_Trang_chu/5_xe_SAMCO-01.png',
            'https://samco.com.vn/vnt_upload/product/03_2017/thumbs/(600x400)_crop_prod6.jpg'
        ],
        description: 'Xe sang trọng trên mọi hành trình với thiết kế hiện đại và tiện nghi cao cấp',
        specifications: {
            engine: 'Diesel 3.0L',
            power: '150 HP',
            transmission: 'Số tự động 6 cấp',
            fuelType: 'Diesel',
            seating: 45,
            dimensions: {
                length: 12000,
                width: 2500,
                height: 3200
            }
        },
        features: [
            'Hệ thống điều hòa không khí',
            'Ghế ngồi êm ái',
            'Hệ thống âm thanh cao cấp',
            'Camera lùi',
            'Phanh ABS',
            'Hệ thống định vị GPS'
        ]
    }
];

export const mockNewsArticles: NewsArticle[] = [
    {
        title: 'SAMCO ra mắt dòng xe mới 2024',
        summary: 'Dòng xe SAMCO mới với nhiều cải tiến về thiết kế và công nghệ, mang đến trải nghiệm tuyệt vời cho hành khách.',
        image: 'https://samco.com.vn/vnt_upload/weblink/Banner_Trang_chu/5_xe_SAMCO-01.png',
        category: 'Sản phẩm mới',
        date: '2024-01-15',
        author: 'SAMCO Vietnam',
        readTime: '5 phút đọc',
        link: '/news/samco-new-lineup-2024'
    }
];