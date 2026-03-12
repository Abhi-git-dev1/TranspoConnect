const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
  token?: string;
}

interface ApiError {
  success: false;
  message: string;
  errors?: string[];
  isInterstate?: boolean;
}

const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

const setToken = (token: string) => {
  localStorage.setItem('auth_token', token);
};

const clearToken = () => {
  localStorage.removeItem('auth_token');
};

const apiCall = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T> | ApiError> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'An error occurred',
        errors: data.errors,
        isInterstate: data.isInterstate,
      } as ApiError;
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      message: 'Network error. Please try again.',
    } as ApiError;
  }
};

// Auth APIs
export const authAPI = {
  customerSignup: async (data: {
    name: string;
    businessName: string;
    phoneNumber: string;
    email: string;
    password: string;
  }) => {
    const response = await apiCall<{
      customer: any;
      token: string;
    }>('/auth/customer/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.success && response.token) {
      setToken(response.token);
    }

    return response;
  },

  customerLogin: async (data: {
    phoneNumber: string;
    password: string;
  }) => {
    const response = await apiCall<{
      customer: any;
      token: string;
    }>('/auth/customer/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.success && response.token) {
      setToken(response.token);
    }

    return response;
  },

  driverSignup: async (data: {
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
    vehicleType: string;
    vehicleNumber: string;
    city: string;
  }) => {
    const response = await apiCall<{
      driver: any;
      token: string;
    }>('/auth/driver/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.success && response.token) {
      setToken(response.token);
    }

    return response;
  },

  driverLogin: async (data: {
    phoneNumber: string;
    password: string;
  }) => {
    const response = await apiCall<{
      driver: any;
      token: string;
    }>('/auth/driver/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.success && response.token) {
      setToken(response.token);
    }

    return response;
  },

  logout: () => {
    clearToken();
  },
};

// Booking APIs
export const bookingAPI = {
  createBooking: async (data: {
    pickupLocation: {
      address: string;
      city?: string;
      lat?: number;
      lng?: number;
    };
    dropLocation: {
      address: string;
      city?: string;
      lat?: number;
      lng?: number;
    };
    vehicleType: string;
    notes?: string;
  }) => {
    return apiCall('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getBookings: async (status?: string) => {
    const query = status ? `?status=${status}` : '';
    return apiCall(`/bookings${query}`);
  },

  getBooking: async (bookingId: string) => {
    return apiCall(`/bookings/${bookingId}`);
  },

  cancelBooking: async (bookingId: string) => {
    return apiCall(`/bookings/${bookingId}/cancel`, {
      method: 'PATCH',
    });
  },

  assignDriver: async (bookingId: string) => {
    return apiCall(`/bookings/${bookingId}/assign-driver`, {
      method: 'POST',
    });
  },
};

// Document APIs
export const documentAPI = {
  uploadDocuments: async (formData: FormData) => {
    const headers: HeadersInit = {};
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_URL}/documents/upload`, {
        method: 'POST',
        headers,
        body: formData,
      });

      return await response.json();
    } catch (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        message: 'Upload failed',
      };
    }
  },

  getDocuments: async () => {
    return apiCall('/documents');
  },

  getPendingDocuments: async () => {
    return apiCall('/documents/pending');
  },

  approveDocument: async (documentId: string) => {
    return apiCall(`/documents/${documentId}/approve`, {
      method: 'PATCH',
    });
  },

  rejectDocument: async (documentId: string, rejectionReason: string) => {
    return apiCall(`/documents/${documentId}/reject`, {
      method: 'PATCH',
      body: JSON.stringify({ rejectionReason }),
    });
  },
};

// Notification APIs
export const notificationAPI = {
  getNotifications: async (isRead?: boolean) => {
    const query = isRead !== undefined ? `?isRead=${isRead}` : '';
    return apiCall(`/notifications${query}`);
  },

  markAsRead: async (notificationId: string) => {
    return apiCall(`/notifications/${notificationId}/read`, {
      method: 'PATCH',
    });
  },

  markAllAsRead: async () => {
    return apiCall('/notifications/mark-all-read', {
      method: 'PATCH',
    });
  },

  deleteNotification: async (notificationId: string) => {
    return apiCall(`/notifications/${notificationId}`, {
      method: 'DELETE',
    });
  },
};

export { getToken, setToken, clearToken };
