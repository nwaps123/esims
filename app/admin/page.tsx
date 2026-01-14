export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"
import { apiClient } from "@/lib/api-client"
import { AdminStats } from "@/components/admin/admin-stats"
import { RecentOrders } from "@/components/admin/recent-orders"
import { ProductManagement } from "@/components/admin/product-management"
import { VoucherCodeManagement } from "@/components/admin/voucher-code-management"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function AdminPage() {
  let stats = {
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    availableVoucherCodes: 0,
  }

  try {
    stats = await apiClient.getAdminStats()
  } catch (error) {
    console.error("Error fetching admin stats:", error)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your voucher marketplace</p>
      </div>

      <AdminStats stats={stats} />

      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="vouchers">Voucher Codes</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <RecentOrders />
        </TabsContent>

        <TabsContent value="products" className="mt-6">
          <ProductManagement />
        </TabsContent>

        <TabsContent value="vouchers" className="mt-6">
          <VoucherCodeManagement />
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold mb-2">Order Management</h3>
            <p className="text-muted-foreground">Detailed order management coming soon</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
