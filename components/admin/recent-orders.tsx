import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

export async function RecentOrders() {
  const supabase = await createClient()

  const { data: orders } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        quantity,
        products (
          name
        )
      )
    `)
    .order("created_at", { ascending: false })
    .limit(10)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders?.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">Order #{order.id.slice(0, 8)}</span>
                  <Badge variant={order.status === "completed" ? "default" : "secondary"}>{order.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{order.email}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${order.total_amount.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">{order.order_items?.length || 0} items</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
