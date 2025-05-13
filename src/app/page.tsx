declare global {
  interface Window {
    Calendly?: any;
  }
}

'use client';
import { FiZap, FiSmile, FiClock, FiDollarSign, FiBarChart2, FiTrendingUp, FiChevronDown ,FiBarChart, FiEdit3, FiMessageCircle } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface Translations {
  hero: {
    title: {
      line1: string;
      line2: string;
      line3: string;
    };
    subtitle: string;
    cta: string;
  };
  services: {
    heading: {
      line1: string;
      line2: string;
      line3: string;
    };
    description: {
      p1: string;
      p2: string;
    };
    learnMore: string;
    whatWeOffer: string;
    offerings: {
      automation: {
        title: string;
        description: string;
      };
      assistants: {
        title: string;
        description: string;
      };
      integration: {
        title: string;
        description: string;
      };
      strategy: {
        title: string;
        description: string;
      };
    };
  };
  process: {
    title: string;
    subtitle: string;
    steps: {
      analyzing: {
        title: string;
        description: string;
      };
      development: {
        title: string;
        description: string;
      };
      integration: {
        title: string;
        description: string;
      };
      optimization: {
        title: string;
        description: string;
      };
    };
  };
  benefits: {
    title: {
      line1: string;
      line2: string;
    };
    subtitle: string;
    items: {
      productivity: {
        title: string;
        description: string;
      };
      customerExperience: {
        title: string;
        description: string;
      };
      availability: {
        title: string;
        description: string;
      };
      costReduction: {
        title: string;
        description: string;
      };
      insights: {
        title: string;
        description: string;
      };
      scalability: {
        title: string;
        description: string;
      };
    };
  };
  faq: {
    title: string;
    subtitle: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  cta: {
    title: {
      line1: string;
      line2: string;
    };
    subtitle: string;
    button: string;
    form: {
      name: string;
      email: string;
      message: string;
      button: string;
    };
  };
  footer: {
    copyright: string;
  };
  analyzingPills: Array<{
    label: string;
  }>;
}


// Add this helper for animation
function useStaggeredFadeIn(count: number) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (el) {
        setTimeout(() => {
          el.classList.remove('opacity-0', 'translate-y-8');
        }, 200 + i * 150);
      }
    });
  }, []);
  return refs;
}

export default function Home() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [translations, setTranslations] = useState<Translations | null>(null);
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'es';

  useEffect(() => {
    async function loadTranslations() {
      try {
        const response = await fetch(`/locales/${locale}/common.json`);
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error("Error loading translations:", error);
        setTranslations(null);
      }
    }

    loadTranslations();
  }, [locale]);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // For process animation
  const processSteps = translations ? [
    {
      icon: <FiBarChart className="text-3xl text-[#f87171]" />,
      iconBg: 'bg-[#fde4dd]',
      title: translations.process.steps.analyzing.title,
      desc: translations.process.steps.analyzing.description
    },
    {
      icon: <FiEdit3 className="text-3xl text-[#34d399]" />,
      iconBg: 'bg-[#d1fae5]',
      title: translations.process.steps.development.title,
      desc: translations.process.steps.development.description
    },
    {
      icon: <FiClock className="text-3xl text-[#a78bfa]" />,
      iconBg: 'bg-[#ede9fe]',
      title: translations.process.steps.integration.title,
      desc: translations.process.steps.integration.description
    },
    {
      icon: <FiMessageCircle className="text-3xl text-[#a78bfa]" />,
      iconBg: 'bg-[#f3e8ff]',
      title: translations.process.steps.optimization.title,
      desc: translations.process.steps.optimization.description
    },
  ] : [];

  useEffect(() => {
    // Only add script if it hasn't been added yet
    if (!document.getElementById('calendly-widget-script')) {
      const script = document.createElement('script');
      script.id = 'calendly-widget-script';
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
    // Only add Calendly CSS if it hasn't been added yet
    if (!document.getElementById('calendly-widget-css')) {
      const link = document.createElement('link');
      link.id = 'calendly-widget-css';
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(link);
    }
  }, []);

  if (!translations) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-integrai-warm font-sans">
      {/* Hero Section */}
      <section id='home' className="pt-32 pb-24 md:pb-32 min-h-[70vh] relative flex items-center" style={{background: '', backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
        <div className="absolute inset-0  pointer-events-none z-0" />
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:items-start justify-between gap-12 relative z-10">
          {/* Left: Title */}
          <div className="flex-[2] flex flex-col justify-center items-start">
            <h1 className="text-5xl md:text-8xl text-white font-light leading-tight mb-0 tracking-tight" style={{lineHeight: '1.05'}}>
              {translations.hero.title.line1}
            </h1>
            <h1 className="text-5xl md:text-8xl text-white font-light leading-tight mb-0 tracking-tight" style={{lineHeight: '1.05'}}>
              {translations.hero.title.line2}
            </h1>
            <h1 className="text-5xl md:text-8xl text-white font-light leading-tight mb-0 tracking-tight" style={{lineHeight: '1.05'}}>
              {translations.hero.title.line3}
            </h1>
          </div>
          {/* Right: Subtitle and Buttons */}
          <div className="flex-[1] flex flex-col items-end justify-center w-full md:w-auto mt-16 md:mt-80">
            <p className="text-2xl md:text-3xl text-white mb-10 max-w-md text-right font-light">
              {translations.hero.subtitle}
            </p>
            <div className="flex gap-6 w-full md:w-auto justify-end">
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  if (window.Calendly) {
                    window.Calendly.initPopupWidget({ url: 'https://calendly.com/contact-integrai/30min' });
                  }
                }}
                className="bg-white text-[#0f172a] px-10 py-4 rounded-full font-normal text-lg shadow-md hover:bg-blue-100 transition-all border-2 border-white inline-block text-center"
              >
                {translations.hero.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Partner Section */}
      <section id='services' className="pt-12 md:pt-32 pb-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-16 items-start mb-20">
            {/* Left: Large Heading */}
            <div className="flex-1">
              <h2 className="text-5xl md:text-7xl font-light text-[#0f172a] leading-tight mb-0">
                {translations.services.heading.line1}<br/>
                {translations.services.heading.line2}<br/>
                {translations.services.heading.line3}
              </h2>
            </div>
            {/* Right: Paragraphs and Link */}
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-xl text-gray-900 mb-8 font-light">
                {translations.services.description.p1}
              </p>
              <p className="text-xl text-gray-900 mb-8 font-light">
                {translations.services.description.p2}
              </p>
              <a href="#" className="inline-flex items-center text-lg text-[#0f172a] font-medium border-b border-[#0f172a] w-max hover:opacity-80 transition group">
                {translations.services.learnMore} <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
          {/* Stats Row */}
          <h2 className="text-5xl md:text-6xl text-[#0f172a] mb-8 pt-24 text-center font-light border-t border-gray-200">{translations.services.whatWeOffer}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b pb-36 border-gray-200 pt-16">
            <div className="flex flex-col h-full">
              <div className="text-3xl md:text-5xl font-light text-[#0f172a] mb-12 pl-8 md:pl-0">{translations.services.offerings.automation.title}</div>
              <div className="flex-grow" />
              <div className="text-lg text-gray-600 font-light mb-0 pl-8 md:pl-0">{translations.services.offerings.automation.description}</div>
            </div>
            <div className="flex flex-col h-full border-l border-gray-200 pl-8">
              <div className="text-3xl md:text-5xl font-light text-[#0f172a] mb-12">{translations.services.offerings.assistants.title}</div>
              <div className="flex-grow" />
              <div className="text-lg text-gray-600 font-light mb-0">{translations.services.offerings.assistants.description}</div>
            </div>
            <div className="flex flex-col h-full border-l border-gray-200 pl-8">
              <div className="text-3xl md:text-5xl font-light text-[#0f172a] mb-12">{translations.services.offerings.integration.title}</div>
              <div className="flex-grow" />
              <div className="text-lg text-gray-600 font-light mb-0">{translations.services.offerings.integration.description}</div>
            </div>
            <div className="flex flex-col h-full border-l border-gray-200 pl-8">
              <div className="text-3xl md:text-5xl font-light text-[#0f172a] mb-12">{translations.services.offerings.strategy.title}</div>
              <div className="flex-grow" />
              <div className="text-lg text-gray-600 font-light mb-0">{translations.services.offerings.strategy.description}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="pb-32 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-7xl text-[#0f172a] mb-8 text-center font-light">{translations.process.title}</h2>
          <p className="text-2xl font-light text-[#0f172a] mb-20 text-center">{translations.process.subtitle}</p>
          <div className="flex flex-col gap-8">
            {processSteps.map((step, idx) => (
              <div key={step.title} className="rounded-3xl bg-[#f6f6f6] p-8 flex flex-col sm:flex-row items-start shadow-sm w-full">
                <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-6 sm:mb-0 sm:mr-8 ${step.iconBg}`}>{step.icon}</div>
                <div className="flex flex-col flex-1">
                  <h3 className="text-4xl font-light text-gray-900 mb-2">{step.title}</h3>
                  <div className="flex-grow" />
                  <p className="text-gray-900 font-light leading-relaxed mt-12 sm:mt-4 text-xl">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-7xl font-light text-center mb-2 text-white">{translations.benefits.title.line1}</h2>
            <h2 className="text-7xl font-light text-center mb-8 text-white">{translations.benefits.title.line2}</h2>
            <p className="text-2xl text-gray-300 text-center max-w-2xl font-light mb-20">
              {translations.benefits.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            <div className="bg-[#18181b] border border-gray-800 rounded-3xl p-10 shadow-lg hover:bg-[#23232a] transition-all relative overflow-hidden">
              <FiZap className="text-white text-3xl mb-6" />
              <h3 className="text-4xl font-light mb-12 text-white">{translations.benefits.items.productivity.title}</h3>
              <div className="flex-grow" />
              <p className="text-gray-300 font-light text-lg">{translations.benefits.items.productivity.description}</p>
            </div>
            <div className="bg-[#18181b] border border-gray-800 rounded-3xl p-10 shadow-lg hover:bg-[#23232a] transition-all relative overflow-hidden">
              <FiSmile className="text-white text-3xl mb-6" />
              <h3 className="text-4xl font-light mb-12 text-white">{translations.benefits.items.customerExperience.title}</h3>
              <div className="flex-grow" />
              <p className="text-gray-300 font-light text-lg">{translations.benefits.items.customerExperience.description}</p>
            </div>
            <div className="bg-[#18181b] border border-gray-800 rounded-3xl p-10 shadow-lg hover:bg-[#23232a] transition-all relative overflow-hidden">
              <FiClock className="text-white text-3xl mb-6" />
              <h3 className="text-4xl font-light mb-12 text-white">{translations.benefits.items.availability.title}</h3>
              <div className="flex-grow" />
              <p className="text-gray-300 font-light text-lg">{translations.benefits.items.availability.description}</p>
            </div>
            <div className="bg-[#18181b] border border-gray-800 rounded-3xl p-10 shadow-lg hover:bg-[#23232a] transition-all relative overflow-hidden">
              <FiDollarSign className="text-white text-3xl mb-6" />
              <h3 className="text-4xl font-light mb-12 text-white">{translations.benefits.items.costReduction.title}</h3>
              <div className="flex-grow" />
              <p className="text-gray-300 font-light text-lg">{translations.benefits.items.costReduction.description}</p>
            </div>
            <div className="bg-[#18181b] border border-gray-800 rounded-3xl p-10 shadow-lg hover:bg-[#23232a] transition-all relative overflow-hidden">
              <FiBarChart2 className="text-white text-3xl mb-6" />
              <h3 className="text-4xl font-light mb-12 text-white">{translations.benefits.items.insights.title}</h3>
              <div className="flex-grow" />
              <p className="text-gray-300 font-light text-lg">{translations.benefits.items.insights.description}</p>
            </div>
            <div className="bg-[#18181b] border border-gray-800 rounded-3xl p-10 shadow-lg hover:bg-[#23232a] transition-all relative overflow-hidden">
              <FiTrendingUp className="text-white text-3xl mb-6" />
              <h3 className="text-4xl font-light mb-12 text-white">{translations.benefits.items.scalability.title}</h3>
              <div className="flex-grow" />
              <p className="text-gray-300 font-light text-lg">{translations.benefits.items.scalability.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id='about' className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            {/* Left: Heading & Description */}
            <div className="flex-1 mb-12 md:mb-0">
              <h2 className="text-6xl md:text-7xl font-light text-[#0f172a] leading-tight mb-6">{translations.faq.title}</h2>
              <p className="text-xl text-gray-500 font-light">{translations.faq.subtitle}</p>
            </div>
            {/* Right: FAQ Accordion */}
            <div className="flex-1 w-full max-w-xl mx-auto divide-y divide-gray-200">
              {translations.faq.items.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return isOpen ? (
                  <div key={faq.question} className="rounded-2xl bg-gray-100 px-4 pt-8 pb-6 mb-2">
                    <button
                      className="flex items-center justify-between w-full text-left focus:outline-none text-2xl font-light text-[#0f172a] mb-4"
                      onClick={() => toggleFAQ(idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-content-${idx}`}
                    >
                      <span>{faq.question}</span>
                      <span className="ml-4 text-3xl text-gray-400 transition-transform" style={{transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}}>
                      <FiChevronDown />
                      </span>
                    </button>
                    <div id={`faq-content-${idx}`} className="text-lg text-gray-600 font-light">
                      {faq.answer}
                    </div>
                  </div>
                ) : (
                  <div className=' px-4'>
                    <button
                    key={faq.question}
                    className="flex items-center justify-between w-full text-left focus:outline-none text-2xl font-light text-[#0f172a] py-8 transition"
                    onClick={() => toggleFAQ(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${idx}`}
                  >
                    <span>{faq.question}</span>
                    <span className="ml-4 text-3xl text-gray-400 transition-transform">
                    <FiChevronDown />
                    </span>
                  </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id='contact' className="pt-16 pb-12" style={{background: '', backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-16 mb-12">
            {/* Left: CTA Content */}
            <div className="flex-[2] flex flex-col items-start">
              <h2 className="text-7xl font-light mb-2 text-white">{translations.cta.title.line1}</h2>
              <h2 className="text-7xl font-light mb-8 text-white">{translations.cta.title.line2}</h2>
              <p className="text-2xl font-light text-white mb-12">{translations.cta.subtitle}</p>
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  if (window.Calendly) {
                    window.Calendly.initPopupWidget({ url: 'https://calendly.com/contact-integrai/30min' });
                  }
                }}
                className="bg-white text-[#0f172a] px-12 py-6 rounded-full font-normal hover:bg-blue-100 transition-all text-lg shadow-lg inline-block text-center"
              >
                {translations.cta.button}
              </a>
            </div>
            {/* Right: Contact Form */}
            <div className="flex-1 flex flex-col justify-center items-center bg-white/10 rounded-3xl p-10 shadow-lg backdrop-blur-md mb-12">
              <form className="w-full max-w-md space-y-4">
                <div>
                  <label htmlFor="name" className="block text-white text-lg font-light mb-2">{translations.cta.form.name}</label>
                  <input type="text" id="name" name="name" required className="w-full px-5 py-3 rounded-2xl bg-white/80 text-[#0f172a] font-light text-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white text-lg font-light mb-2">{translations.cta.form.email}</label>
                  <input type="email" id="email" name="email" required className="w-full px-5 py-3 rounded-2xl bg-white/80 text-[#0f172a] font-light text-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-white text-lg font-light mb-2">{translations.cta.form.message}</label>
                  <textarea id="message" name="message" rows={3} required className="w-full px-5 py-3 rounded-2xl bg-white/80 text-[#0f172a] font-light text-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-300 transition resize-none" />
                </div>
                <button type="submit" className="w-full bg-white text-[#0f172a] py-4 rounded-2xl font-normal text-lg shadow-md hover:bg-blue-100 transition-all border-2 border-white">{translations.cta.form.button}</button>
              </form>
            </div>
          </div>
          <span className="border-t w-full text-[24vw] font-normal text-white opacity-100 leading-none whitespace-nowrap mt-8">
                IntegrAI
              </span>
          <div className="mt-16 pt-6 text-center">
            <span className="text-white text-sm">{translations.footer.copyright}</span>
          </div>
        </div>
      </section>
    </main>
  );
} 