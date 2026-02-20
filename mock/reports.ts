/**
 * Mock data — DrugSearch & Report Detail
 * Shape: docs/api-contract.md sections 3.1 / 4.1
 *
 * กฎ: ห้าม import ไฟล์นี้ใน component/page โดยตรง
 *     ให้เรียกผ่าน lib/api.ts เท่านั้น
 */

import type { ReportRow, ReportListResponse, ReportDetail } from "@/lib/types";

// ── 3.1 /api/search/reports ───────────────────────────────────────────────────

export const mockReportRows: ReportRow[] = [
  {
    safetyreportid: "10000001", ingredient: "ibuprofen",     medicinal_product: "ADVIL",
    reaction_meddrapt: "Nausea",              nichd: "late_adolescence",  patient_sex: "M",
    age_years: 17, serious: true,  serious_type: "HL", drug_indication: "Pain",
    drug_administration: "oral",  index_date: "2023-04-12",
  },
  {
    safetyreportid: "10000002", ingredient: "metformin",     medicinal_product: "GLUCOPHAGE",
    reaction_meddrapt: "Lactic acidosis",     nichd: "late_adolescence",  patient_sex: "F",
    age_years: 16, serious: true,  serious_type: "LT", drug_indication: "Type 2 Diabetes",
    drug_administration: "oral",  index_date: "2022-11-05",
  },
  {
    safetyreportid: "10000003", ingredient: "amoxicillin",   medicinal_product: "AMOXIL",
    reaction_meddrapt: "Rash",                nichd: "middle_childhood",  patient_sex: "M",
    age_years: 8,  serious: false, serious_type: "OT", drug_indication: "Infection",
    drug_administration: "oral",  index_date: "2024-01-20",
  },
  {
    safetyreportid: "10000004", ingredient: "atorvastatin",  medicinal_product: "LIPITOR",
    reaction_meddrapt: "Myopathy",            nichd: "late_adolescence",  patient_sex: "M",
    age_years: 19, serious: true,  serious_type: "DS", drug_indication: "Hyperlipidemia",
    drug_administration: "oral",  index_date: "2023-09-01",
  },
  {
    safetyreportid: "10000005", ingredient: "sertraline",    medicinal_product: "ZOLOFT",
    reaction_meddrapt: "Suicidal ideation",   nichd: "early_adolescence", patient_sex: "F",
    age_years: 13, serious: true,  serious_type: "LT", drug_indication: "Depression",
    drug_administration: "oral",  index_date: "2024-03-15",
  },
  {
    safetyreportid: "10000006", ingredient: "warfarin",      medicinal_product: "COUMADIN",
    reaction_meddrapt: "Haemorrhage",         nichd: "late_adolescence",  patient_sex: "M",
    age_years: 18, serious: true,  serious_type: "HL", drug_indication: "Thrombosis",
    drug_administration: "oral",  index_date: "2023-07-22",
  },
  {
    safetyreportid: "10000007", ingredient: "lisinopril",    medicinal_product: "ZESTRIL",
    reaction_meddrapt: "Angioedema",          nichd: "late_adolescence",  patient_sex: "F",
    age_years: 17, serious: true,  serious_type: "LT", drug_indication: "Hypertension",
    drug_administration: "oral",  index_date: "2024-02-10",
  },
  {
    safetyreportid: "10000008", ingredient: "omeprazole",    medicinal_product: "PRILOSEC",
    reaction_meddrapt: "Headache",            nichd: "middle_childhood",  patient_sex: "F",
    age_years: 10, serious: false, serious_type: "OT", drug_indication: "GERD",
    drug_administration: "oral",  index_date: "2023-12-01",
  },
  {
    safetyreportid: "10000009", ingredient: "metoprolol",    medicinal_product: "LOPRESSOR",
    reaction_meddrapt: "Fatigue",             nichd: "late_adolescence",  patient_sex: "M",
    age_years: 15, serious: false, serious_type: "OT", drug_indication: "Arrhythmia",
    drug_administration: "oral",  index_date: "2022-08-18",
  },
  {
    safetyreportid: "10000010", ingredient: "aspirin",       medicinal_product: "BAYER ASPIRIN",
    reaction_meddrapt: "Gastrointestinal bleeding", nichd: "early_adolescence", patient_sex: "M",
    age_years: 12, serious: true,  serious_type: "HL", drug_indication: "Fever",
    drug_administration: "oral",  index_date: "2023-05-30",
  },
  {
    safetyreportid: "10000011", ingredient: "amoxicillin",   medicinal_product: "AMOXIL",
    reaction_meddrapt: "Anaphylaxis",         nichd: "toddler",           patient_sex: "F",
    age_years: 3,  serious: true,  serious_type: "LT", drug_indication: "Otitis media",
    drug_administration: "oral",  index_date: "2024-06-05",
  },
  {
    safetyreportid: "10000012", ingredient: "ibuprofen",     medicinal_product: "MOTRIN",
    reaction_meddrapt: "Renal impairment",    nichd: "middle_childhood",  patient_sex: "M",
    age_years: 9,  serious: true,  serious_type: "HL", drug_indication: "Fever",
    drug_administration: "oral",  index_date: "2023-10-14",
  },
  {
    safetyreportid: "10000013", ingredient: "clopidogrel",   medicinal_product: "PLAVIX",
    reaction_meddrapt: "Thrombocytopenia",    nichd: "late_adolescence",  patient_sex: "M",
    age_years: 19, serious: true,  serious_type: "DS", drug_indication: "Stroke prevention",
    drug_administration: "oral",  index_date: "2023-03-22",
  },
  {
    safetyreportid: "10000014", ingredient: "levothyroxine", medicinal_product: "SYNTHROID",
    reaction_meddrapt: "Palpitations",        nichd: "early_adolescence", patient_sex: "F",
    age_years: 14, serious: false, serious_type: "OT", drug_indication: "Hypothyroidism",
    drug_administration: "oral",  index_date: "2024-01-08",
  },
  {
    safetyreportid: "10000015", ingredient: "azithromycin",  medicinal_product: "ZITHROMAX",
    reaction_meddrapt: "Diarrhoea",           nichd: "infancy",           patient_sex: "F",
    age_years: 1,  serious: false, serious_type: "OT", drug_indication: "Pneumonia",
    drug_administration: "oral",  index_date: "2022-09-11",
  },
  {
    safetyreportid: "10000016", ingredient: "sertraline",    medicinal_product: "ZOLOFT",
    reaction_meddrapt: "Insomnia",            nichd: "middle_childhood",  patient_sex: "M",
    age_years: 11, serious: false, serious_type: "OT", drug_indication: "OCD",
    drug_administration: "oral",  index_date: "2024-04-19",
  },
  {
    safetyreportid: "10000017", ingredient: "metformin",     medicinal_product: "GLUMETZA",
    reaction_meddrapt: "Nausea",              nichd: "late_adolescence",  patient_sex: "F",
    age_years: 16, serious: false, serious_type: "OT", drug_indication: "Type 2 Diabetes",
    drug_administration: "oral",  index_date: "2023-11-28",
  },
  {
    safetyreportid: "10000018", ingredient: "atorvastatin",  medicinal_product: "LIPITOR",
    reaction_meddrapt: "Elevated liver enzymes", nichd: "late_adolescence", patient_sex: "F",
    age_years: 18, serious: true,  serious_type: "HL", drug_indication: "Familial hypercholesterolemia",
    drug_administration: "oral",  index_date: "2024-05-07",
  },
  {
    safetyreportid: "10000019", ingredient: "warfarin",      medicinal_product: "JANTOVEN",
    reaction_meddrapt: "Epistaxis",           nichd: "early_adolescence", patient_sex: "M",
    age_years: 13, serious: false, serious_type: "OT", drug_indication: "DVT",
    drug_administration: "oral",  index_date: "2022-12-15",
  },
  {
    safetyreportid: "10000020", ingredient: "simvastatin",   medicinal_product: "ZOCOR",
    reaction_meddrapt: "Rhabdomyolysis",      nichd: "late_adolescence",  patient_sex: "M",
    age_years: 17, serious: true,  serious_type: "HL", drug_indication: "Hypercholesterolemia",
    drug_administration: "oral",  index_date: "2023-08-09",
  },
];

export const mockReportListResponse: ReportListResponse = {
  total_count: 71944,
  page: 1,
  page_size: 10,
  results: mockReportRows,
};

// ── 4.1 /api/reports/{safetyreportid} ────────────────────────────────────────

export const mockReportDetail: ReportDetail = {
  safetyreportid: "10000001",
  dataset_mode: "pediatric",
  index_date: "2023-04-12",
  patient: { patient_sex: "M", age_years: 17, nichd: "late_adolescence" },
  serious: true,
  serious_flags: { CA: false, DE: false, DS: false, HL: true, LT: false, OT: false },
  drug_indication: "Pain",
  drug_administration: "oral",
  drugs: [{ ingredient: "ibuprofen", medicinal_product: "ADVIL" }],
  reactions: [
    { reaction_meddrapt: "Nausea", meddra_soc_names: "Gastrointestinal disorders" },
  ],
};
