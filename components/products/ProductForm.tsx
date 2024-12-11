"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom_ui/ImageUpload";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Delete from "../custom_ui/Delete";
import MultiText from "../custom_ui/MultiText";
import MultiSelect from "../custom_ui/MultiSelect";

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  media: z.array(z.string()),
  category: z.string(),
  collections: z.array(z.string()),
  tags: z.array(z.string()),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  price: z.coerce.number().min(0.1),
  expense: z.coerce.number().min(0.1),
});

interface ProductFormProps {
  initialData?: ProductType | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", { method: "GET" });

      const data = await res.json();

      setCollections(data);
      setLoading(false);
    } catch (error) {
      console.log("[ProductForm_getCollections]", error);
      toast.error("Something went wrong! Please try again.");
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          collections: initialData.collections.map(
            (collection) => collection._id
          ),
        }
      : {
          title: "",
          description: "",
          media: [],
          category: "",
          collections: [],
          tags: [],
          sizes: [],
          colors: [],
          price: 0.1,
          expense: 0.1,
        },
  });

  // Handles accidental pressing of enter key before form completion
  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/product/${initialData._id}`
        : "/api/products";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setLoading(false);
        toast.success(
          `product ${initialData ? "updated" : "created"} successfully!`
        );
        window.location.href = "/products";
        router.push("/products");
      }
    } catch (error) {
      console.log("[ProductForm]", error);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Product</p>
          <Delete id={initialData._id} />
        </div>
      ) : (
        <p className="text-heading2-bold">Create Product</p>
      )}
      <Separator className="mt-4 mb-7 bg-green-1" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* TITLE */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a title"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>

                <FormMessage className="text-red-700" />
              </FormItem>
            )}
          />

          {/* DESCRIPTION */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter a description"
                    {...field}
                    rows={5}
                    onKeyDown={handleKeyPress}
                    className="rounded-xl"
                  />
                </FormControl>

                <FormMessage className="text-red-700" />
              </FormItem>
            )}
          />

          {/* Media */}
          <FormField
            control={form.control}
            name="media"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  {/* Fix it so there are multiple images shown at once */}
                  <ImageUpload
                    uploadedImages={uploadedImages}
                    value={field.value}
                    onChange={(data) => {
                      setUploadedImages((uploadedImages) => {
                        return [...uploadedImages, data];
                      });
                      field.onChange([...field.value, data]);
                    }}
                    onRemove={(url) => {
                      field.onChange([
                        ...field.value.filter((image) => image !== url),
                      ]);

                      setUploadedImages(
                        uploadedImages.filter((image) => image !== url)
                      );
                    }}
                  />

                  {/* {uploadedImages.map((img, index) => (
                    <Image
                      src={img}
                      key={index}
                      alt="product"
                      className="object-cover rounded-lg"
                      fill
                    />
                  ))} */}
                </FormControl>
                <FormMessage className="text-red-700" />
              </FormItem>
            )}
          />

          <div className="md:grid md:grid-cols-3 gap-8">
            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a price"
                      {...field}
                      onKeyDown={handleKeyPress}
                      type="number"
                    />
                  </FormControl>

                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />
            {/* Expense */}
            <FormField
              control={form.control}
              name="expense"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expense ($)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter an expense"
                      {...field}
                      onKeyDown={handleKeyPress}
                      type="number"
                    />
                  </FormControl>

                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />
            {/* Category */}

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a category"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>

                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />

            {/* Tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Tags"
                      value={field.value}
                      onChange={(tag) => field.onChange([...field.value, tag])}
                      onRemove={(tagToRemove) => {
                        field.onChange([
                          ...field.value.filter((tag) => tag !== tagToRemove),
                        ]);
                      }}
                    />
                  </FormControl>

                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />
            {/* Collections */}
            {collections.length > 0 && (
              <FormField
                control={form.control}
                name="collections"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collections</FormLabel>
                    <FormControl>
                      <MultiSelect
                        placeholder="Collections"
                        collections={collections}
                        value={field.value}
                        onChange={(_id) =>
                          field.onChange([...field.value, _id])
                        }
                        onRemove={(idToRemove) => {
                          field.onChange([
                            ...field.value.filter(
                              (collectionId) => collectionId !== idToRemove
                            ),
                          ]);
                        }}
                      />
                    </FormControl>

                    <FormMessage className="text-red-700" />
                  </FormItem>
                )}
              />
            )}

            {/* Colors */}
            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colors</FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Colors"
                      value={field.value}
                      onChange={(color) =>
                        field.onChange([...field.value, color])
                      }
                      onRemove={(colorToRemove) => {
                        field.onChange([
                          ...field.value.filter(
                            (color) => color !== colorToRemove
                          ),
                        ]);
                      }}
                    />
                  </FormControl>

                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />

            {/* Sizes */}
            <FormField
              control={form.control}
              name="sizes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sizes</FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Sizes"
                      value={field.value}
                      onChange={(size) =>
                        field.onChange([...field.value, size])
                      }
                      onRemove={(sizeToRemove) => {
                        field.onChange([
                          ...field.value.filter(
                            (size) => size !== sizeToRemove
                          ),
                        ]);
                      }}
                    />
                  </FormControl>

                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-10">
            <Button
              type="submit"
              className="bg-purple-1 text-white hover:bg-purple-800 rounded-xl"
            >
              Submit
            </Button>
            <Button
              className="bg-red-700 text-white hover:bg-red-600 rounded-xl"
              type="button"
              onClick={() => {
                router.push("/products");
              }}
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
