'use client';
import { FiZap, FiSmile, FiClock, FiDollarSign, FiBarChart2, FiTrendingUp, FiPlus, FiX, FiShield, FiRepeat, FiSettings, FiArrowRight, FiCheckCircle, FiRefreshCw, FiCode, FiServer, FiBarChart, FiEdit3, FiMessageCircle } from 'react-icons/fi';
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react';

const faqs = [
  {
    question: 'What solutions does IntegrAI offer?',
    answer: 'IntegrAI provides AI-powered analytics, automation, security, and real-time insights to streamline business operations.'
  },
  {
    question: 'How quickly can I get started?',
    answer: 'You can get started within minutes. Our onboarding process is fast and easy.'
  },
  {
    question: 'Can I customize IntegrAI for my needs?',
    answer: 'Absolutely! IntegrAI is designed to be flexible and customizable to fit your unique business requirements.'
  },
  {
    question: 'Do you provide support & updates?',
    answer: 'Yes, we offer 24/7 support and regular updates to ensure your operations run smoothly.'
  },
  {
    question: 'What are the pricing options?',
    answer: 'We offer a range of pricing plans to suit businesses of all sizes. Contact us for a custom quote.'
  }
];

const analyzingPills = [
  { label: 'System check', color: 'bg-purple-200 text-purple-800' },
  { label: 'Process check', color: 'bg-gray-200 text-gray-800' },
  { label: 'Speed check', color: 'bg-blue-200 text-blue-800' },
  { label: 'Manual work', color: 'bg-yellow-100 text-yellow-800' },
  { label: 'Repetitive task', color: 'bg-green-100 text-green-800' },
  { label: 'Performance', color: 'bg-pink-100 text-pink-800' },
];

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

function AnimatedPills() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((o) => (o + 1) % analyzingPills.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);
  // Show 3 pills at a time, looped
  const visible = [0, 1, 2].map(i => analyzingPills[(i + offset) % analyzingPills.length]);
  return (
    <div className="relative w-full flex items-center h-12 overflow-hidden">
      {/* Gradient fade left */}
      <div className="absolute left-0 top-0 h-full w-8 z-10 bg-gradient-to-r from-[#f3f4f6] to-transparent pointer-events-none" />
      {/* Gradient fade right */}
      <div className="absolute right-0 top-0 h-full w-8 z-10 bg-gradient-to-l from-[#f3f4f6] to-transparent pointer-events-none" />
      <div className="flex gap-4 w-full justify-center transition-all duration-700">
        {visible.map((pill, i) => (
          <span key={pill.label} className={`px-5 py-2 rounded-full font-semibold shadow-sm text-base ${pill.color} transition-all`}>{pill.label}</span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // For process animation
  const processSteps = [
    {
      icon: <FiBarChart className="text-3xl text-[#f87171]" />, // Peach
      iconBg: 'bg-[#fde4dd]',
      title: 'Smart Analyzing',
      desc: 'We assess your needs and identify AI solutions to streamline workflows and improve efficiency.'
    },
    {
      icon: <FiEdit3 className="text-3xl text-[#34d399]" />, // Mint
      iconBg: 'bg-[#d1fae5]',
      title: 'AI Development',
      desc: 'Our team builds intelligent automation systems tailored to your business processes.'
    },
    {
      icon: <FiClock className="text-3xl text-[#a78bfa]" />, // Lavender
      iconBg: 'bg-[#ede9fe]',
      title: 'Seamless Integration',
      desc: 'We smoothly integrate AI solutions into your existing infrastructure with minimal disruption.'
    },
    {
      icon: <FiMessageCircle className="text-3xl text-[#a78bfa]" />, // Lavender
      iconBg: 'bg-[#f3e8ff]',
      title: 'Continuous Optimization',
      desc: 'We refine performance, analyze insights, and enhance automation for long-term growth.'
    },
  ];
  const processRefs = useStaggeredFadeIn(processSteps.length);

  return (
    <main className="min-h-screen bg-integrai-warm font-sans">
      {/* Hero Section */}
      <section className="pt-32 pb-32 min-h-[70vh] relative flex items-center" style={{background: '', backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
        <div className="absolute inset-0  pointer-events-none z-0" />
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:items-start justify-between gap-12 relative z-10">
          {/* Left: Title */}
          <div className="flex-[2] flex flex-col justify-center items-start">
            <h1 className="text-6xl md:text-8xl text-white font-light leading-tight mb-0 tracking-tight" style={{lineHeight: '1.05'}}>
              Innovative AI 
            </h1>
            <h1 className="text-6xl md:text-8xl text-white font-light leading-tight mb-0 tracking-tight" style={{lineHeight: '1.05'}}>
              Solutions to Grow
            </h1>
            <h1 className="text-6xl md:text-8xl text-white font-light leading-tight mb-0 tracking-tight" style={{lineHeight: '1.05'}}>
              Your Business
            </h1>
          </div>
          {/* Right: Subtitle and Buttons */}
          <div className="flex-[1] flex flex-col items-end justify-center w-full md:w-auto mt-80">
            <p className="text-2xl md:text-3xl text-white mb-10 max-w-md text-right font-light">
              IntegrAI brings AI automation to your fingertips & streamline tasks.
            </p>
            <div className="flex gap-6 w-full md:w-auto justify-end">
              <button className="bg-white text-[#0f172a] px-10 py-4 rounded-full font-normal text-lg shadow-md hover:bg-blue-100 transition-all border-2 border-white">
                Get in touch
              </button>
              <button className="bg-transparent text-white px-10 py-4 rounded-full font-normal text-lg border-2 border-white hover:bg-blue-100 hover:text-[#0f172a] transition-all">
                View services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Partner Section */}
      <section className="pt-32 pb-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-16 items-start mb-20">
            {/* Left: Large Heading */}
            <div className="flex-1">
              <h2 className="text-6xl md:text-7xl font-light text-[#0f172a] leading-tight mb-0">Your Strategic<br />Partner in Business</h2>
            </div>
            {/* Right: Paragraphs and Link */}
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-xl text-gray-900 mb-8 font-light">
                At IntegrAI, we warmly invite you to arrange an in-depth consultation designed to thoroughly examine the intricacies of your business. In this extensive session, we will dive into a multitude of topics, including cutting-edge growth strategies specifically crafted for your industry, detailed financial planning that aligns seamlessly with your objectives, and innovative approaches to boost operational efficiency.
              </p>
              <p className="text-xl text-gray-900 mb-8 font-light">
                Our team of highly experienced professionals is committed to delivering tailored advice that addresses your distinct needs and ambitions. We aim to ensure that you depart with not only actionable insights but also a clear roadmap to drive your business toward success.
              </p>
              <a href="#" className="inline-flex items-center text-lg text-[#0f172a] font-medium border-b border-[#0f172a] w-max hover:opacity-80 transition group">
                Learn More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b pb-36 border-gray-200 pt-16">
            <div>
              <div className="text-5xl md:text-6xl font-light text-[#0f172a] mb-2">100%</div>
              <div className="text-lg text-gray-600 font-light">Strategies for Business<br />Growth and Market Expansion</div>
            </div>
            <div className="border-l border-gray-200 pl-8">
              <div className="text-5xl md:text-6xl font-light text-[#0f172a] mb-2">90%</div>
              <div className="text-lg text-gray-600 font-light">Global Corporations and<br />Multinational Enterprises</div>
            </div>
            <div className="border-l border-gray-200 pl-8">
              <div className="text-5xl md:text-6xl font-light text-[#0f172a] mb-2">10k</div>
              <div className="text-lg text-gray-600 font-light">Companies collaborate to<br />achieve goals and innovate.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Modern Card Grid with Visuals */}
      <section className="pb-32 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-7xl text-[#0f172a] mb-8 text-center font-light">Our Simple, Smart, and Scalable Process</h2>
          <p className="text-2xl font-light text-[#0f172a] mb-20 text-center">We design, develop, and implement automation tools that help you work smarter, not harder</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <div key={step.title} className="rounded-3xl bg-[#f6f6f6] p-8 flex flex-col items-start shadow-sm h-full">
                <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-6 ${step.iconBg}`}>{step.icon}</div>
                <h3 className="text-4xl font-light text-gray-900 mb-2">{step.title}</h3>
                <div className="flex-grow" />
                <p className="text-gray-900 font-light leading-relaxed mt-12">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-7xl font-light text-center mb-2 text-white">The Key Benefits of AI</h2>
            <h2 className="text-7xl font-light text-center mb-8 text-white">For Your Business Growth</h2>
            <p className="text-2xl text-gray-300 text-center max-w-2xl font-light mb-20">
              Discover how AI automation enhances efficiency, reduces costs, and drives business growth with smarter, faster processes.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            <div className="bg-[#18181b] border border-gray-800 rounded-3xl p-10 shadow-lg hover:bg-[#23232a] transition-all relative overflow-hidden">
              <FiZap className="text-white text-3xl mb-6" />
              <h3 className="text-4xl font-light mb-12 text-white">Increased Productivity</h3>
              <div className="flex-grow" />
              <p className="text-gray-300 font-light text-lg">Gain actionable insights with AI-driven analytics to improve decision-making and strategy.</p>
            </div>
            <div className="bg-[#18181b] border border-gray-800 rounded-3xl p-10 shadow-lg hover:bg-[#23232a] transition-all relative overflow-hidden">
              <FiSmile className="text-white text-3xl mb-6" />
              <h3 className="text-4xl font-light mb-12 text-white">Better Customer Experience</h3>
              <div className="flex-grow" />
              <p className="text-gray-300 font-light text-lg">Personalized AI interactions improve response times, customer engagement, and overall satisfaction.</p>
            </div>
            <div className="bg-[#18181b] border border-gray-800 rounded-3xl p-10 shadow-lg hover:bg-[#23232a] transition-all relative overflow-hidden">
              <FiClock className="text-white text-3xl mb-6" />
              <h3 className="text-4xl font-light text-white">Availability</h3>
              <h3 className="text-4xl font-light mb-12 text-white">24/7</h3>
              <div className="flex-grow" />
              <p className="text-gray-300 font-light text-lg">AI-powered systems operate around the clock, ensuring seamless support and execution without downtime.</p>
            </div>
            <div className="bg-[#18181b] border border-gray-800 rounded-3xl p-10 shadow-lg hover:bg-[#23232a] transition-all relative overflow-hidden">
              <FiDollarSign className="text-white text-3xl mb-6" />
              <h3 className="text-4xl font-light mb-12 text-white">Cost Reduction</h3>
              <div className="flex-grow" />
              <p className="text-gray-300 font-light text-lg">AI automation minimizes manual work, cuts operational costs, and optimizes resource allocation.</p>
            </div>
            <div className="bg-[#18181b] border border-gray-800 rounded-3xl p-10 shadow-lg hover:bg-[#23232a] transition-all relative overflow-hidden">
              <FiBarChart2 className="text-white text-3xl mb-6" />
              <h3 className="text-4xl font-light mb-12 text-white">Data-Driven Insights</h3>
              <div className="flex-grow" />
              <p className="text-gray-300 font-light text-lg">Leverage AI to analyze vast data sets, identify trends, and make smarter business decisions.</p>
            </div>
            <div className="bg-[#18181b] border border-gray-800 rounded-3xl p-10 shadow-lg hover:bg-[#23232a] transition-all relative overflow-hidden">
              <FiTrendingUp className="text-white text-3xl mb-6" />
              <h3 className="text-4xl font-light mb-12 text-white">Scalability & Growth</h3>
              <div className="flex-grow" />
              <p className="text-gray-300 font-light text-lg">AI adapts to your business needs, allowing you to scale efficiently without increasing workload.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            {/* Left: Heading & Description */}
            <div className="flex-1 mb-12 md:mb-0">
              <h2 className="text-6xl md:text-7xl font-light text-[#0f172a] leading-tight mb-6">Frequently<br />Asked Question</h2>
              <p className="text-xl text-gray-500 font-light">Here are some frequently asked questions with answers to clarify doubts.</p>
            </div>
            {/* Right: FAQ Accordion */}
            <div className="flex-1 w-full max-w-xl mx-auto divide-y divide-gray-200">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return isOpen ? (
                  <div key={faq.question} className="rounded-2xl bg-gray-100 px-8 pt-8 pb-6 mb-2">
                    <button
                      className="flex items-center justify-between w-full text-left focus:outline-none text-2xl font-light text-[#0f172a] mb-4"
                      onClick={() => toggleFAQ(idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-content-${idx}`}
                    >
                      <span>{faq.question}</span>
                      <span className="ml-4 text-3xl text-gray-400 transition-transform" style={{transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}}>
                        ▼
                      </span>
                    </button>
                    <div id={`faq-content-${idx}`} className="text-lg text-gray-600 font-light">
                      {faq.answer}
                    </div>
                  </div>
                ) : (
                  <button
                    key={faq.question}
                    className="flex items-center justify-between w-full text-left focus:outline-none text-2xl font-light text-[#0f172a] py-8 hover:bg-gray-50 transition"
                    onClick={() => toggleFAQ(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${idx}`}
                  >
                    <span>{faq.question}</span>
                    <span className="ml-4 text-3xl text-gray-400 transition-transform">
                      ▼
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-32 pb-12" style={{background: '', backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
        <div className="container mx-auto px-4">
          <div className="flex-[2] flex flex-col justify-center items-start">
            <h2 className="text-7xl font-light mb-2 text-white">Let AI do the Work</h2>
            <h2 className="text-7xl font-light mb-8 text-white">So you can Scale Faster</h2>
            <p className="text-2xl font-light text-white mb-12">Book a Call Today and Start Automating</p>
            <button className="bg-white text-[#0f172a] px-12 py-6 rounded-full font-normal hover:bg-blue-100 transition-all text-lg shadow-lg mb-12">
              Book a free call
            </button>
            <span className="border-t w-full text-[24vw]  font-normal text-white opacity-100 leading-none whitespace-nowrap mt-8">
              IntegrAI
            </span>
          </div>
      
        </div><div className="mt-16 pt-6 text-center">
      <span className="text-white text-sm">©2025 IntegrAI. ©2025 All Rights Reserved.</span>
      </div>
      </section>
    </main>
  )
} 