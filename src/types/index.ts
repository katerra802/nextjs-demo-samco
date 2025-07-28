import { LucideIcon } from 'lucide-react';

// Language types
export type Language = 'en' | 'vi';

// Common component props
export interface BaseComponentProps {
    className?: string;
    children?: React.ReactNode;
}

// Feature interface
export interface Feature {
    text: string;
    icon: LucideIcon;
}

// Additional info interface for slider
export interface AdditionalInfo {
    text: string;
    icon?: LucideIcon;
}

// Slider data interface
export interface SliderData {
    title: string;
    subtitle: string;
    image: string;
    exploreText: string;
    testDriveText: string;
    description?: string;
    additionalInfo?: string | AdditionalInfo[];
    price?: string;
    originalPrice?: string;
}// News article interface
export interface NewsArticle {
    title: string;
    summary: string;
    image: string;
    category: string;
    date: string;
    author: string;
    readTime: string;
    link: string;
}

// Content section interface
export interface ContentSection {
    title: string;
    subtitle?: string;
    quality?: string;
    description?: string;
    features?: Feature[];
    placeholder?: string;
    button?: string;
}

// Home page content interface
export interface HomePageContent {
    hero: {
        explore: string;
        testDrive: string;
    };
    family1: ContentSection;
    family2: ContentSection;
    news: ContentSection;
    newsletter: ContentSection;
}

// Language props interface
export interface LanguageProps {
    language?: Language;
}

// Car/Vehicle interfaces
export interface Vehicle {
    id: string;
    name: string;
    model: string;
    year: number;
    price: number;
    images: string[];
    description: string;
    specifications: VehicleSpecification;
    features: string[];
}

export interface VehicleSpecification {
    engine?: string;
    power?: string;
    transmission?: string;
    fuelType?: string;
    seating?: number;
    dimensions?: {
        length: number;
        width: number;
        height: number;
    };
}

// Form interfaces
export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export interface NewsletterFormData {
    email: string;
}

// API response interfaces
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
}

// Navigation interfaces
export interface NavigationItem {
    label: string;
    href: string;
    children?: NavigationItem[];
}

// Button props interface
export interface ButtonProps extends BaseComponentProps {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

// Input props interface
export interface InputProps extends BaseComponentProps {
    type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'url';
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    required?: boolean;
    error?: string;
}

// Modal props interface
export interface ModalProps extends BaseComponentProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}
