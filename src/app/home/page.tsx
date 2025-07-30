// src/pages/HomePage.tsx
'use client'; // HomePage cần là Client Component để xử lý các click handler

import React from 'react';
import Image from 'next/image'; // Thêm import cho Next.js Image
import { Shield, Battery, Zap, Users, Wrench, Car } from 'lucide-react';

// THAY ĐỔI: Import các component mới. Giả định chúng nằm trong thư mục 'common'
// Giữ nguyên các import component cũ của trang Home
import HeroSlider from '@/components/shared/ImageSlider';
import ActionPanel from '@/components/shared/ActionPanel';
import InfoGrid from '@/components/shared/InfoGrid';
import FamilySection from '@/components/home/FamilySection';
import NewsArticles from '@/components/home/NewsArticles';
import Newsletter from '@/components/home/Newsletter';

import { LanguageProps, HomePageContent } from '../../types';

// Các kiểu dữ liệu cục bộ để TypeScript hiểu rõ hơn
interface SliderContent {
  title: string;
  subtitle: string;
  image: string; // Ảnh chính của xe (xóa phông)
  decorativeText?: string; // Chữ mờ trang trí phía sau
  backgroundImage?: string; // Ảnh nền của slide
  stats?: { label: string; value: string }[];
  actions?: { text: string; href: string; variant?: 'primary' | 'secondary' }[];
}

function HomePage({ language = 'vi' }: LanguageProps) {

  // =================================================================
  // === PHẦN DỮ LIỆU VÀ LOGIC - GIỮ NGUYÊN HOÀN TOÀN ===
  // =================================================================

  const content: Record<'en' | 'vi', HomePageContent> = {
    en: {
      hero: {
        explore: "Explore Vehicle",
        testDrive: "Book Test Drive"
      },
      family1: {
        title: "Explore the Samco Family",
        subtitle: "Samco's design language blends powerful lines, luxurious strokes, and a formidable presence.",
        quality: "The perfect blend of premium quality & comfort",
        description: "Samco vehicles are equipped with human-centered technology that seamlessly improves the experience by focusing on you.",
        features: [
          { text: 'Advanced Safety Features', icon: Shield },
          { text: 'Superior Durability', icon: Battery },
          { text: 'Powerful Performance', icon: Zap }
        ]
      },
      family2: {
        title: "Uncompromising Service",
        subtitle: "Dedicated to providing the best ownership experience.",
        quality: "Professional, Fast, and Reliable",
        description: "Our service centers are equipped with modern technology and staffed by certified technicians to keep your vehicle in top condition.",
        features: [
          { text: 'Genuine Parts', icon: Wrench },
          { text: 'Expert Technicians', icon: Users },
          { text: 'Nationwide Network', icon: Car }
        ]
      },
      news: {
        title: "Latest Samco News",
        subtitle: "Stay updated with the latest developments and innovations from Samco"
      },
      newsletter: {
        title: "Join Our Community",
        description: "Sign up here to find out more about the exceptional features crafted into every Samco and our mission for a better future.",
        placeholder: "Enter your email",
        button: "Subscribe"
      }
    },
    vi: {
      hero: {
        explore: "Khám phá xe",
        testDrive: "Đăng ký lái thử"
      },
      family1: {
        title: "Khám phá gia đình Samco",
        subtitle: "Ngôn ngữ thiết kế của Samco pha trộn đường nét mạnh mẽ, nét sang trọng và sự hiện diện uy lực.",
        quality: "Sự pha trộn hoàn hảo giữa chất lượng cao cấp và sự thoải mái",
        description: "Xe Samco được trang bị công nghệ lấy con người làm trung tâm, cải thiện liền mạch trải nghiệm bằng cách tập trung vào bạn.",
        features: [
          { text: 'Tính năng an toàn tiên tiến', icon: Shield },
          { text: 'Độ bền vượt trội', icon: Battery },
          { text: 'Hiệu suất mạnh mẽ', icon: Zap }
        ]
      },
      family2: {
        title: "Dịch vụ không giới hạn",
        subtitle: "Tận tâm mang lại trải nghiệm sở hữu tốt nhất.",
        quality: "Chuyên nghiệp, Nhanh chóng và Tin cậy",
        description: "Trung tâm dịch vụ của chúng tôi được trang bị công nghệ hiện đại và đội ngũ kỹ thuật viên được chứng nhận để giữ cho chiếc xe của bạn luôn ở trạng thái tốt nhất.",
        features: [
          { text: 'Phụ tùng chính hãng', icon: Wrench },
          { text: 'Kỹ thuật viên chuyên nghiệp', icon: Users },
          { text: 'Mạng lưới toàn quốc', icon: Car }
        ]
      },
      news: {
        title: "Tin tức Samco mới nhất",
        subtitle: "Cập nhật những phát triển và đổi mới mới nhất từ Samco"
      },
      newsletter: {
        title: "Tham gia cuộc cách mạng",
        description: "Đăng ký tại đây để tìm hiểu thêm về các tính năng đặc biệt được tích hợp vào mỗi chiếc VinFast và sứ mệnh thúc đẩy thế giới chuyển sang xe điện.",
        placeholder: "Nhập email của bạn",
        button: "Đăng ký"
      }
    }
  };
  const slider1_Data = [
    { title: "SAMCO GROWIN 2024", subtitle: "Sang trọng trên mọi hành trình", image: "https://samco.com.vn/vnt_upload/weblink/Banner_Trang_chu/5_xe_SAMCO-01.png", exploreText: "Chi tiết", testDriveText: "Lái thử" },
    { title: "SAMCO ALLERGO MỚI", subtitle: "Mạnh mẽ, bền bỉ và hiệu quả", image: "https://samco.com.vn/vnt_upload/news/2025/DaihoiDang20252030/thumbs/770_crop__10.jpg", exploreText: "Chi tiết", testDriveText: "Lái thử" }
  ];
  const limoGreenStyleData: SliderContent[] = [
    {
      title: 'LIMO GREEN',
      subtitle: '', // Không có subtitle trong layout này
      decorativeText: 'LIMO GREEN',
      image: 'https://i.imgur.com/example-limo-silver.png', // Thay bằng ảnh xe LIMO GREEN xóa phông
      backgroundImage: '#f8f9fa', // Một màu nền sáng
      stats: [
        { label: 'Dòng xe', value: 'MPV' },
        { label: 'Số chỗ ngồi', value: '7 chỗ' },
        { label: 'Quãng đường lên tới', value: '450 km (NEDC)' },
        { label: 'Giá từ', value: '749.000.000 VNĐ' },
      ],
      actions: [
        { text: 'ĐẶT CỌC', href: '/dat-coc/limo-green', variant: 'primary' },
        { text: 'XEM CHI TIẾT', href: '/vehicles/limo-green', variant: 'secondary' },
      ]
    },
    {
        title: 'NERIO GREEN',
        subtitle: '',
        decorativeText: 'NERIO GREEN',
        image: 'https://i.imgur.com/example-nerio-black.png', // Thay bằng ảnh xe NERIO GREEN xóa phông
        backgroundImage: '#f8f9fa',
        stats: [
          { label: 'Dòng xe', value: 'B-SUV' },
          { label: 'Số chỗ ngồi', value: '5 chỗ' },
          { label: 'Quãng đường lên tới', value: '318.6 km (NEDC)' },
          { label: 'Giá từ', value: '668.000.000 VNĐ' },
        ],
        actions: [
          { text: 'ĐẶT CỌC', href: '/dat-coc/nerio-green', variant: 'primary' },
          { text: 'XEM CHI TIẾT', href: '/vehicles/nerio-green', variant: 'secondary' },
        ]
      },
  ];
  const newsArticles = [
    { title: "VinFast mở rộng mạng lưới showroom toàn quốc", summary: "Công ty tiếp tục đầu tư mở rộng hệ thống showroom và trung tâm dịch vụ để phục vụ khách hàng tốt hơn.", image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop", category: "Kinh doanh", date: "24/07/2025", author: "VinFast News", readTime: "3 phút đọc", link: "#" },
    { title: "Công nghệ pin mới cho phạm vi hoạt động lớn hơn", summary: "VinFast công bố công nghệ pin thế hệ mới với khả năng tăng phạm vi hoạt động lên đến 500km.", image: "https://static.automotor.vn/w640/images/upload/2024/11/05/pin-the-ran-xe-dien-vneconomyautomotive.jpeg", category: "Công nghệ", date: "23/07/2025", author: "Tech Team", readTime: "5 phút đọc", link: "#" },
    { title: "VinFast hợp tác với các đối tác quốc tế", summary: "Những thỏa thuận hợp tác mới giúp VinFast mở rộng ra thị trường châu Âu và Bắc Mỹ.", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop", category: "Đối tác", date: "22/07/2025", author: "Business Team", readTime: "4 phút đọc", link: "#" },
    { title: "Trạm sạc siêu nhanh mới tại các thành phố lớn", summary: "Hệ thống trạm sạc siêu nhanh 350kW được lắp đặt tại Hà Nội, TP.HCM và Đà Nẵng.", image: "https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?w=600&h=400&fit=crop", category: "Hạ tầng", date: "21/07/2025", author: "Infrastructure Team", readTime: "3 phút đọc", link: "#" }
  ];
  const handleNewsletterSubmit = async (email: string): Promise<{ success: boolean }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email.includes('test@')) reject(new Error('Test email rejected'));
        else resolve({ success: true });
      }, 1000);
    });
  };
  const handleExploreClick = () => console.log("Explore button clicked!");
  const handleTestDriveClick = () => console.log("Test Drive button clicked!");

  // =================================================================
  // === PHẦN GIAO DIỆN (JSX) - ĐÃ ĐƯỢC REFACTOR HOÀN TOÀN ===
  // =================================================================

  return (
    <div>
      {/* SLIDER 1: Nội dung căn trái, đẩy xuống dưới */}
      <HeroSlider slides={slider1_Data} className="relative w-full h-screen" autoSlide>
        {(activeSlide: any) => (
            <>
                <Image src={activeSlide.image} alt={activeSlide.title} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                <div className="relative z-10 flex flex-col h-full max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                <div className="mt-auto pb-24 text-left">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{activeSlide.title}</h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-8">{activeSlide.subtitle}</p>
                    <ActionPanel actions={[
                        // Sử dụng mảng cũ để tương thích
                        { text: activeSlide.exploreText, onClick: handleExploreClick, variant: 'primary' },
                        { text: activeSlide.testDriveText, onClick: handleTestDriveClick, variant: 'secondary' }
                    ]} />
                </div>
                </div>
            </>
        )}
      </HeroSlider>

      {/* THAY ĐỔI LỚN: SLIDER 2 & 3 GIỜ SẼ CHUNG MỘT LAYOUT MỚI */}
      <section className="bg-gray-100 py-16">
        <HeroSlider slides={limoGreenStyleData} className="relative w-full h-[60vh] md:h-[70vh]">
            {(activeSlide) => (
            <div className="relative w-full h-full">
                {/* Lớp nền: Có thể là màu hoặc ảnh */}
                <div className="absolute inset-0 z-0" style={{ backgroundColor: activeSlide.backgroundImage }}></div>

                {/* Lớp text trang trí */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                <h2 className="text-7xl md:text-9xl font-black text-black/5 select-none uppercase">
                    {activeSlide.decorativeText}
                </h2>
                </div>

                {/* Lớp ảnh xe xóa phông */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                <Image
                    src={activeSlide.image}
                    alt={`Xe ${activeSlide.title}`}
                    width={800} height={450}
                    className="object-contain"
                />
                </div>
            </div>
            )}
        </HeroSlider>

        {/* Phần thông tin và nút bấm được đặt BÊN DƯỚI slider */}
        {/* Chúng ta sẽ lấy dữ liệu từ slide ĐẦU TIÊN của bộ dữ liệu để hiển thị làm mặc định */}
        {/* Trong một ứng dụng thực tế, bạn sẽ muốn phần này đồng bộ với slide đang active */}
        <div className="max-w-4xl mx-auto px-4 pt-8 -mt-16 relative z-30">
            {limoGreenStyleData[0].stats && <InfoGrid items={limoGreenStyleData[0].stats} className="mb-8" />}
            {limoGreenStyleData[0].actions && <ActionPanel actions={limoGreenStyleData[0].actions.map(action => ({ ...action, onClick: () => window.location.href = action.href }))} />}
        </div>
      </section>

      {/* CÁC SECTION KHÁC GIỮ NGUYÊN */}
      <FamilySection
        title={content[language].family1.title}
        subtitle={content[language].family1.subtitle}
        qualityTitle={content[language].family1.quality}
        description={content[language].family1.description}
        image="https://samco.com.vn/vnt_upload/product/xe_khach_xe_bus/thumbs/(570x380)_crop_samco_wenda_ksd5.png"
        features={content[language].family1.features}
        contentPosition="left"
        backgroundColor="bg-gray-50"
        showFeatures={true}
      />
      <FamilySection
        title={content[language].family2.title}
        subtitle={content[language].family2.subtitle}
        qualityTitle={content[language].family2.quality}
        description={content[language].family2.description}
        image="https://samco.com.vn/vnt_upload/product/xe_tai/isuzu/thumbs/(600x400)_crop_28137199168_6c9e65aa49_o.png"
        features={content[language].family2.features}
        contentPosition="right"
        backgroundColor="bg-white"
        showFeatures={true}
      />
      <NewsArticles
        title={content[language].news.title}
        subtitle={content[language].news.subtitle}
        articles={newsArticles}
        layout="2-2"
        backgroundColor="bg-white"
        showReadMore={true}
        showAuthor={true}
        showDate={true}
        showReadTime={true}
      />
      <Newsletter
        title={content[language].newsletter.title}
        description={content[language].newsletter.description}
        placeholderText={content[language].newsletter.placeholder}
        buttonText={content[language].newsletter.button}
        backgroundColor="bg-blue-600"
        textColor="text-white"
        onSubmit={handleNewsletterSubmit}
        showIcon={true}
        layout="center"
      />
    </div>
  );
}

export default HomePage;