"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  MapPin,
  CheckCircle,
  Wallet,
  MessageCircle,
  Calendar,
} from "lucide-react";
import { propertyService } from "@/lib/services/property.service";
import type { IProperty } from "@/lib/models/Property";
import Link from "next/link";

export default function PropertyPage() {
  const params = useParams();
  const [property, setProperty] = useState<IProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProperty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug]);

  async function fetchProperty() {
    try {
      // In a real app, you'd decode the slug to get the property ID
      // For now, we'll search by name
      const properties = await propertyService.getAll();
      const foundProperty = properties.find(
        (p) => p.name.toLowerCase().replace(/\s+/g, "-") === params.slug
      );

      if (foundProperty) {
        const fullProperty = await propertyService.getById(
          foundProperty._id.toString()
        );
        setProperty(fullProperty);
      } else {
        setError("Property not found");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Property Not Found</CardTitle>
            <CardDescription>
              {error || "The property you're looking for doesn't exist"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">{property.name}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>
              {property.address.city}, {property.address.country}
            </span>
            <Badge className="ml-2 capitalize">{property.status}</Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Images */}
            {property.images && property.images.length > 0 && (
              <Card>
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={property.images[0]}
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Card>
            )}

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{property.description}</p>
              </CardContent>
            </Card>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline" className="gap-1">
                        <CheckCircle className="h-3 w-3" />
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payment Details */}
            {property.paymentAccount && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Account Name
                    </p>
                    <p className="font-medium">
                      {property.paymentAccount.accountName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Account Number
                    </p>
                    <p className="font-medium">
                      {property.paymentAccount.accountNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bank</p>
                    <p className="font-medium">
                      {property.paymentAccount.bankName}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium capitalize">{property.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Units</p>
                  <p className="font-medium">{property.totalUnits}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Get Started</CardTitle>
                <CardDescription>
                  Sign in or register to view more details and contact the
                  landlord
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" asChild>
                  <Link href="/register?role=tenant">Register as Tenant</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-2">
                <Button variant="outline" className="w-full" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Request Visit
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact Landlord
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
