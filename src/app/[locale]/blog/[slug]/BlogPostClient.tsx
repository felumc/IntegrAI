'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { BlogPost } from '@/types/blog';
import { FiCalendar, FiClock, FiUser, FiArrowLeft, FiTag } from 'react-icons/fi';
import { Link } from '@/i18n/navigation';
import WhatsAppButton from '@/components/WhatsAppButton';
import { markdownToHtml } from '@/utils/markdown';
import '../blog.css';

interface BlogPostClientProps {
  post: BlogPost;
  locale: string;
}

export default function BlogPostClient({ post, locale }: BlogPostClientProps) {
  const [isClient, setIsClient] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations('common.blog');

  // Ensure client-side rendering and prevent hydration issues
  useEffect(() => {
    if (post && post.content) {
      try {
        setHtmlContent(markdownToHtml(post.content));
        setIsClient(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Error processing blog content:', error);
        setIsLoading(false);
      }
    }
  }, [post]);

  const formatDate = (dateString: string) => {
    if (!isClient || !dateString) return dateString;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
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

  // Safe translation function with fallbacks
  const safeTranslate = (key: string, fallback: string = '') => {
    try {
      return t(key);
    } catch (error) {
      console.warn(`Translation missing for key: ${key}`);
      return fallback;
    }
  };

  // Early return for invalid post data
  if (!post || !post.title || !post.slug) {
    return (
      <main className="min-h-screen bg-integrai-warm font-sans">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-2xl text-white mb-4 font-light">Post not found</h2>
            <Link href="/blog" className="text-blue-400 hover:text-blue-300 font-light">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (isLoading || !isClient) {
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
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white hover:opacity-80 mb-8 transition-colors text-lg font-light"
            >
              <FiArrowLeft />
              {safeTranslate('backToBlog', 'Back to Blog')}
            </Link>
            
            <div className="flex items-center gap-3 mb-6">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
                {safeTranslate(`categories.${post.category}`, post.category)}
              </span>
              {post.featured && (
                <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  Featured
                </span>
              )}
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white font-light leading-tight mb-8 tracking-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white mb-8 text-base md:text-lg">
              <div className="flex items-center gap-2">
                <FiUser className="text-sm" />
                <span className="font-light">{post.author?.name || 'Unknown'}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCalendar className="text-sm" />
                <span className="font-light">{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="text-sm" />
                <span className="font-light">{post.readingTime || 0} {safeTranslate('readingTime', 'min read')}</span>
              </div>
            </div>
            
            <p className="text-lg md:text-xl lg:text-2xl text-white font-light leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="prose prose-lg max-w-none">
                  <div 
                    className="blog-content text-[#0f172a] font-light"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />
                </div>
                
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-16 pt-8 border-t border-gray-200">
                    <div className="flex items-center gap-2 mb-6">
                      <FiTag className="text-[#0f172a]" />
                      <span className="text-base font-light text-[#0f172a]">{safeTranslate('tags', 'Tags:')}</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-[#f6f6f6] text-[#0f172a] rounded-full text-sm font-light"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  {/* Author Info */}
                  {post.author && (
                    <div className="bg-[#f6f6f6] rounded-xl md:rounded-2xl p-6">
                      <h3 className="font-light text-lg text-[#0f172a] mb-4">{safeTranslate('aboutAuthor', 'About the Author')}</h3>
                      <div className="space-y-2">
                        <div className="font-light text-[#0f172a]">{post.author.name}</div>
                        <div className="text-sm text-gray-600 font-light">{post.author.role}</div>
                      </div>
                    </div>
                  )}

                  {/* Contact CTA */}
                  <div className="bg-[#f6f6f6] rounded-xl md:rounded-2xl p-6">
                    <h3 className="font-light text-lg text-[#0f172a] mb-3">
                      {safeTranslate('readyToTransform', 'Ready to Transform Your Business?')}
                    </h3>
                    <p className="text-[#0f172a] text-sm font-light mb-4 leading-relaxed">
                      {safeTranslate('contactDescription', 'Get in touch to learn how AI automation can benefit your specific business needs.')}
                    </p>
                    <WhatsAppButton 
                      phoneNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5215555555555'}
                      className="w-full justify-center"
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 