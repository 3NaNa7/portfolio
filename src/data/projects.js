export const projects = [
  {
    slug: 'findme',
    name: 'FindMe',
    tagline: 'Real-time location sharing.',
    description:
      'I wanted to answer a simple question: “Where are you right now?” So I built FindMe, a mobile app that live-tracks your location with friends and turns mysterious, moving coordinates into actual addresses. It was my first real experiment in mobile development, and it gave me the thrill of taking an idea from a blank screen to a working, real-time app.',
    tech: [
      'Google Maps SDK',
      'Firebase',
      'Flutter',
    ],
    repoUrl: 'https://github.com/3NaNa7/FindMe',
    repoPrivate: false,
    screenshot: '/projects/findme/1.png',
  },
  {
    slug: 'afrisign',
    name: 'AfriSign',
    tagline:
      'The Screen where AI meets Sign Language.',
    description:
      "I didn't build the AI behind AfriSign, but I built the screen it lives on. AfriSign was a research project exploring machine translation across six African sign languages. My contribution was designing and developing the mobile app interface, creating the user-facing experience where people would input signs and receive translations. It was a great exercise in building clean, accessible UI to support complex academic research, which was ultimately published in Discover Artificial Intelligence.",
    tech: ['Flutter', 'Figma'],
    repoUrl: 'https://github.com/3NaNa7/afrisign',
    repoPrivate: false,
    screenshot: '/projects/afrisign/1.png',
  },
  {
    slug: 'dialogi',
    name: 'Dialogi',
    tagline:
      'Real-time Audio Rooms for Academic Discussion.',
    description:
      'I wanted to make academic discussions feel a little less like awkwardly waiting for someone to raise their hand. So I built Dialogi, a real-time audio platform for topic-based student conversations. I led the mobile and backend development, wiring up the live communication. It ended up being adopted by 150+ KNUST Computer Science students, with folks from Math, Physics, and EE jumping in too.',
    tech: ['Agora.io', 'Flutter', 'Firebase'],
    repoUrl: 'https://github.com/3NaNa7/dialogi',
    repoPrivate: false,
    screenshot: '/projects/dialogi/1.jpg',
  },
  {
    slug: 'reproplan',
    name: 'ReproPlan',
    tagline:
      'Anonymous SRHR Guidance for Ghanaian Youth.',
    description:
      "ReproPlan's mission is to make reproductive health information and services easily accessible from a single place. My role is to bring that vision to life by building the core mobile application. I'm developing the key user flows for health info, facility discovery, contraceptive requests, and emergency support, while laying the technical groundwork for upcoming AI-assisted features. The core product and its main flows are already taking shape.",
    tech: [
      'Local LLM',
      'Supabase',
      'OpenStreetMap',
    ],
    repoUrl: null,
    repoPrivate: true,
    screenshot: '/projects/reproplan/1.png',
  },
];
