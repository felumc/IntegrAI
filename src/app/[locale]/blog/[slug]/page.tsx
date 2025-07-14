import React from 'react';
import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/data/blog';
import BlogPostClient from './BlogPostClient';

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  
  // Find the post in the requested locale
  const post = getBlogPost(slug, locale);
  
  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} locale={locale} />;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const allPosts = [
    ...getBlogPosts('en').map(post => ({ locale: 'en', slug: post.slug })),
    ...getBlogPosts('es').map(post => ({ locale: 'es', slug: post.slug })),
  ];
  
  return allPosts;
} 