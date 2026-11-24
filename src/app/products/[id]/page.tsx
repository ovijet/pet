import { notFound } from "next/navigation";
import ProductDetailView from "@/components/pages/ProductDetailView";
import { JOURNAL_ARTICLES, PRODUCTS } from "@/data/catalog";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) {
    notFound();
  }

  const sameSpecies = PRODUCTS.filter(
    (p) => p.id !== product.id && p.species === product.species
  );
  const filler = PRODUCTS.filter(
    (p) => p.id !== product.id && p.species !== product.species
  );
  const relatedProducts = [...sameSpecies, ...filler].slice(0, 4);

  const relatedArticle =
    JOURNAL_ARTICLES.find((a) => a.relatedSlug === product.species) ??
    JOURNAL_ARTICLES[0];

  return (
    <ProductDetailView
      product={product}
      relatedProducts={relatedProducts}
      relatedArticle={relatedArticle}
    />
  );
}
