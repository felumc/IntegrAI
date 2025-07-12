'use client';
import { FiZap, FiSmile, FiClock, FiDollarSign, FiBarChart2, FiTrendingUp, FiChevronDown ,FiBarChart, FiEdit3, FiMessageCircle } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

declare global {
  interface Window {
    Calendly?: any;
  }
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
  
  // Translation hooks for different sections
  const tHero = useTranslations('common.hero');
  const tServices = useTranslations('common.services');
  const tProcess = useTranslations('common.process');
  const tBenefits = useTranslations('common.benefits');
  const tFaq = useTranslations('common.faq');
  const tCta = useTranslations('common.cta');
  const tFooter = useTranslations('common.footer');

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // For process animation
  const processSteps = [
    {
      icon: <FiBarChart className="text-3xl text-[#f87171]" />,
      iconBg: 'bg-[#fde4dd]',
      title: tProcess('steps.analyzing.title'),
      desc: tProcess('steps.analyzing.description')
    },
    {
      icon: <FiEdit3 className="text-3xl text-[#34d399]" />,
      iconBg: 'bg-[#d1fae5]',
      title: tProcess('steps.development.title'),
      desc: tProcess('steps.development.description')
    },
    {
      icon: <FiClock className="text-3xl text-[#a78bfa]" />,
      iconBg: 'bg-[#ede9fe]',
      title: tProcess('steps.integration.title'),
      desc: tProcess('steps.integration.description')
    },
    {
      icon: <FiMessageCircle className="text-3xl text-[#a78bfa]" />,
      iconBg: 'bg-[#f3e8ff]',
      title: tProcess('steps.optimization.title'),
      desc: tProcess('steps.optimization.description')
    },
  ];

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

  return (
    <main className="min-h-screen bg-integrai-warm font-sans">
      {/* Hero Section */}
      <section id='home' className="pt-32 pb-24 md:pb-32 min-h-[70vh] relative flex items-center" style={{background: '', backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
        <div className="absolute inset-0  pointer-events-none z-0" />
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:items-start justify-between gap-12 relative z-10">
          {/* Left: Title */}
          <div className="flex-[2] flex flex-col justify-center items-start">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-white font-light leading-tight mb-0 tracking-tight" style={{lineHeight: '1.05'}}>
              {tHero('title.line1')}
            </h1>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-white font-light leading-tight mb-0 tracking-tight" style={{lineHeight: '1.05'}}>
              {tHero('title.line2')}
            </h1>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-white font-light leading-tight mb-0 tracking-tight" style={{lineHeight: '1.05'}}>
              {tHero('title.line3')}
            </h1>
          </div>
          {/* Right: Subtitle and Buttons */}
          <div className="flex-[1] flex flex-col items-start md:items-end justify-center w-full md:w-auto mt-8 md:mt-80">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white ml-8 md:ml-0 mr-8 md:mr-0 mb-8 md:mb-10 max-w-md text-justify md:text-right font-light">
              {tHero('subtitle')}
            </p>
            <div className="flex gap-4 md:gap-6 w-full md:w-auto justify-center md:justify-end">
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  if (window.Calendly) {
                    window.Calendly.initPopupWidget({ url: 'https://calendly.com/contact-integrai/30min' });
                  }
                }}
                className="bg-white text-[#0f172a] px-6 py-3 md:px-10 md:py-4 rounded-full font-normal text-base md:text-lg shadow-md hover:bg-blue-100 transition-all border-2 border-white inline-block text-center"
              >
                {tHero('cta')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Partner Section */}
      <section id='services' className="pt-12 md:pt-32 pb-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start mb-16 md:mb-20">
            {/* Left: Large Heading */}
            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light text-[#0f172a] leading-tight mb-0 ml-8 md:ml-0">
                {tServices('heading.line1')}<br/>
                {tServices('heading.line2')}<br/>
                {tServices('heading.line3')}
              </h2>
            </div>
            {/* Right: Paragraphs and Link */}
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-base md:text-xl text-gray-900 mb-6 md:mb-8 font-light ml-8 md:ml-0 mr-8 md:mr-0 text-justify">
                {tServices('description.p1')}
              </p>
              <p className="text-base md:text-xl text-gray-900 mb-6 md:mb-8 font-light ml-8 md:ml-0 mr-8 md:mr-0 text-justify">
                {tServices('description.p2')}
              </p>
              <a href="#benefits" className="inline-flex items-center text-base md:text-lg text-[#0f172a] font-medium border-b border-[#0f172a] w-max hover:opacity-80 transition group ml-8 md:ml-0 mr-8 md:mr-0">
                {tServices('learnMore')} <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
          {/* Stats Row */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0f172a] mb-6 md:mb-8 pt-16 md:pt-24 text-left md:text-center ml-8 md:ml-0 font-light border-t border-gray-200">{tServices('whatWeOffer')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 border-b pb-24 md:pb-36 border-gray-200 pt-12 md:pt-16">
            <div className="flex flex-col h-full ml-4 md:ml-0 mr-8 md:mr-0 text-justify">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-light text-[#0f172a] mb-6 md:mb-12 pl-4 md:pl-0">{tServices('offerings.automation.title')}</div>
              <div className="flex-grow" />
              <div className="text-base md:text-lg text-gray-600 font-light mb-0 pl-4 md:pl-0">{tServices('offerings.automation.description')}</div>
            </div>
            <div className="flex flex-col h-full md:border-l md:border-gray-200 pl-4 md:pl-8 ml-4 md:ml-0 mr-8 md:mr-0 text-justify">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-light text-[#0f172a] mb-6 md:mb-12">{tServices('offerings.assistants.title')}</div>
              <div className="flex-grow" />
              <div className="text-base md:text-lg text-gray-600 font-light mb-0">{tServices('offerings.assistants.description')}</div>
            </div>
            <div className="flex flex-col h-full md:border-l md:border-gray-200 pl-4 md:pl-8 ml-4 md:ml-0 mr-8 md:mr-0 text-justify">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-light text-[#0f172a] mb-6 md:mb-12">{tServices('offerings.integration.title')}</div>
              <div className="flex-grow" />
              <div className="text-base md:text-lg text-gray-600 font-light mb-0">{tServices('offerings.integration.description')}</div>
            </div>
            <div className="flex flex-col h-full md:border-l md:border-gray-200 pl-4 md:pl-8 ml-4 md:ml-0 mr-8 md:mr-0 text-justify">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-light text-[#0f172a] mb-6 md:mb-12">{tServices('offerings.strategy.title')}</div>
              <div className="flex-grow" />
              <div className="text-base md:text-lg text-gray-600 font-light mb-0">{tServices('offerings.strategy.description')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="pb-20 md:pb-32 bg-white">
        <div className="container mx-auto px-12 md:px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-[#0f172a] mb-6 md:mb-8 md:text-center font-light">{tProcess('title')}</h2>
          <p className="text-base md:text-2xl font-light text-[#0f172a] mb-12 md:mb-20 md:text-center text-justify">{tProcess('subtitle')}</p>
          <div className="flex flex-col gap-3 md:gap-8">
            {processSteps.map((step, idx) => (
              <div key={step.title} className="rounded-xl md:rounded-3xl bg-[#f6f6f6] p-4 md:p-8 flex flex-col sm:flex-row items-start shadow-sm w-full text-justify">
                <div className={`w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full mb-3 sm:mb-0 sm:mr-4 md:mr-8 ${step.iconBg}`}>
                  <div className="text-lg md:text-3xl">{step.icon}</div>
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="text-lg md:text-3xl lg:text-4xl font-light text-gray-900 mb-2">{step.title}</h3>
                  <div className="flex-grow" />
                  <p className="text-gray-900 font-light leading-relaxed mt-2 md:mt-12 sm:mt-4 text-sm md:text-lg lg:text-xl">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 md:py-32 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-6 md:mb-8">
            {/* Mobile: Single continuous title */}
            <h2 className="md:hidden text-3xl sm:text-4xl font-light text-left ml-8 mr-8 mb-6 text-white">
              {tBenefits('title.line1')} {tBenefits('title.line2')}
            </h2>
            {/* Desktop: Two separate lines */}
            <h2 className="hidden md:block text-5xl lg:text-7xl font-light text-center mb-2 text-white">{tBenefits('title.line1')}</h2>
            <h2 className="hidden md:block text-5xl lg:text-7xl font-light text-center mb-6 md:mb-8 text-white">{tBenefits('title.line2')}</h2>
            <p className="text-base md:text-2xl text-gray-300 text-center max-w-2xl font-light mb-12 md:mb-20 px-4">
              {tBenefits('subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-10 max-w-7xl mx-auto">
            <div className="bg-[#18181b] border border-gray-800 rounded-xl md:rounded-3xl p-4 md:p-10 shadow-lg hover:bg-[#23232a] transition-all relative overflow-hidden ml-4 md:ml-0 mr-4 md:mr-0">
              <FiZap className="text-white text-xl md:text-3xl mb-3 md:mb-6" />
              <h3 className="text-lg md:text-3xl lg:text-4xl font-light mb-4 md:mb-12 text-white">{tBenefits('items.productivity.title')}</h3>
              <div className="flex-grow" />
              <p className="text-gray-300 font-light text-sm md:text-lg">{tBenefits('items.productivity.description')}</p>
            </div>
            <div className="bg-[#18181b] border border-gray-800 rounded-xl md:rounded-3xl p-4 md:p-10 shadow-lg hover:bg-[#23232a] transition-all relative overflow-hidden ml-4 md:ml-0 mr-4 md:mr-0">
              <FiSmile className="text-white text-xl md:text-3xl mb-3 md:mb-6" />
              <h3 className="text-lg md:text-3xl lg:text-4xl font-light mb-4 md:mb-12 text-white">{tBenefits('items.customerExperience.title')}</h3>
              <div className="flex-grow" />
              <p className="text-gray-300 font-light text-sm md:text-lg">{tBenefits('items.customerExperience.description')}</p>
            </div>
            <div className="bg-[#18181b] border border-gray-800 rounded-xl md:rounded-3xl p-4 md:p-10 shadow-lg hover:bg-[#23232a] transition-all relative overflow-hidden ml-4 md:ml-0 mr-4 md:mr-0">
              <FiClock className="text-white text-xl md:text-3xl mb-3 md:mb-6" />
              <h3 className="text-lg md:text-3xl lg:text-4xl font-light mb-4 md:mb-12 text-white">{tBenefits('items.availability.title')}</h3>
              <div className="flex-grow" />
              <p className="text-gray-300 font-light text-sm md:text-lg">{tBenefits('items.availability.description')}</p>
            </div>
            <div className="bg-[#18181b] border border-gray-800 rounded-xl md:rounded-3xl p-4 md:p-10 shadow-lg hover:bg-[#23232a] transition-all relative overflow-hidden ml-4 md:ml-0 mr-4 md:mr-0">
              <FiDollarSign className="text-white text-xl md:text-3xl mb-3 md:mb-6" />
              <h3 className="text-lg md:text-3xl lg:text-4xl font-light mb-4 md:mb-12 text-white">{tBenefits('items.costReduction.title')}</h3>
              <div className="flex-grow" />
              <p className="text-gray-300 font-light text-sm md:text-lg">{tBenefits('items.costReduction.description')}</p>
            </div>
            <div className="bg-[#18181b] border border-gray-800 rounded-xl md:rounded-3xl p-4 md:p-10 shadow-lg hover:bg-[#23232a] transition-all relative overflow-hidden ml-4 md:ml-0 mr-4 md:mr-0">
              <FiBarChart2 className="text-white text-xl md:text-3xl mb-3 md:mb-6" />
              <h3 className="text-lg md:text-3xl lg:text-4xl font-light mb-4 md:mb-12 text-white">{tBenefits('items.insights.title')}</h3>
              <div className="flex-grow" />
              <p className="text-gray-300 font-light text-sm md:text-lg">{tBenefits('items.insights.description')}</p>
            </div>
            <div className="bg-[#18181b] border border-gray-800 rounded-xl md:rounded-3xl p-4 md:p-10 shadow-lg hover:bg-[#23232a] transition-all relative overflow-hidden ml-4 md:ml-0 mr-4 md:mr-0">
              <FiTrendingUp className="text-white text-xl md:text-3xl mb-3 md:mb-6" />
              <h3 className="text-lg md:text-3xl lg:text-4xl font-light mb-4 md:mb-12 text-white">{tBenefits('items.scalability.title')}</h3>
              <div className="flex-grow" />
              <p className="text-gray-300 font-light text-sm md:text-lg">{tBenefits('items.scalability.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id='about' className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 ">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
            {/* Left: Heading & Description */}
            <div className="flex-1 mb-8 md:mb-0">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light text-[#0f172a] leading-tight mb-4 md:mb-6 ml-8 md:ml-0 mr-8 md:mr-0">{tFaq('title')}</h2>
              <p className="text-base md:text-xl text-gray-500 font-light ml-8 md:ml-0 mr-8 md:mr-0">{tFaq('subtitle')}</p>
            </div>
            {/* Right: FAQ Accordion */}
            <div className="flex-1 w-full max-w-xl md:mx-auto ml-8 pr-16 md:pr-0  divide-y divide-gray-200 md:ml-0">
              {/* We need to handle FAQ items differently since it's an array */}
              {Array.from({ length: 5 }, (_, idx) => {
                const isOpen = openIndex === idx;
                return isOpen ? (
                  <div key={idx} className="rounded-xl md:rounded-2xl bg-gray-100 px-3 md:px-4 pt-6 md:pt-8 pb-4 md:pb-6 mb-2">
                    <button
                      className="flex items-center justify-between w-full text-left focus:outline-none text-lg md:text-2xl font-light text-[#0f172a] mb-3 md:mb-4"
                      onClick={() => toggleFAQ(idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-content-${idx}`}
                    >
                      <span>{tFaq(`items.item${idx}.question`)}</span>
                      <span className="ml-4 text-2xl md:text-3xl text-gray-400 transition-transform" style={{transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}}>
                      <FiChevronDown />
                      </span>
                    </button>
                    <div id={`faq-content-${idx}`} className="text-base md:text-lg text-gray-600 font-light">
                      {tFaq(`items.item${idx}.answer`)}
                    </div>
                  </div>
                ) : (
                  <div className='px-3 md:px-4' key={idx}>
                    <button
                    className="flex items-center justify-between w-full text-left focus:outline-none text-lg md:text-2xl font-light text-[#0f172a] py-6 md:py-8 transition"
                    onClick={() => toggleFAQ(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${idx}`}
                  >
                    <span>{tFaq(`items.item${idx}.question`)}</span>
                    <span className="ml-4 text-2xl md:text-3xl text-gray-400 transition-transform">
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
      <section id='contact' className="pt-12 md:pt-16 pb-8 md:pb-12" style={{background: '', backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 mb-8 md:mb-12">
            {/* Left: CTA Content */}
            <div className="flex-[2] flex flex-col items-start">
              {/* Mobile: Single continuous title */}
              <h2 className="md:hidden text-3xl sm:text-4xl font-light mb-6 text-white ml-8 mr-8">
                {tCta('title.line1')} {tCta('title.line2')}
              </h2>
              {/* Desktop: Two separate lines */}
              <h2 className="hidden md:block text-5xl lg:text-7xl font-light mb-2 text-white">{tCta('title.line1')}</h2>
              <h2 className="hidden md:block text-5xl lg:text-7xl font-light mb-6 md:mb-8 text-white">{tCta('title.line2')}</h2>
              <p className="text-lg md:text-2xl font-light text-white mb-8 md:mb-12 ml-8 md:ml-0 mr-8 md:mr-0">{tCta('subtitle')}</p>
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  if (window.Calendly) {
                    window.Calendly.initPopupWidget({ url: 'https://calendly.com/contact-integrai/30min' });
                  }
                }}
                className="bg-white text-[#0f172a] px-8 py-4 md:px-12 md:py-6 rounded-full font-normal hover:bg-blue-100 transition-all text-base md:text-lg shadow-lg inline-block text-center ml-8 md:ml-0 mr-8 md:mr-0"
              >
                {tCta('button')}
              </a>
            </div>
            {/* Right: Contact Form */}
            <div className="flex-1 flex flex-col justify-center items-center bg-white/10 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-lg backdrop-blur-md mb-8 md:mb-12 ml-8 md:ml-0 mr-8 md:mr-0">
              <form className="w-full max-w-md space-y-3 md:space-y-4" onSubmit={(e) => {
                e.preventDefault();
                const nameInput = document.getElementById('name') as HTMLInputElement;
                const emailInput = document.getElementById('email') as HTMLInputElement;
                const messageInput = document.getElementById('message') as HTMLTextAreaElement;
                
                const name = nameInput?.value || '';
                const email = emailInput?.value || '';
                const message = messageInput?.value || '';
                
                // Only include the name in the subject, and only the message in the body
                const subject = `Contact from ${name}`;
                
                // Open email client with just the message in the body
                window.location.href = `mailto:contact@integrai.com.mx?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
              }}>
                <div>
                  <label htmlFor="name" className="block text-white text-base md:text-lg font-light mb-2">{tCta('form.name')}</label>
                  <input type="text" id="name" name="name" required className="w-full px-4 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl bg-white/80 text-[#0f172a] font-light text-base md:text-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white text-base md:text-lg font-light mb-2">{tCta('form.email')}</label>
                  <input type="email" id="email" name="email" required className="w-full px-4 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl bg-white/80 text-[#0f172a] font-light text-base md:text-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-white text-base md:text-lg font-light mb-2">{tCta('form.message')}</label>
                  <textarea id="message" name="message" rows={3} required className="w-full px-4 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl bg-white/80 text-[#0f172a] font-light text-base md:text-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-300 transition resize-none" />
                </div>
                <button type="submit" className="w-full bg-white text-[#0f172a] py-3 md:py-4 rounded-xl md:rounded-2xl font-normal text-base md:text-lg shadow-md hover:bg-blue-100 transition-all border-2 border-white">{tCta('form.button')}</button>
              </form>
            </div>
          </div>
          <span className="border-t w-full text-[22vw] md:text-[24vw] font-normal text-white opacity-100 leading-none whitespace-nowrap mt-6 md:mt-8 ml-8 md:ml-0 mr-8 md:mr-0">
                IntegrAI
              </span>
          <div className="mt-12 md:mt-16 pt-4 md:pt-6 text-center ml-8 md:ml-0 mr-8 md:mr-0">
            <span className="text-white text-sm">{tFooter('copyright')}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
