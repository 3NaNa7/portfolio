export const projects = [
  {
    slug: 'findme',
    name: 'FindMe',
    status: 'early',
    tagline: 'The first app I ever built.',
    description:
      'A simple real-time location sharing app — share your position with friends, watch it update live, and get it converted into a readable address via the Google Maps API. Not much UI polish, but everything here taught me how apps actually work.',
    tech: [
      'Google Maps API',
      'Real-time updates',
      'Geocoding',
    ],
    repoUrl: 'https://github.com/3NaNa7/FindMe',
    repoPrivate: false,
    screenshot: '/projects/findme/1.png',
  },
  {
    slug: 'afrisign',
    name: 'AfriSign',
    status: 'paused',
    tagline:
      'Sign language translation — paused, not abandoned.',
    description:
      "Built as a research assistant on the AfriSign project: the full frontend for a sign language machine translation app. My contract ended before the frontend could be wired up to the translation model, so the app works but doesn't yet talk to any AI. Next step: find an open sign-language model on Hugging Face or GitHub and finish the connection myself.",
    tech: [
      'Flutter',
      'ML model integration (in progress)',
    ],
    repoUrl: 'https://github.com/3NaNa7/afrisign',
    repoPrivate: false,
    screenshot: '/projects/afrisign/1.png',
  },
  {
    slug: 'dialogi',
    name: 'Dialogi',
    status: 'flagship',
    tagline:
      'Real-time audio rooms for academic discussion.',
    description:
      'Join a default room or spin up your own, drop in on a live conversation the way you would on a call, and talk through whatever academic topic brought you there. Real-time audio is powered by Agora, with Firebase handling auth and data underneath.',
    tech: [
      'Agora.io',
      'Firebase',
      'Firebase Auth',
      'Provider',
    ],
    repoUrl: 'https://github.com/3NaNa7/dialogi',
    repoPrivate: false,
    screenshot: '/projects/dialogi/1.jpg',
  },
  {
    slug: 'reproplan',
    name: 'ReproPlan',
    status: 'flagship',
    tagline:
      'Anonymous SRHR guidance for Ghanaian youth.',
    description:
      'An AI-powered, fully anonymous platform for sexual and reproductive health information. A local-and-cloud LLM chatbot answers questions privately, and OpenStreetMap routes users to their nearest clinic when they need one.',
    tech: [
      'Local + cloud LLM',
      'Supabase',
      'OpenStreetMap',
      'Riverpod',
    ],
    repoUrl: null,
    repoPrivate: true,
    screenshot: '/projects/reproplan/1.png',
  },
];
