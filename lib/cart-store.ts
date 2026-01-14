import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Product {
  id: string
  name: string
  description: string
  category: string
  price: number
  image_url: string
}

interface ESim {
  id: string
  country_name: string
  country_flag_logo: string
  amount_gb: number
  amount_days: number
  price: number
}

type CartItemBase = {
  quantity: number
  type: "voucher" | "esim"
}

type VoucherCartItem = Product & CartItemBase & { type: "voucher" }
type ESimCartItem = ESim & CartItemBase & { type: "esim" }

type CartItem = VoucherCartItem | ESimCartItem

interface CartStore {
  items: CartItem[]
  addItem: (product: Product | ESim, type: "voucher" | "esim") => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, type) => {
        const items = get().items
        const existingItem = items.find((item) => item.id === product.id && item.type === type)

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id && item.type === type ? { ...item, quantity: item.quantity + 1 } : item,
            ),
          })
        } else {
          set({
            items: [...items, { ...product, quantity: 1, type }],
          })
        }
      },

      removeItem: (itemId) => {
        set({
          items: get().items.filter((item) => item.id !== itemId),
        })
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }

        set({
          items: get().items.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)
