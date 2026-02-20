# database-schema.md
# Database Schema Design (PostgreSQL) สำหรับระบบ ADR/FAERS

เอกสารนี้เป็นแนวทางออกแบบฐานข้อมูล PostgreSQL สำหรับระบบ CanDrugAI  
รองรับทั้ง Dashboard Visualization และ DrugSearch (table search)

เป้าหมายหลัก:
- รองรับข้อมูลขนาดใหญ่ (ล้าน rows)
- query เร็ว (filter/sort/pagination)
- รองรับ many-to-many ของ FAERS
- ใช้ schema ที่ normalize แต่ยืดหยุ่นต่อการขยาย

---

## 1) Concept สำคัญของข้อมูล FAERS
### 1.1 ความสัมพันธ์หลัก
- 1 safetyreportid (1 report/case) มีหลาย drugs
- 1 safetyreportid มีหลาย reactions
- drugs และ reactions เป็น many-to-many ผ่าน report

ดังนั้น database ต้องมี association tables

---

## 2) Tables หลักที่ต้องมี (Core Tables)

---

# 2.1 reports
ตารางหลักของ report/case

### Fields
- safetyreportid TEXT PRIMARY KEY
- index_date DATE
- patient_sex TEXT  (เช่น "M", "F", "UNK")
- age_years NUMERIC
- nichd TEXT  (เช่น infancy, toddler, early_childhood...)
- serious BOOLEAN

serious flags:
- congenital_anomali BOOLEAN
- death BOOLEAN
- disabling BOOLEAN
- hospitalization BOOLEAN
- life_threatening BOOLEAN
- other BOOLEAN

additional fields:
- reporter_qualification TEXT (optional)
- drug_indication TEXT (optional)
- drug_administration TEXT (optional)

### Notes
- reports เป็นตารางที่ query บ่อยมาก (filter by sex/age/nichd/serious/date)

---

# 2.2 drugs
ตาราง drug master (normalized ingredient)

### Fields
- id BIGSERIAL PRIMARY KEY
- ingredient TEXT UNIQUE NOT NULL

### Notes
- ingredient เป็น normalized active ingredient
- ใช้เป็น key หลักในการ search/filter

---

# 2.3 medicinal_products (optional but recommended)
เก็บชื่อ product แบบ raw

### Fields
- id BIGSERIAL PRIMARY KEY
- medicinal_product TEXT NOT NULL

### Notes
- ถ้าไม่แยก table นี้ สามารถเก็บ medicinal_product เป็น TEXT ใน association table ได้
- แต่แยกไว้ช่วยลด duplication ได้ถ้าข้อมูลใหญ่มาก

---

# 2.4 reactions
ตาราง MedDRA Preferred Term (PT)

### Fields
- id BIGSERIAL PRIMARY KEY
- reaction_meddrapt TEXT UNIQUE NOT NULL

optional mapping:
- meddra_concept_id TEXT
- meddra_concept_code TEXT
- meddra_hlt_names TEXT
- meddra_hlgt_names TEXT
- meddra_soc_names TEXT

### Notes
- reaction_meddrapt เป็น key หลักในการ search/filter

---

## 3) Association Tables (Many-to-Many)

---

# 3.1 report_drugs
เชื่อม report กับ drug

### Fields
- id BIGSERIAL PRIMARY KEY
- safetyreportid TEXT NOT NULL REFERENCES reports(safetyreportid) ON DELETE CASCADE
- drug_id BIGINT NOT NULL REFERENCES drugs(id) ON DELETE CASCADE
- medicinal_product TEXT (raw product name, optional)
- drug_characterization TEXT (optional)

### Unique constraint
- UNIQUE(safetyreportid, drug_id, medicinal_product)

### Notes
- 1 report สามารถมีหลาย drug
- medicinal_product อาจซ้ำ/สะกดต่างกันได้

---

# 3.2 report_reactions
เชื่อม report กับ reaction

### Fields
- id BIGSERIAL PRIMARY KEY
- safetyreportid TEXT NOT NULL REFERENCES reports(safetyreportid) ON DELETE CASCADE
- reaction_id BIGINT NOT NULL REFERENCES reactions(id) ON DELETE CASCADE
- reaction_outcome TEXT (optional)

### Unique constraint
- UNIQUE(safetyreportid, reaction_id)

---

## 4) ตารางเสริมสำหรับ Dashboard (Optional แต่แนะนำ)
ระบบ dashboard จะ query aggregation บ่อย ดังนั้นแนะนำให้มี table หรือ materialized view สำหรับ summary

---

# 4.1 signal_pairs (optional for future)
ตารางเก็บ drug-reaction pairs ที่คำนวณแล้ว (PRR/ROR)

### Fields
- id BIGSERIAL PRIMARY KEY
- drug_id BIGINT REFERENCES drugs(id)
- reaction_id BIGINT REFERENCES reactions(id)

counts:
- a BIGINT
- b BIGINT
- c BIGINT
- d BIGINT

metrics:
- prr NUMERIC
- prr_ci_lower NUMERIC
- ror NUMERIC
- ror_ci_lower NUMERIC

metadata:
- dataset_mode TEXT (adult/pediatric)
- updated_at TIMESTAMP

### Notes
- ถ้าคำนวณ PRR/ROR บ่อยควร precompute ไว้
- ลด load query ใน production

---

## 5) Index Strategy (สำคัญมาก)
Index ที่แนะนำเพื่อ performance:

### reports table
- INDEX(index_date)
- INDEX(patient_sex)
- INDEX(nichd)
- INDEX(age_years)
- INDEX(serious)

### serious flags (ถ้า query บ่อย)
- INDEX(death)
- INDEX(hospitalization)
- INDEX(life_threatening)

### drugs table
- UNIQUE INDEX(ingredient)

### reactions table
- UNIQUE INDEX(reaction_meddrapt)

### report_drugs
- INDEX(safetyreportid)
- INDEX(drug_id)
- INDEX(drug_id, safetyreportid)

### report_reactions
- INDEX(safetyreportid)
- INDEX(reaction_id)
- INDEX(reaction_id, safetyreportid)

### Full-text Search (optional future)
ถ้าต้องการ search เร็ว:
- ใช้ PostgreSQL GIN index (tsvector) บน ingredient/reaction_meddrapt

---

## 6) Dataset Mode (Adult / Pediatric) จะจัดการยังไง?
มี 2 แนวทาง:

### Option A (แนะนำง่ายสุด)
แยก dataset เป็น 2 schema หรือ 2 database:
- candrug_adult
- candrug_pediatric

ข้อดี:
- query ง่าย
- ไม่มี filter dataset_mode

ข้อเสีย:
- ดูแล 2 ชุด

### Option B (ยืดหยุ่นสุด)
เพิ่ม column dataset_mode ใน reports:
- dataset_mode TEXT CHECK ('adult','pediatric')

ข้อดี:
- table เดียว query ง่าย
- dashboard filter dataset_mode ได้

ข้อเสีย:
- table ใหญ่ขึ้น

แนะนำ: ใช้ Option B เพราะ frontend มี toggle adult/pediatric

---

## 7) Normalization & Data Cleaning Rules
- ingredient ต้อง normalized (lowercase, trim, remove duplicates)
- reaction_meddrapt ต้อง normalized (consistent casing)
- safetyreportid ต้อง unique และไม่ซ้ำ
- missing age_years ให้เก็บ NULL
- patient_sex missing ให้เก็บ "UNK"

---

## 8) Query Patterns ที่ต้องรองรับ
### Dashboard
- COUNT reports grouped by seriousness flags
- COUNT grouped by sex
- COUNT grouped by age bucket
- COUNT unique ingredient/reaction
- COUNT unique drug-reaction pairs

### Search
- filter by ingredient/reaction
- join report_drugs + report_reactions + reports
- sort + pagination

---

## 9) สรุป Key Constraints
- reports.safetyreportid เป็น primary key
- report_drugs และ report_reactions เป็น association table หลัก
- ต้องมี indexes สำหรับ filter columns เสมอ
- dataset_mode ต้องรองรับ toggle UI
