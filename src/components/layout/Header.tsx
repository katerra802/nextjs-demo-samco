// src/components/layout/Header.tsx
'use client'

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, Globe, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import CategoryMegaMenu from './CategoryMegaMenu';
import Button from '@/components/common/Button';
import { LanguageProps } from '../../types';

interface HeaderProps extends LanguageProps {
  setLanguage?: (lang: 'en' | 'vi') => void;
}

function Header({ language = 'vi', setLanguage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const pathname = usePathname();

  const menuItems = {
    en: { vehicles: 'Vehicles', charging: 'Charging', service: 'Service', about: 'About', contact: 'Contact', testDrive: 'Test Drive', account: 'Account' },
    vi: { vehicles: 'Sản phẩm', charging: 'Trạm sạc', service: 'Dịch vụ', about: 'Về Samco', contact: 'Liên hệ', testDrive: 'Lái thử', account: 'Tài khoản' }
  };

  const closeAllMenus = () => { setIsMenuOpen(false); };

  const navLinkBaseClasses = "font-semibold transition-colors duration-200";
  const getLinkClasses = (path: string) => 
    `${navLinkBaseClasses} ${pathname === path ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-600'}`;

  return (
    <>
      <header className="fixed top-0 w-full bg-white z-50 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center cursor-pointer">
              <img src="https://samco.com.vn/vnt_upload/weblink/logo.png" alt="Samco Logo" width={80} className="w-20 h-auto object-contain" />
            </Link>

            {/* Desktop Menu (center) */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                className={`${getLinkClasses('/products')} flex items-center`}
                onClick={() => setCategoryMenuVisible(!categoryMenuVisible)}
              >
                {menuItems[language].vehicles}
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <Link href="/charging" className={getLinkClasses('/charging')}>{menuItems[language].charging}</Link>
              <Link href="/service" className={getLinkClasses('/service')}>{menuItems[language].service}</Link>
              <Link href="/about" className={getLinkClasses('/about')}>{menuItems[language].about}</Link>
              <Link href="/contact" className={getLinkClasses('/contact')}>{menuItems[language].contact}</Link>
            </div>

            {/* Right side actions */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative group">
                <button className="flex items-center text-gray-700 p-2 rounded-md hover:bg-gray-100">
                  <Globe className="h-4 w-4 mr-1" />
                  {language.toUpperCase()}
                  <ChevronDown className="ml-1 h-3 w-3" />
                </button> {/* <<< THẺ ĐÓNG ĐÃ ĐƯỢC THÊM VÀO ĐÂY */}
                <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <button onClick={() => setLanguage?.('en')} className="block px-4 py-2 text-sm hover:bg-gray-50 w-full text-left">English</button>
                    <button onClick={() => setLanguage?.('vi')} className="block px-4 py-2 text-sm hover:bg-gray-50 w-full text-left">Tiếng Việt</button>
                  </div>
                </div>
              </div>

              <Link href="/account" className="p-2 text-gray-700 rounded-full hover:bg-gray-100 transition-colors" aria-label={menuItems[language].account}>
                <User size={20} />
              </Link>
              
              <Button href="/test-drive" variant="primary" size="md">
                {menuItems[language].testDrive}
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-4 space-y-3 flex flex-col items-start">
              <Link href="/" onClick={closeAllMenus} className={getLinkClasses('/')}>Trang chủ</Link>
              <button onClick={() => { setCategoryMenuVisible(true); setIsMenuOpen(false); }} className={getLinkClasses('/products')}>
                {menuItems[language].vehicles}
              </button>
              <Link href="/charging" onClick={closeAllMenus} className={getLinkClasses('/charging')}>{menuItems[language].charging}</Link>
              <Link href="/service" onClick={closeAllMenus} className={getLinkClasses('/service')}>{menuItems[language].service}</Link>
              <Link href="/about" onClick={closeAllMenus} className={getLinkClasses('/about')}>{menuItems[language].about}</Link>
              <Link href="/contact" onClick={closeAllMenus} className={getLinkClasses('/contact')}>{menuItems[language].contact}</Link>
              
              <hr className="w-full border-t border-gray-200 my-2" />
              
              <Link href="/account" onClick={closeAllMenus} className={`${getLinkClasses('/account')} flex items-center`}>
                  <User size={18} className="mr-2"/>
                  {menuItems[language].account}
              </Link>

              <Button href="/test-drive" variant="primary" size="md" className="w-full mt-2">
                {menuItems[language].testDrive}
              </Button>
            </div>
          </div>
        )}
      </header> {/* <<< thẻ <nav> được đổi thành <header> để đúng ngữ nghĩa hơn */}

      <CategoryMegaMenu visible={categoryMenuVisible} onClose={() => setCategoryMenuVisible(false)} />
    </>
  );
}

export default Header;