/**
 * MedDRA System Organ Class (SOC) map data — 27 official groups
 * socCode matches SOC_TOP_PTS keys in mock/soc-pt.ts (SOC_01 … SOC_27)
 *
 * Coordinate space: 3143 × 7792 (matches public/body.svg viewBox)
 *   Body is a single skin-tone path translated at (1530, 117) inside the SVG.
 *   Centre x ≈ 1571, body occupies y ≈ 117 → 7760.
 *   Dots INSIDE the silhouette = anatomical region.
 *   Dots OUTSIDE the silhouette = systemic / abstract category.
 *
 * Colours: design-system tokens only (globals.css @theme).
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export type SocCategory =
  | "neuro"    // Neurological / sensory   → brand-blue-700
  | "cardio"   // Cardiovascular / blood   → outcome-de (crimson)
  | "digest"   // Digestive / metabolic    → outcome-lt (amber)
  | "immune"   // Immune / endocrine       → brand-green-700
  | "msk"      // Musculoskeletal / skin   → outcome-ds (orange)
  | "repro"    // Reproductive / urinary   → outcome-ca (violet)
  | "general"; // General / administrative → neutral-600

export interface SocPoint {
  soc: string;          // Key = SOC_01 … SOC_27 (matches mock/soc-pt.ts)
  name: string;         // Full official SOC name
  shortName: string;    // Abbreviated label
  x: number;            // SVG x  (coordinate space 0 – 3143)
  y: number;            // SVG y  (coordinate space 0 – 7792)
  category: SocCategory;
  totalCount: number;   // Sum of top-20 PT counts (used for dot sizing)
}

// ── Category colours (design-system tokens only) ──────────────────────────────

export const SOC_CATEGORY_COLORS: Record<
  SocCategory,
  { fill: string; ring: string; label: string }
> = {
  neuro:   { fill: "#3F51B5", ring: "#6380C3", label: "Neurological & Sensory"   },
  cardio:  { fill: "#DC2626", ring: "#FCA5A5", label: "Cardiovascular & Blood"   },
  digest:  { fill: "#D97706", ring: "#FCD34D", label: "Digestive & Metabolic"    },
  immune:  { fill: "#35A265", ring: "#68BA8C", label: "Immune & Endocrine"       },
  msk:     { fill: "#EA580C", ring: "#FED7AA", label: "Musculoskeletal & Skin"   },
  repro:   { fill: "#7C3AED", ring: "#DDD6FE", label: "Reproductive & Urinary"   },
  general: { fill: "#949CA1", ring: "#E3E3E3", label: "General & Administrative" },
};

// ── 27 SOC Points ─────────────────────────────────────────────────────────────
// Standard 8-head body (head ≈ 974 px tall):
//   Head centre  y ≈  600  |  Neck    y ≈ 1180
//   Chest        y ≈ 1920  |  Navel   y ≈ 2960
//   Hip/crotch   y ≈ 3860  |  Knee    y ≈ 5800
//   Ankle        y ≈ 7100  |  Foot    y ≈ 7700
// Body horizontal centre x = 1571; shoulder-width span ≈ 920–2220

export const SOC_POINTS: SocPoint[] = [

  // ── Head / Neurological ─────────────────────────────────────────────────
  {
    soc: "SOC_17", name: "Nervous System Disorders",
    shortName: "Nervous System",
    x: 1571, y: 340,   // top of cranium, centre
    category: "neuro", totalCount: 25690,
  },
  {
    soc: "SOC_19", name: "Psychiatric Disorders",
    shortName: "Psychiatric",
    x: 1270, y: 540,   // front-left cerebral cortex
    category: "neuro", totalCount: 12800,
  },
  {
    soc: "SOC_06", name: "Eye Disorders",
    shortName: "Eye",
    x: 1360, y: 640,   // left orbit / eye level
    category: "neuro", totalCount: 7080,
  },
  {
    soc: "SOC_04", name: "Ear and Labyrinth Disorders",
    shortName: "Ear & Labyrinth",
    x: 1990, y: 660,   // right ear (pinna)
    category: "neuro", totalCount: 7270,
  },

  // ── Neck / Endocrine ────────────────────────────────────────────────────
  {
    soc: "SOC_05", name: "Endocrine Disorders",
    shortName: "Endocrine",
    x: 1571, y: 1180,  // thyroid / neck
    category: "immune", totalCount: 5940,
  },

  // ── Upper Chest / Cardiopulmonary ───────────────────────────────────────
  {
    soc: "SOC_22", name: "Respiratory, Thoracic and Mediastinal Disorders",
    shortName: "Respiratory",
    x: 1571, y: 1920,  // centre chest / trachea / lungs
    category: "cardio", totalCount: 16360,
  },
  {
    soc: "SOC_02", name: "Cardiac Disorders",
    shortName: "Cardiac",
    x: 1270, y: 2080,  // left chest — heart
    category: "cardio", totalCount: 14420,
  },
  {
    soc: "SOC_26", name: "Vascular Disorders",
    shortName: "Vascular",
    x: 1571, y: 2350,  // aorta / main vessel centre
    category: "cardio", totalCount: 10610,
  },
  {
    soc: "SOC_10", name: "Immune System Disorders",
    shortName: "Immune System",
    x: 1870, y: 1900,  // right chest — thymus / lymph nodes
    category: "immune", totalCount: 7530,
  },

  // ── Right side — outside body (systemic / abstract) ─────────────────────
  {
    soc: "SOC_11", name: "Infections and Infestations",
    shortName: "Infections",
    x: 2420, y: 1760,  // systemic — right of body
    category: "immune", totalCount: 12730,
  },
  {
    soc: "SOC_27", name: "Product Issues",
    shortName: "Product Issues",
    x: 2780, y: 1920,  // abstract — far right upper
    category: "general", totalCount: 11960,
  },

  // ── Left arm (outside body) ─────────────────────────────────────────────
  {
    soc: "SOC_23", name: "Skin and Subcutaneous Tissue Disorders",
    shortName: "Skin & Tissue",
    x: 680,  y: 2080,  // left upper arm / skin
    category: "msk", totalCount: 15160,
  },
  {
    soc: "SOC_15", name: "Musculoskeletal and Connective Tissue Disorders",
    shortName: "Musculoskeletal",
    x: 570,  y: 2750,  // left lower arm / muscle & joint
    category: "msk", totalCount: 13550,
  },

  // ── Right arm (outside body) ────────────────────────────────────────────
  {
    soc: "SOC_12", name: "Injury, Poisoning and Procedural Complications",
    shortName: "Injury & Poisoning",
    x: 2640, y: 2750,  // right arm
    category: "msk", totalCount: 7840,
  },

  // ── Upper Abdomen ───────────────────────────────────────────────────────
  {
    soc: "SOC_01", name: "Blood and Lymphatic System Disorders",
    shortName: "Blood & Lymph",
    x: 1260, y: 2650,  // spleen — left upper abdomen
    category: "cardio", totalCount: 13920,
  },
  {
    soc: "SOC_09", name: "Hepatobiliary Disorders",
    shortName: "Hepatobiliary",
    x: 1890, y: 2700,  // liver — right upper abdomen
    category: "digest", totalCount: 12070,
  },

  // ── Mid Abdomen ─────────────────────────────────────────────────────────
  {
    soc: "SOC_07", name: "Gastrointestinal Disorders",
    shortName: "Gastrointestinal",
    x: 1571, y: 2960,  // stomach / GI tract — centre abdomen
    category: "digest", totalCount: 39340,
  },
  {
    soc: "SOC_14", name: "Metabolism and Nutrition Disorders",
    shortName: "Metabolism & Nutrition",
    x: 1571, y: 3250,  // lower abdomen / metabolic
    category: "digest", totalCount: 10450,
  },

  // ── Left mid-abdomen (kidney) + left abstract ────────────────────────────
  {
    soc: "SOC_20", name: "Renal and Urinary Disorders",
    shortName: "Renal & Urinary",
    x: 1255, y: 3150,  // left kidney
    category: "repro", totalCount: 10750,
  },
  {
    soc: "SOC_16", name: "Neoplasms Benign, Malignant and Unspecified",
    shortName: "Neoplasms",
    x: 430,  y: 3200,  // abstract — left of body
    category: "general", totalCount: 5230,
  },

  // ── Pelvis / Lower Abdomen ──────────────────────────────────────────────
  {
    soc: "SOC_18", name: "Pregnancy, Puerperium and Perinatal Conditions",
    shortName: "Pregnancy & Perinatal",
    x: 1420, y: 3780,  // uterus — lower abdomen centre-left
    category: "repro", totalCount: 2080,
  },
  {
    soc: "SOC_21", name: "Reproductive System and Breast Disorders",
    shortName: "Reproductive System",
    x: 1780, y: 3780,  // ovary / reproductive — lower right
    category: "repro", totalCount: 4095,
  },

  // ── Left side abstract ───────────────────────────────────────────────────
  {
    soc: "SOC_08", name: "General Disorders and Administration Site Conditions",
    shortName: "General Disorders",
    x: 420,  y: 3780,  // abstract — left of body
    category: "general", totalCount: 34440,
  },
  {
    soc: "SOC_13", name: "Investigations",
    shortName: "Investigations",
    x: 260,  y: 4160,  // abstract — far left
    category: "general", totalCount: 14250,
  },

  // ── Right side abstract ──────────────────────────────────────────────────
  {
    soc: "SOC_03", name: "Congenital, Familial and Genetic Disorders",
    shortName: "Congenital & Genetic",
    x: 2760, y: 3400,  // abstract — right of body
    category: "general", totalCount: 2840,
  },
  {
    soc: "SOC_25", name: "Surgical and Medical Procedures",
    shortName: "Surgical Procedures",
    x: 2750, y: 3780,  // abstract — right of body
    category: "general", totalCount: 6570,
  },
  {
    soc: "SOC_24", name: "Social Circumstances",
    shortName: "Social Circumstances",
    x: 2750, y: 5600,  // abstract — far right lower
    category: "general", totalCount: 6600,
  },
];
