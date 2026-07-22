// ─── Simple Icons (react-icons/si) ───────────────────────────────────────────
import {
  SiReact,
  SiNextdotjs,
  SiAstro,
  SiTypescript,
  SiNodedotjs,
  SiTailwindcss,
  SiHtml5,
  SiCss,           // SiCss3 does not exist in this version — correct name is SiCss
  SiJavascript,
  SiBootstrap,
  SiGraphql,
  SiSwagger,
  SiWebpack,
  SiFlutter,
  SiCplusplus,
  SiOpenjdk,
  SiPython,
  SiPostgresql,
  SiFirebase,
  SiSupabase,
  SiGit,
  SiDocker,
  SiMysql,
  SiMongodb,
  SiLinux,
  SiGithubactions,
  // SiAmazonwebservices does not exist in installed react-icons/si — using FaCloud below
  SiVercel,
  SiLatex,
  SiOverleaf,
  SiPandas,
  SiJupyter,
  // Note: SiMatlab does not exist in react-icons/si — using FaFlask below
} from 'react-icons/si';

// ─── Font Awesome (react-icons/fa) — generic / conceptual icons ───────────────
import {
  FaDatabase,   // SQL — language, not a vendor
  FaTerminal,   // Bash — shell / command line feel
  FaChartBar,   // Data Analysis
  FaBookOpen,   // Scientific Writing
  FaFlask,      // Matlab — scientific computing stand-in
  FaCloud,      // AWS (S3/EC2) — generic cloud services
  FaLock,       // NextAuth.js — Auth.js fallback
} from 'react-icons/fa';

// ─── Icon map: skill name (exact) → React component ──────────────────────────
// The `special: true` entry ("The next time you visit…") is intentionally
// omitted — SkillsGrid renders it as text-only.
export const skillIcons = {
  // Web — primary
  'React':                         SiReact,
  'Next.js':                       SiNextdotjs,
  'Astro':                         SiAstro,
  'TypeScript':                    SiTypescript,
  'Node.js/Express':               SiNodedotjs,
  'Tailwind CSS':                  SiTailwindcss,

  // Web — secondary
  'HTML':                          SiHtml5,
  'CSS':                           SiCss,
  'JavaScript':                    SiJavascript,
  'Bootstrap':                     SiBootstrap,
  'REST API design & integration': SiSwagger,       // OpenAPI/Swagger — standard REST tooling
  'GraphQL':                       SiGraphql,
  'NextAuth.js':                   FaLock,           // No SiAuthjs in this react-icons version
  'Webpack':                       SiWebpack,

  // Mobile
  'Flutter':                       SiFlutter,

  // Languages — primary
  'C++':                           SiCplusplus,
  'Java':                          SiOpenjdk,       // OpenJDK — standard stand-in (Oracle trademark)
  'Python':                        SiPython,

  // Languages — secondary
  'SQL':                           FaDatabase,      // Generic DB language icon, not a vendor
  'Bash':                          FaTerminal,      // Shell / terminal feel

  // Data & Infra — primary
  'PostgreSQL':                    SiPostgresql,
  'Firebase':                      SiFirebase,
  'Supabase':                      SiSupabase,
  'Git':                           SiGit,
  'Docker':                        SiDocker,

  // Data & Infra — secondary
  'MySQL':                         SiMysql,
  'MongoDB':                       SiMongodb,
  'Linux/command line':            SiLinux,
  'GitHub Actions':               SiGithubactions,
  'AWS (S3/EC2)':                 FaCloud,           // No Amazon/AWS icon in installed react-icons/si
  'Vercel':                        SiVercel,

  // Research & Science — secondary
  'LaTeX':                         SiLatex,
  'Overleaf':                      SiOverleaf,
  'Data Analysis':                FaChartBar,      // Generic analytics icon
  'Scientific Writing':            FaBookOpen,      // Academic writing icon
  'Matlab':                        FaFlask,         // No SiMatlab in react-icons/si
  'Pandas/NumPy':                 SiPandas,
  'Jupyter':                       SiJupyter,
};
