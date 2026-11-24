import { notFound } from "next/navigation";
import CollectionPageView from "@/components/pages/CollectionPageView";
import {
  COLLECTION_PAGES,
  getProductsByCollectionSlug,
} from "@/data/catalog";

export function generateStaticParams() {
  return Object.keys(COLLECTION_PAGES).map((slug) => ({ slug }));
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = COLLECTION_PAGES[slug];
  if (!meta) {
    notFound();
  }

  const products = getProductsByCollectionSlug(slug);
  return <CollectionPageView meta={meta} initialProducts={products} />;
}

