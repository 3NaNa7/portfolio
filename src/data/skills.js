export const skillCategories = [
  { id: 'web',       label: 'Web',                color: 'teal'  },
  { id: 'mobile',    label: 'Mobile',             color: 'amber' },
  { id: 'languages', label: 'Languages',          color: 'teal'  },
  { id: 'data-infra',label: 'Data & Infra',       color: 'amber' },
  { id: 'research',  label: 'Research & Science', color: 'teal'  },
];

export const skills = [
  // ── Web ──────────────────────────────────────────────────────────────────
  { name: 'React',                       category: 'web',        tier: 'primary'   },
  { name: 'Next.js',                     category: 'web',        tier: 'primary'   },
  { name: 'Astro',                       category: 'web',        tier: 'primary'   },
  { name: 'TypeScript',                  category: 'web',        tier: 'primary'   },
  { name: 'Node.js/Express',             category: 'web',        tier: 'primary'   },
  { name: 'Tailwind CSS',                category: 'web',        tier: 'primary'   },
  { name: 'HTML',                        category: 'web',        tier: 'secondary' },
  { name: 'CSS',                         category: 'web',        tier: 'secondary' },
  { name: 'JavaScript',                  category: 'web',        tier: 'secondary' },
  { name: 'Bootstrap',                   category: 'web',        tier: 'secondary' },
  { name: 'REST API design & integration', category: 'web',      tier: 'secondary' },
  { name: 'GraphQL',                     category: 'web',        tier: 'secondary' },
  { name: 'NextAuth.js',                 category: 'web',        tier: 'secondary' },
  { name: 'Webpack',                     category: 'web',        tier: 'secondary' },

  // ── Mobile ───────────────────────────────────────────────────────────────
  { name: 'Flutter',                     category: 'mobile',     tier: 'primary'   },

  // ── Languages ────────────────────────────────────────────────────────────
  { name: 'C++',                         category: 'languages',  tier: 'primary'   },
  { name: 'Java',                        category: 'languages',  tier: 'primary'   },
  { name: 'Python',                      category: 'languages',  tier: 'primary'   },
  { name: 'SQL',                         category: 'languages',  tier: 'secondary' },
  { name: 'Bash',                        category: 'languages',  tier: 'secondary' },
  { name: 'The next time you visit, you should find more :)',
                                         category: 'languages',  tier: 'secondary', special: true },

  // ── Data & Infra ─────────────────────────────────────────────────────────
  { name: 'PostgreSQL',                  category: 'data-infra', tier: 'primary'   },
  { name: 'Firebase',                    category: 'data-infra', tier: 'primary'   },
  { name: 'Supabase',                    category: 'data-infra', tier: 'primary'   },
  { name: 'Git',                         category: 'data-infra', tier: 'primary'   },
  { name: 'Docker',                      category: 'data-infra', tier: 'primary'   },
  { name: 'MySQL',                       category: 'data-infra', tier: 'secondary' },
  { name: 'MongoDB',                     category: 'data-infra', tier: 'secondary' },
  { name: 'Linux/command line',          category: 'data-infra', tier: 'secondary' },
  { name: 'GitHub Actions',             category: 'data-infra', tier: 'secondary' },
  { name: 'AWS (S3/EC2)',               category: 'data-infra', tier: 'secondary' },
  { name: 'Vercel',                      category: 'data-infra', tier: 'secondary' },

  // ── Research & Science ───────────────────────────────────────────────────
  { name: 'LaTeX',                       category: 'research',   tier: 'secondary' },
  { name: 'Overleaf',                    category: 'research',   tier: 'secondary' },
  { name: 'Data Analysis',              category: 'research',   tier: 'secondary' },
  { name: 'Scientific Writing',          category: 'research',   tier: 'secondary' },
  { name: 'Matlab',                      category: 'research',   tier: 'secondary' },
  { name: 'Pandas/NumPy',               category: 'research',   tier: 'secondary' },
  { name: 'Jupyter',                     category: 'research',   tier: 'secondary' },
];
