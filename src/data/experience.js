export const experiences = [
  {
    id: 'sunset-mountain',
    org: 'Sunset Mountain School',
    role: 'Web Developer & IT Support',
    location: 'Kumasi, Ghana (Remote)',
    dateRange: 'Sep 2020 – Oct 2022',
    description:
      "Maintained and enhanced the school's LMS platform during the COVID-era shift to remote learning, improving its reliability and performance while supporting the school's transition to online education. The platform served 500+ students and staff and remained operational throughout the academic year, with ongoing technical issues addressed and resolved as they arose.",
    tech: [
      {
        name: 'Node.js',
        usage:
          'Implemented Socket.io for real-time notifications, allowing students and teachers to receive instant assignment alerts without refreshing the page.',
      },
      {
        name: 'Express.js',
        usage:
          'Set up compression middleware to shrink API payloads, cutting down load times for students on slower internet.',
      },
      {
        name: 'Bootstrap',
        usage:
          'Redesigned the LMS frontend interface for clean mobile responsiveness and easy navigation.',
      },
    ],
  },
  {
    id: 'knust-elearning',
    org: 'KNUST E-learning Centre',
    role: 'Coding & Front-end Development Facilitator',
    location: 'Kumasi, Ghana',
    dateRange: 'May 2024 – Feb 2025',
    description:
      'Facilitated a six-month frontend development bootcamp under the e-HAPPY project, helping 24 agri-food graduates progress from basic computer literacy to building and deploying their own websites. Guided participants through the practical development process and continued providing technical and hosting support after the official programme ended, helping them keep their websites accessible beyond the training period.',
    tech: [
      {
        name: 'HTML5 & CSS3',
        usage:
          'Taught responsive design fundamentals (Flexbox/Grid), enabling students to build mobile-friendly layouts from scratch.',
      },
      {
        name: 'JavaScript',
        usage:
          'Guided students through modern JavaScript (ES6+), focusing on practical DOM manipulation and building interactive UI features.',
      },
      {
        name: 'WordPress',
        usage:
          'Showed students how to rapidly customize themes and manage content, giving them a practical, no-code CMS option for future projects.',
      },
      {
        name: 'GitHub Pages',
        usage:
          'Mentored students on basic Git workflows and deploying their first live static sites via GitHub Pages.',
      },
    ],
  },
  {
    id: 'topmost-tuition',
    org: 'Topmost Tuition Language School',
    role: 'Digital & Technology Consultant',
    location: 'Kumasi, Ghana (Hybrid)',
    dateRange: 'Mar 2025 – Present',
    description:
      "Act as the sole technical lead, evaluating business needs to architect and maintain the school's entire digital ecosystem. Built the website, automated the online registration pipeline, and established remote learning infrastructure. These efforts expanded the school's reach to students across all 16 regions of Ghana and grew its online audience to 40,000+ followers.",
    tech: [
      {
        name: 'Google Workspace Integration',
        usage:
          'Architected a no-code registration pipeline connecting Google Sites, Forms, and Sheets to automate student enrollments.',
      },
      {
        name: 'SEO & Digital Analytics',
        usage:
          'Optimized local search visibility using Google Business and Search Console to drive organic traffic.',
      },
      {
        name: 'EdTech Infrastructure',
        usage:
          "Established the digital learning workflow to enable the school's remote classes.",
      },
    ],
  },
  {
    id: 'reproplan',
    org: 'ReproPlan LTD',
    role: 'Mobile App Developer',
    location: 'Accra, Ghana (Remote)',
    dateRange: 'May 2026 – Present',
    description:
      'Developing the core mobile application for a reproductive health platform, building key user flows including health information access, nearby facility discovery, contraceptive requests, and emergency support. Currently laying the foundation for upcoming AI-assisted features.',
    tech: [
      {
        name: 'Flutter',
        usage:
          "Built the app's UI, handling navigation and complex screens for health info and emergency support.",
      },
      {
        name: 'Riverpod',
        usage:
          'Used it to handle async operations and app-wide state.',
      },
      {
        name: 'Supabase',
        usage:
          'Used Supabase as the backend for auth, database management, and syncing data in real-time across the app.',
      },
      {
        name: 'OpenStreetMap API',
        usage:
          'For location features, allowing users to discover and navigate to nearby reproductive health centers.',
      },
    ],
  },
];
