// Centralized API client for communicating with external backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }


  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include", // Include cookies for session management
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Request failed" }))
        throw new Error(error.message || `HTTP ${response.status}`)
      }

      return response.json()
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error)
      throw error
    }
  }

  // Products
 async getProducts(filters?: { category?: string }) {
  const response = await this.request<
    Array<{
      icon: string
      category: string
      group: string
    }>
  >(
    "/v2/merchant/get-groups2",
    {
      headers: {
        Authorization: "Bearer vkvk",
      },
    }
  )

  // если API вернул [] — фронт это нормально переварит
  if (!Array.isArray(response)) return []

  // Фильтрация по категории, если передана
  const filtered = filters?.category
    ? response.filter((p) => p.category === filters.category)
    : response

  // Приводим к формату, который ожидает UI
  return filtered.map((item) => ({
    id: item.group,           // уникальный идентификатор
    name: item.group,         // название товара
    category: item.category,
    image_url: item.icon,         // картинка
    is_active: true,           // т.к. бек не отдает это поле
    price: 0,
    old_price: null,
  }))
}


  async getProduct(id: string) {
    return this.request<any>(`/products/${id}`)
  }

  async createProduct(data: any) {
    return this.request<any>("/products", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateProduct(id: string, data: any) {
    return this.request<any>(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteProduct(id: string) {
    return this.request<void>(`/products/${id}`, {
      method: "DELETE",
    })
  }

  // Orders
  async createOrder(data: { email: string; fullName: string; items: any[]; totalAmount: number }) {
    return this.request<any>("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getOrders(filters?: { limit?: number }) {
    const params = new URLSearchParams()
    if (filters?.limit) params.append("limit", String(filters.limit))

    const query = params.toString() ? `?${params.toString()}` : ""
    return this.request<any[]>(`/orders${query}`)
  }

  async getOrder(id: string) {
    return this.request<any>(`/orders/${id}`)
  }

  // Voucher Codes
  async getVoucherCodes(filters?: { productId?: string; isUsed?: boolean }) {
    const params = new URLSearchParams()
    if (filters?.productId) params.append("product_id", filters.productId)
    if (filters?.isUsed !== undefined) params.append("is_used", String(filters.isUsed))

    const query = params.toString() ? `?${params.toString()}` : ""
    return this.request<any[]>(`/voucher-codes${query}`)
  }

  async createVoucherCode(data: { productId: string; code: string }) {
    return this.request<any>("/voucher-codes", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async deleteVoucherCode(id: string) {
    return this.request<void>(`/voucher-codes/${id}`, {
      method: "DELETE",
    })
  }

  // Authentication
  async login(email: string, password: string) {
    return this.request<{ user: any }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  async signup(email: string, password: string, fullName: string) {
    return this.request<{ user: any }>("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, fullName }),
    })
  }

  async logout() {
    return this.request<void>("/auth/logout", {
      method: "POST",
    })
  }

  async getCurrentUser() {
    return this.request<{ user: any | null }>("/auth/me")
  }

  // Admin Stats
  async getAdminStats() {
    return this.request<{
      totalProducts: number
      totalOrders: number
      totalRevenue: number
      availableVoucherCodes: number
    }>("/admin/stats")
  }

  // eSIMs
async getESims(filters?: { country?: string }) {
  try {
    console.log('🔄 getESims called with filters:', filters)
    
    if (!filters?.country) {
      console.warn('⚠️ No country filter provided to getESims')
      return []
    }

    // Используем ваш API route вместо прямого вызова
    const response = await fetch(
      `/api/esim/country-products?country=${encodeURIComponent(filters.country)}`
    )
    
    if (!response.ok) {
      console.error('❌ API route failed:', response.status)
      throw new Error(`HTTP ${response.status}`)
    }
    
    const data = await response.json()
    console.log('✅ getESims received data:', data.length, 'items')
    
    // Данные уже преобразованы в API route, но можно дополнительно проверить
    return Array.isArray(data) ? data : []
    
  } catch (error) {
    console.error('❌ getESims error:', error)
    return [] // Возвращаем пустой массив вместо ошибки
  }
}

  async getESim(id: string) {
      console.log('🌐 [API Request]', {
      endpoint,
      baseUrl: this.baseUrl,
      fullUrl: url,
      method: options.method || 'GET',
      hasBody: !!options.body
    })
    return this.request<any>(`/esims/${id}`)

  }

  async createESim(data: any) {
    return this.request<any>("/esims", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateESim(id: string, data: any) {
    return this.request<any>(`/esims/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteESim(id: string) {
    return this.request<void>(`/esims/${id}`, {
      method: "DELETE",
    })
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
