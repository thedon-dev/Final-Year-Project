"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, Check, X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from "next/navigation"
import type { IProperty } from "@/lib/models/Property"

export function AdminProperties() {
  const router = useRouter()
  const [properties, setProperties] = useState<IProperty[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProperties()
  }, [])

  async function fetchProperties() {
    try {
      const res = await fetch("/api/properties")
      const data = await res.json()
      if (data.success) {
        setProperties(data.data)
      }
    } catch (error) {
      console.error("[v0] Error fetching properties:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleApprove(propertyId: string) {
    try {
      const res = await fetch(`/api/admin/properties/${propertyId}/approve`, {
        method: "PUT",
      })

      if (res.ok) {
        fetchProperties()
      }
    } catch (error) {
      console.error("[v0] Error approving property:", error)
    }
  }

  async function handleReject(propertyId: string) {
    try {
      const res = await fetch(`/api/admin/properties/${propertyId}/reject`, {
        method: "PUT",
      })

      if (res.ok) {
        fetchProperties()
      }
    } catch (error) {
      console.error("[v0] Error rejecting property:", error)
    }
  }

  const pendingProperties = properties.filter((p) => p.status === "pending")

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
          <p className="text-muted-foreground">Review and manage property listings</p>
        </div>

        {pendingProperties.length > 0 && (
          <Card className="border-yellow-500">
            <CardHeader>
              <CardTitle>Pending Approvals ({pendingProperties.length})</CardTitle>
              <CardDescription>Properties waiting for your review</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Landlord</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingProperties.map((property) => (
                    <TableRow key={property._id.toString()}>
                      <TableCell className="font-medium">{property.name}</TableCell>
                      <TableCell className="capitalize">{property.type}</TableCell>
                      <TableCell>
                        {property.address.city}, {property.address.country}
                      </TableCell>
                      <TableCell>Landlord Name</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="default" onClick={() => handleApprove(property._id.toString())}>
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleReject(property._id.toString())}>
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>All Properties</CardTitle>
            <CardDescription>Complete list of properties in the system</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 bg-muted rounded animate-pulse" />
                ))}
              </div>
            ) : properties.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">No properties yet</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Units</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties.map((property) => (
                    <TableRow key={property._id.toString()}>
                      <TableCell className="font-medium">{property.name}</TableCell>
                      <TableCell className="capitalize">{property.type}</TableCell>
                      <TableCell>
                        {property.address.city}, {property.address.country}
                      </TableCell>
                      <TableCell>{property.totalUnits}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            property.status === "approved"
                              ? "default"
                              : property.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {property.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
