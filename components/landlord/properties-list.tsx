"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Plus, Home, QrCode } from "lucide-react";
import Link from "next/link";
import type { IProperty } from "@/lib/models/Property";
import { propertyService } from "@/lib/services/property.service";

export function PropertiesList() {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    try {
      const data = await propertyService.getAll();
      setProperties(data);
    } catch (error) {
      console.error("[v0] Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout role="landlord">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
            <p className="text-muted-foreground">
              Manage your property listings
            </p>
          </div>
          <Button asChild>
            <Link href="/landlord/properties/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2 mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Building2 className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No properties yet</h3>
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Start by adding your first property to begin managing rentals
              </p>
              <Button asChild>
                <Link href="/landlord/properties/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Property
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <Card
                key={String(property._id)}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-muted relative">
                  {property.images?.[0] ? (
                    <img
                      src={property.images[0] || "/placeholder.svg"}
                      alt={property.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Building2 className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  <Badge
                    className="absolute top-2 right-2"
                    variant={
                      property.status === "approved" ? "default" : "secondary"
                    }
                  >
                    {property.status}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">
                    {property.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {property.address.city}, {property.address.country}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Home className="h-4 w-4" />
                        <span>{property.totalUnits} units</span>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/landlord/properties/${property._id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                    {property.qrCode && (
                      <div className="pt-2 border-t">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <QrCode className="h-4 w-4" />
                          <span>QR Code</span>
                        </div>
                        <img
                          src={property.qrCode}
                          alt="Property QR Code"
                          className="w-full h-32 object-contain bg-white p-2 rounded border"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
