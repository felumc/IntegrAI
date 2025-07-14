'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { BlogPost } from '@/types/blog';
import { FiCalendar, FiClock, FiUser, FiTag } from 'react-icons/fi';
import { Link } from '@/i18n/navigation';

interface BlogClientProps {
  blogPosts: BlogPost[];
  locale: string;
}

export default function BlogClient({ blogPosts, locale }: BlogClientProps) {
  const [isClient, setIsClient] = useState(false);
  const t = useTranslations('common.blog');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  // Safe translation function with fallbacks
  const safeTranslate = (key: string, fallback: string = '') => {
    try {
      return t(key);
    } catch (error) {
      console.warn(`Translation missing for key: ${key}`);
      return fallback;
    }
  };

  const categories = [
    { id: 'all', name: safeTranslate('allPosts', 'All Posts') },
    { id: 'ai', name: safeTranslate('categories.ai', 'AI & Automation') },
    { id: 'business', name: safeTranslate('categories.business', 'Business Growth') },
    { id: 'case-study', name: safeTranslate('categories.case-study', 'Case Studies') },
    { id: 'technology', name: safeTranslate('categories.technology', 'Technology') },
  ];

  const formatDate = (dateString: string) => {
    if (!isClient) return dateString;
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'ai': 'bg-blue-100 text-blue-800',
      'business': 'bg-green-100 text-green-800',
      'case-study': 'bg-purple-100 text-purple-800',
      'technology': 'bg-orange-100 text-orange-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (!isClient) {
    // Server-side rendering - return a loading state
    return (
      <main className="min-h-screen bg-integrai-warm font-sans">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-integrai-warm font-sans">
      {/* Header */}
      <section className="pt-32 pb-24 md:pb-32 min-h-[70vh] relative flex items-center" style={{background: '', backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
        <div className="absolute inset-0 pointer-events-none z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white font-light leading-tight mb-8 tracking-tight">
              {safeTranslate('title', 'IntegrAI Blog')}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white font-light leading-relaxed">
              {safeTranslate('subtitle', 'Insights, updates, and stories from our AI automation journey')}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-12">
          <div className="max-w-6xl mx-auto">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-16 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full text-sm font-light transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Blog Posts */}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg font-light">
                  {safeTranslate('noPostsYet', 'No blog posts yet. Check back soon for insights about AI automation and business transformation!')}
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredPosts.map((post) => (
                  <article key={post.slug} className="group bg-[#f6f6f6] rounded-xl md:rounded-2xl p-6 md:p-8 hover:shadow-md transition-all duration-300">
                    {/* Tags */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-light text-gray-500 uppercase tracking-wide">
                        {safeTranslate(`categories.${post.category}`, post.category)}
                      </span>
                      {post.featured && (
                        <span className="text-xs font-light text-amber-600 uppercase tracking-wide">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-light text-[#0f172a] mb-3 leading-tight">
                      <Link href={`/blog/${post.slug}`} className="group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm font-light mb-6 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    {/* Bottom section */}
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="font-light">{formatDate(post.publishedAt)}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="font-light">{post.readingTime} min</span>
                      </div>
                      
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-xs font-light text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-wide"
                      >
                        {safeTranslate('readMore', 'Read More')}
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
} 