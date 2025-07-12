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

export default Translations;