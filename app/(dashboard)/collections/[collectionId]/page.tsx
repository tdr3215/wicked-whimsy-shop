"use client";
import CollectionForm from "@/components/collections/CollectionForm";
import Loader from "@/components/custom_ui/Loader";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CollectionDetailsPage = () => {
  const [loading, setLoading] = useState(false);
  const [collectionDetails, setCollectionDetails] =
    useState<CollectionType | null>(null);
  const params = useParams();

  useEffect(() => {
    const getCollectionDetails = async () => {
      try {
        const res = await fetch(`/api/collections/${params.collectionId}`, {
          method: "GET",
        });
        const data = await res.json();
        setCollectionDetails(data);
        setLoading(false);
      } catch (error) {
        console.log("[CollectionDetailPage_GET]", error);
      }
    };
    getCollectionDetails();
  }, [params.collectionId]);
  return loading ? (
    <Loader />
  ) : (
    <CollectionForm initialData={collectionDetails} />
  );
};

export default CollectionDetailsPage;
