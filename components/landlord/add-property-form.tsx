"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Plus, X, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PropertyType } from "@/lib/models/Property";
import {
  CreatePropertyData,
  propertyService,
} from "@/lib/services/property.service";

const amenitiesList = [
  "Parking",
  "Swimming Pool",
  "Gym",
  "Security",
  "Elevator",
  "Garden",
  "Playground",
  "Backup Generator",
  "Water Supply",
  "Internet",
];

export function AddPropertyForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [uploadingImages, setUploadingImages] = useState(false);

  function toggleAmenity(amenity: string) {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  }

  function addImageUrl() {
    if (newImageUrl && !imageUrls.includes(newImageUrl)) {
      setImageUrls([...imageUrls, newImageUrl]);
      setNewImageUrl("");
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...filesArray]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      setUploadingImages(true);
      const uploadedUrls: string[] = [];

      // Fix the image upload logic
      for (const image of images) {
        const formData = new FormData();
        formData.append("file", image); // This is correct

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload images");
        }

        const data = await response.json();
        uploadedUrls.push(data.url);
      }
      setUploadingImages(false);

      const form = e.currentTarget as HTMLFormElement;

      const formElements = {
        name: form.elements.namedItem("name") as HTMLInputElement,
        type: form.elements.namedItem("type") as HTMLSelectElement,
        description: form.elements.namedItem(
          "description"
        ) as HTMLTextAreaElement,
        street: form.elements.namedItem("street") as HTMLInputElement,
        city: form.elements.namedItem("city") as HTMLInputElement,
        state: form.elements.namedItem("state") as HTMLInputElement,
        country: form.elements.namedItem("country") as HTMLInputElement,
        postalCode: form.elements.namedItem("postalCode") as HTMLInputElement,
      };

      const formData = {
        name: formElements.name.value,
        type: formElements.type.value,
        description: formElements.description.value,
        address: {
          street: formElements.street.value,
          city: formElements.city.value,
          state: formElements.state.value,
          country: formElements.country.value,
          postalCode: formElements.postalCode.value || "",
        },
        amenities: selectedAmenities,
        images: uploadedUrls,
      };

      // Validate required fields
      if (
        !formData.name ||
        !formData.type ||
        !formData.description ||
        !formData.address.street ||
        !formData.address.city ||
        !formData.address.state ||
        !formData.address.country
      ) {
        throw new Error("Please fill in all required fields");
      }

      if (
        !["apartment", "house", "compound", "commercial"].includes(
          formData.type
        )
      ) {
        throw new Error("Invalid property type");
      }

      await propertyService.create(formData as CreatePropertyData);
      router.push("/landlord/properties");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setUploadingImages(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Provide the main details about your property
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Property Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Sunset Apartments"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Property Type</Label>
            <Select name="type" required>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="compound">Compound</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your property..."
              rows={4}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
          <CardDescription>Where is your property located?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              name="street"
              placeholder="123 Main Street"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" placeholder="Nairobi" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/County</Label>
              <Input
                id="state"
                name="state"
                placeholder="Nairobi County"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" name="country" placeholder="Kenya" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input id="postalCode" name="postalCode" placeholder="00100" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Amenities</CardTitle>
          <CardDescription>
            Select the amenities available at your property
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {amenitiesList.map((amenity) => (
              <Badge
                key={amenity}
                variant={
                  selectedAmenities.includes(amenity) ? "default" : "outline"
                }
                className="cursor-pointer"
                onClick={() => toggleAmenity(amenity)}
              >
                {amenity}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Images</CardTitle>
          <CardDescription>Upload images of your property</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="image-upload"
            />
            <Label
              htmlFor="image-upload"
              className="cursor-pointer flex items-center gap-2 border rounded-md p-2 hover:bg-gray-50"
            >
              <Upload className="h-4 w-4" />
              Select Images
            </Label>
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Property ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {uploadingImages && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading images...
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Property
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
