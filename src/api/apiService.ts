import { ApiResponse, Vehicle, NewsArticle, ContactFormData, NewsletterFormData } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

class ApiService {
    private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                ...options,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return {
                success: true,
                data,
            };
        } catch (error) {
            return {
                success: false,
                data: {} as T,
                error: error instanceof Error ? error.message : 'Unknown error occurred',
            };
        }
    }

    // Vehicle API methods
    async getVehicles(): Promise<ApiResponse<Vehicle[]>> {
        return this.makeRequest<Vehicle[]>('/vehicles');
    }

    async getVehicle(id: string): Promise<ApiResponse<Vehicle>> {
        return this.makeRequest<Vehicle>(`/vehicles/${id}`);
    }

    async searchVehicles(query: string): Promise<ApiResponse<Vehicle[]>> {
        return this.makeRequest<Vehicle[]>(`/vehicles/search?q=${encodeURIComponent(query)}`);
    }

    // News API methods
    async getNews(): Promise<ApiResponse<NewsArticle[]>> {
        return this.makeRequest<NewsArticle[]>('/news');
    }

    async getNewsArticle(id: string): Promise<ApiResponse<NewsArticle>> {
        return this.makeRequest<NewsArticle>(`/news/${id}`);
    }

    // Contact API methods
    async submitContactForm(data: ContactFormData): Promise<ApiResponse<{ message: string }>> {
        return this.makeRequest<{ message: string }>('/contact', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async subscribeNewsletter(data: NewsletterFormData): Promise<ApiResponse<{ message: string }>> {
        return this.makeRequest<{ message: string }>('/newsletter/subscribe', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // Test drive API methods
    async bookTestDrive(vehicleId: string, contactData: ContactFormData): Promise<ApiResponse<{ message: string }>> {
        return this.makeRequest<{ message: string }>('/test-drive', {
            method: 'POST',
            body: JSON.stringify({ vehicleId, ...contactData }),
        });
    }
}

export const apiService = new ApiService();
export default apiService;