import React from 'react';
import { useTranslations } from 'next-intl';
import { getBlogPosts } from '@/data/blog';
import BlogClient from './BlogClient';

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const blogPosts = getBlogPosts(locale);

  return <BlogClient blogPosts={blogPosts} locale={locale} />;
} 