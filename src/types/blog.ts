export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readingTime: number;
  category: 'ai' | 'business' | 'case-study' | 'technology';
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  coverImage?: string;
  featured?: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
} 