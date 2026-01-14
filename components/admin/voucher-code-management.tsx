"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { toast } from "@/hooks/use-toast"
import { Plus, Copy, Trash2 } from "lucide-react"

interface Product {
  id: string
  name: string
}

interface VoucherCode {
  id: string
  code: string
  is_used: boolean
  used_at: string | null
  product_id: string
  products: {
    name: string
  }
  created_at: string
}

export function VoucherCodeManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const [voucherCodes, setVoucherCodes] = useState<VoucherCode[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState("")
  const [bulkCodes, setBulkCodes] = useState("")
  const [filterProduct, setFilterProduct] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [productsResult, codesResult] = await Promise.all([
        supabase.from("products").select("id, name").eq("is_active", true),
        supabase
          .from("voucher_codes")
          .select(`
            *,
            products (
              name
            )
          `)
          .order("created_at", { ascending: false }),
      ])

      if (productsResult.error) throw productsResult.error
      if (codesResult.error) throw codesResult.error

      setProducts(productsResult.data || [])
      setVoucherCodes(codesResult.data || [])
    } catch (error) {
      console.error("Error fetching data:", error)
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleBulkAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProduct || !bulkCodes.trim()) return

    setLoading(true)

    try {
      const codes = bulkCodes
        .split("\n")
        .map((code) => code.trim())
        .filter((code) => code.length > 0)

      if (codes.length === 0) {
        toast({
          title: "Error",
          description: "Please enter at least one voucher code",
          variant: "destructive",
        })
        return
      }

      const voucherData = codes.map((code) => ({
        product_id: selectedProduct,
        code: code,
      }))

      const { error } = await supabase.from("voucher_codes").insert(voucherData)

      if (error) throw error

      toast({
        title: "Success",
        description: `Added ${codes.length} voucher codes successfully`,
      })

      setBulkCodes("")
      setSelectedProduct("")
      setShowForm(false)
      fetchData()
    } catch (error) {
      console.error("Error adding voucher codes:", error)
      toast({
        title: "Error",
        description: "Failed to add voucher codes",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (codeId: string) => {
    if (!confirm("Are you sure you want to delete this voucher code?")) return

    try {
      const { error } = await supabase.from("voucher_codes").delete().eq("id", codeId)

      if (error) throw error
      toast({ title: "Success", description: "Voucher code deleted successfully" })
      fetchData()
    } catch (error) {
      console.error("Error deleting voucher code:", error)
      toast({
        title: "Error",
        description: "Failed to delete voucher code",
        variant: "destructive",
      })
    }
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({ title: "Copied", description: "Voucher code copied to clipboard" })
  }

  const filteredCodes = voucherCodes.filter((code) => {
    const productMatch = filterProduct === "all" || code.product_id === filterProduct
    const statusMatch =
      filterStatus === "all" ||
      (filterStatus === "used" && code.is_used) ||
      (filterStatus === "unused" && !code.is_used)
    return productMatch && statusMatch
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Voucher Code Management</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Codes
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add Voucher Codes</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBulkAdd} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product">Select Product</Label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="codes">Voucher Codes (one per line)</Label>
                <Textarea
                  id="codes"
                  value={bulkCodes}
                  onChange={(e) => setBulkCodes(e.target.value)}
                  placeholder="STEAM25-ABC123&#10;STEAM25-DEF456&#10;STEAM25-GHI789"
                  rows={6}
                  required
                />
                <p className="text-sm text-muted-foreground">Enter each voucher code on a new line</p>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Adding..." : "Add Codes"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Filter Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="filterProduct">Product</Label>
              <Select value={filterProduct} onValueChange={setFilterProduct}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <Label htmlFor="filterStatus">Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="unused">Unused</SelectItem>
                  <SelectItem value="used">Used</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCodes.map((voucherCode) => (
          <Card key={voucherCode.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-sm">{voucherCode.products.name}</h3>
                <Badge variant={voucherCode.is_used ? "destructive" : "default"}>
                  {voucherCode.is_used ? "Used" : "Available"}
                </Badge>
              </div>
              <div className="bg-muted p-2 rounded font-mono text-sm mb-3 flex items-center justify-between">
                <span className="truncate">{voucherCode.code}</span>
                <Button size="sm" variant="ghost" onClick={() => copyToClipboard(voucherCode.code)}>
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              {voucherCode.used_at && (
                <p className="text-xs text-muted-foreground mb-2">
                  Used: {new Date(voucherCode.used_at).toLocaleDateString()}
                </p>
              )}
              <div className="flex gap-2">
                <Button size="sm" variant="destructive" onClick={() => handleDelete(voucherCode.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCodes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No voucher codes found matching your filters.</p>
        </div>
      )}
    </div>
  )
}
