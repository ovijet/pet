import { notFound } from "next/navigation";
import JournalDetailView from "@/components/pages/JournalDetailView";
import { JOURNAL_ARTICLES, PRODUCTS } from "@/data/catalog";

export function generateStaticParams() {
  return JOURNAL_ARTICLES.map((a) => ({ id: a.id }));
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = JOURNAL_ARTICLES.find((a) => a.id === id);
  if (!article) {
    notFound();
  }

  const matched = PRODUCTS.filter((p) => p.species === article.relatedSlug);
  const filler = PRODUCTS.filter((p) => p.species !== article.relatedSlug);
  const relatedProducts = [...matched, ...filler].slice(0, 3);
  const otherArticles = JOURNAL_ARTICLES.filter((a) => a.id !== article.id);

  return (
    <JournalDetailView
      article={article}
      relatedProducts={relatedProducts}
      otherArticles={otherArticles}
    />
  );
}
