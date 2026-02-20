/**
 * Mock data — Home page
 * Team members, advisors, aims, collaborations
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  initials: string;
  avatarBg: string;
  photoSrc?: string;          // profile photo e.g. "/team/name.jpg"
  universityLogoSrc?: string; // institution badge e.g. "/logos/mahidol.png"
}

export interface Advisor {
  id: string;
  name: string;
  title: string;
  institution: string;
  initials: string;
  avatarBg: string;
  photoSrc?: string;
  universityLogoSrc?: string;
}

export interface Aim {
  id: string;
  title: string;
  description: string;
  icon: "database" | "signal" | "pediatric" | "open";
}

export interface Collaborator {
  id: string;
  name: string;
  shortName: string;
  country: string;
  /** Path to logo image in /public (e.g. "/logos/mahidol.png"). Omit to show text fallback. */
  logoSrc?: string;
}

// ── Research Team (23 members) ────────────────────────────────────────────────
// To add a real photo: set photoSrc: "/team/filename.jpg"
// To add a university badge: set universityLogoSrc: "/logos/filename.png"

export const researchTeam: TeamMember[] = [
  { id: "t1",  name: "Assoc. Prof. Somchai Rattanawimon", role: "Principal Investigator",       affiliation: "Mahidol University",        initials: "SR", avatarBg: "bg-brand-blue-700",  universityLogoSrc: "/logos/mahidol.png" },
  { id: "t2",  name: "Dr. Nattaporn Chaisiri",            role: "Co-Investigator",              affiliation: "Chulalongkorn University",  initials: "NC", avatarBg: "bg-brand-green-700", universityLogoSrc: "/logos/chula_logo.png" },
  { id: "t3",  name: "Dr. Wipawan Thongkum",              role: "Pharmacovigilance Researcher", affiliation: "Mahidol University",        initials: "WT", avatarBg: "bg-brand-blue-500",  universityLogoSrc: "/logos/mahidol.png" },
  { id: "t4",  name: "Pakamon Sriwichai, M.Pharm.",       role: "Data Scientist",               affiliation: "VISTEC",                    initials: "PS", avatarBg: "bg-brand-green-500", universityLogoSrc: "/logos/vistec.png" },
  { id: "t5",  name: "Anan Boontham, Ph.D.",              role: "Bioinformatics Engineer",      affiliation: "Mahidol University",        initials: "AB", avatarBg: "bg-brand-blue-700",  universityLogoSrc: "/logos/mahidol.png" },
  { id: "t6",  name: "Siriporn Klinkesorn",               role: "Clinical Pharmacist",          affiliation: "Ramathibodi Hospital",      initials: "SK", avatarBg: "bg-brand-green-700", universityLogoSrc: "/logos/mahidol.png" },
  { id: "t7",  name: "Dr. Thanawat Phuangphet",           role: "ML/AI Researcher",             affiliation: "VISTEC",                    initials: "TP", avatarBg: "bg-brand-blue-700",  universityLogoSrc: "/logos/vistec.png" },
  { id: "t8",  name: "Wanida Charoenkul, M.Sc.",          role: "Cheminformatics Researcher",   affiliation: "Silpakorn University",      initials: "WC", avatarBg: "bg-brand-green-700", universityLogoSrc: "/logos/silpakorn.png" },
  { id: "t9",  name: "Dr. Paweena Suksangpleng",          role: "Medicinal Chemist",            affiliation: "Chulalongkorn University",  initials: "PS", avatarBg: "bg-brand-blue-500",  universityLogoSrc: "/logos/chula_logo.png" },
  { id: "t10", name: "Nontawat Charoenpit, Ph.D.",        role: "Deep Learning Engineer",       affiliation: "VISTEC",                    initials: "NC", avatarBg: "bg-brand-green-500", universityLogoSrc: "/logos/vistec.png" },
  { id: "t11", name: "Dr. Suphakarn Techamahasaranon",    role: "Structural Bioinformatician",  affiliation: "Mahidol University",        initials: "ST", avatarBg: "bg-brand-blue-700",  universityLogoSrc: "/logos/mahidol.png" },
  { id: "t12", name: "Kanokwan Patimaworachart",          role: "Pharmaceutical Scientist",     affiliation: "Silpakorn University",      initials: "KP", avatarBg: "bg-brand-green-700", universityLogoSrc: "/logos/silpakorn.png" },
  { id: "t13", name: "Dr. Apirak Poungpairoj",            role: "Drug Discovery Researcher",    affiliation: "NCI Thailand",              initials: "AP", avatarBg: "bg-brand-blue-500",  universityLogoSrc: "/logos/nci.png" },
  { id: "t14", name: "Rattana Boonklang, M.Pharm.",       role: "Clinical Pharmacologist",      affiliation: "GPO Thailand",              initials: "RB", avatarBg: "bg-brand-green-500", universityLogoSrc: "/logos/gpo.png" },
  { id: "t15", name: "Dr. Chayanit Sirisatien",           role: "Cancer Biology Researcher",    affiliation: "NCI Thailand",              initials: "CS", avatarBg: "bg-brand-blue-700",  universityLogoSrc: "/logos/nci.png" },
  { id: "t16", name: "Patchara Thanapongsathorn",         role: "Bioinformatics Analyst",       affiliation: "Chulalongkorn University",  initials: "PT", avatarBg: "bg-brand-green-700", universityLogoSrc: "/logos/chula_logo.png" },
  { id: "t17", name: "Dr. Jirapan Sirisawang",            role: "Computational Chemist",        affiliation: "Mahidol University",        initials: "JS", avatarBg: "bg-brand-blue-500",  universityLogoSrc: "/logos/mahidol.png" },
  { id: "t18", name: "Nareerat Sripreechacharn",          role: "Data Engineer",                affiliation: "PTT / Innobic",             initials: "NS", avatarBg: "bg-brand-green-500", universityLogoSrc: "/logos/ptt.png" },
  { id: "t19", name: "Dr. Wei Zhang",                    role: "Drug Target Prediction",       affiliation: "Changhai Hospital",         initials: "WZ", avatarBg: "bg-brand-blue-700",  universityLogoSrc: "/logos/changhai.png" },
  { id: "t20", name: "Kanjana Phromrat, Ph.D.",           role: "Toxicology Researcher",        affiliation: "Silpakorn University",      initials: "KP", avatarBg: "bg-brand-green-700", universityLogoSrc: "/logos/silpakorn.png" },
  { id: "t21", name: "Dr. Orawan Kongkiatpaiboon",        role: "Natural Products Researcher",  affiliation: "Silpakorn University",      initials: "OK", avatarBg: "bg-brand-blue-500",  universityLogoSrc: "/logos/silpakorn.png" },
  { id: "t22", name: "Thanakrit Wongcharoen, M.Sc.",      role: "Software Engineer",            affiliation: "VISTEC",                    initials: "TW", avatarBg: "bg-brand-green-500", universityLogoSrc: "/logos/vistec.png" },
  { id: "t23", name: "Dr. Penporn Kachornsamruay",        role: "Molecular Docking Specialist", affiliation: "Mahidol University",        initials: "PK", avatarBg: "bg-brand-blue-700",  universityLogoSrc: "/logos/mahidol.png" },
];

// ── Advisory Team ─────────────────────────────────────────────────────────────

export const advisoryTeam: Advisor[] = [
  {
    id: "a1",
    name: "Prof. John A. Hartigan",
    title: "Professor of Pharmacoepidemiology",
    institution: "Harvard Medical School, USA",
    initials: "JH",
    avatarBg: "bg-brand-blue-700",
    universityLogoSrc: "/logos/harvard.svg",
  },
  {
    id: "a2",
    name: "Prof. Yoko Tanaka",
    title: "Director, Drug Safety Division",
    institution: "Osaka University, Japan",
    initials: "YT",
    avatarBg: "bg-brand-green-700",
    universityLogoSrc: "/logos/osaka.svg",
  },
  {
    id: "a3",
    name: "Dr. Manon Leclerc",
    title: "Head of Signal Detection",
    institution: "WHO Collaborating Centre, France",
    initials: "ML",
    avatarBg: "bg-brand-blue-500",
    universityLogoSrc: "/logos/who.svg",
  },
];

// ── Aims ──────────────────────────────────────────────────────────────────────

export const aims: Aim[] = [
  {
    id: "aim1",
    icon: "database",
    title: "Build a Comprehensive ADR Database",
    description:
      "Curate, normalize, and structure adverse drug reaction data from the FDA FAERS dataset covering over 71,000 case reports across adult and pediatric populations (2012–2025).",
  },
  {
    id: "aim2",
    icon: "signal",
    title: "Detect Drug–ADR Signals",
    description:
      "Apply quantitative signal detection methods (PRR, ROR) to identify statistically significant associations between drugs and adverse reactions from spontaneous reporting data.",
  },
  {
    id: "aim3",
    icon: "pediatric",
    title: "Focus on Pediatric Pharmacovigilance",
    description:
      "Establish a dedicated pediatric ADR resource using NICHD age classifications to address the critical gap in drug safety evidence for children and adolescents.",
  },
  {
    id: "aim4",
    icon: "open",
    title: "Enable Open-Access Exploration",
    description:
      "Provide a public-facing platform for researchers and clinicians to interactively search, filter, and visualize ADR data to support evidence-based decision-making.",
  },
];

// ── Collaborators ─────────────────────────────────────────────────────────────

export const collaborators: Collaborator[] = [
  {
    id: "c1",
    shortName: "MU",
    name: "Mahidol University",
    country: "Thailand",
    logoSrc: "/logos/mahidol.png",
  },
  {
    id: "c2",
    shortName: "CU",
    name: "Chulalongkorn University",
    country: "Thailand",
    logoSrc: "/logos/chula_logo.png",
  },
  {
    id: "c3",
    shortName: "SU",
    name: "Silpakorn University",
    country: "Thailand",
    logoSrc: "/logos/silpakorn.png",
  },
  {
    id: "c4",
    shortName: "NCI",
    name: "National Cancer Institute Thailand",
    country: "Thailand",
    logoSrc: "/logos/nci.png",
  },
  {
    id: "c5",
    shortName: "GPO",
    name: "Government Pharmaceutical Organization",
    country: "Thailand",
    logoSrc: "/logos/gpo.png",
  },
  {
    id: "c6",
    shortName: "PTT",
    name: "PTT Public Company Limited",
    country: "Thailand",
    logoSrc: "/logos/ptt.png",
  },
  {
    id: "c7",
    shortName: "VISTEC",
    name: "Vidyasirimedhi Institute of Science and Technology",
    country: "Thailand",
    logoSrc: "/logos/vistec.png",
  },
  {
    id: "c8",
    shortName: "DMB",
    name: "Drug Management Bureau",
    country: "Thailand",
    logoSrc: "/logos/dmb.png",
  },
  {
    id: "c9",
    shortName: "Changhai",
    name: "Changhai Hospital, Naval Medical University",
    country: "China",
    logoSrc: "/logos/changhai.png",
  },
  // To add more partners: drop a PNG/SVG into /public/logos/ and add an entry here
];

// ── Pipeline steps (Research Diagram) ─────────────────────────────────────────

export const pipelineSteps = [
  { id: "p1", label: "FAERS\nRaw Data",    icon: "📥", color: "brand-blue-700" },
  { id: "p2", label: "Data\nCleaning",     icon: "🧹", color: "brand-blue-500" },
  { id: "p3", label: "ADR\nExtraction",    icon: "🔬", color: "brand-blue-500" },
  { id: "p4", label: "Signal\nDetection",  icon: "📊", color: "brand-green-700" },
  { id: "p5", label: "Database\n& API",    icon: "🗄️",  color: "brand-green-700" },
  { id: "p6", label: "Open\nPlatform",     icon: "🌐", color: "brand-green-500" },
];
