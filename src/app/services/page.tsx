import React from 'react';
import { LanguageProps } from '../../types';

function ServicePage({ language = 'vi' }: LanguageProps) {
  return (
    <div className="pt-16">
      <section className="py-20 bg-gradient-to-br from-purple-600 to-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {language === 'en' ? 'Service & Support' : 'Dịch vụ & Hỗ trợ'}
          </h1>
        </div>
      </section>
    </div>
  );
}

export default ServicePage;