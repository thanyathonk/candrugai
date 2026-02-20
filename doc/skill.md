# skill.md
# CanDrugAI – ระบบเว็บไซต์เผยแพร่โครงการ + ฐานข้อมูล ADR (FAERS)

## 1) เป้าหมายของระบบ (System Goal)
โปรเจกต์นี้คือเว็บไซต์สำหรับเผยแพร่โครงการ CanDrugAI และเป็นแพลตฟอร์มให้ผู้ใช้เข้ามา "ค้นหาและสำรวจข้อมูล Adverse Drug Reaction (ADR)" จากชุดข้อมูลที่ preprocess แล้วจาก FAERS

ระบบแบ่งเป็น 2 ส่วนหลัก:
1) เว็บไซต์โครงการ (Home Page) เพื่อแสดงข้อมูลโครงการ ทีมงาน และพันธมิตร
2) ระบบฐานข้อมูล ADR (Dashboard + Search Table) เพื่อแสดง visualization และค้นหาข้อมูล

---

## 2) โครงสร้างหน้าเว็บ (Website Pages)
ระบบต้องมีหน้าเว็บหลักดังนี้:

### 2.1 หน้า Home (Project Website)
ใช้เพื่อแสดงข้อมูลเกี่ยวกับโครงการและสร้างความน่าเชื่อถือ

ต้องมี section:
- Hero banner (ชื่อโครงการ + tagline + ปุ่ม CTA)
- Research collaborations logos
- Aims / mission
- Research diagram (infographic)
- Our Research Team
- Our Advisory Team
- Footer + social links

เน้น UI แบบ modern research website: minimal, clean, typography ชัด

---

### 2.2 หน้า ADR Database (Visualization Dashboard)
หน้าแสดงภาพรวม dataset และ visualization ของข้อมูล ADR

ต้องมี:
- Title: Adverse Drug Reaction Database
- Toggle dataset mode:
  - Adult
  - Pediatric

Dashboard KPI Cards:
- CA (Congenital Anomaly)
- DE (Death)
- DS (Disabling)
- HL (Hospitalization)
- LT (Life Threatening)
- OT (Other)

ส่วน Visualization:
- Total Reported Cases พร้อมช่วงปี (เช่น 2012–2025)
- Demographic (male/female/unknown)
- Age distribution chart / blocks
- Data Statistics:
  - จำนวน ADR terms
  - จำนวน Drugs
  - จำนวน Drug-ADR pairs
  - สัดส่วน MedDRA hierarchy (SOC, HLGT, HLT, PT)

---

### 2.3 หน้า DrugSearch (Search + Table)
หน้าแสดงตารางข้อมูลสำหรับค้นหาและกรองข้อมูล

ต้องรองรับ:
- Search bar
- Advanced filters
- Table results (pagination + sorting)
- Click row เพื่อเปิด report detail

Filter ที่ต้องมี:
- ingredient
- medicinal_product
- reaction_meddrapt
- nichd (pediatric group)
- patient_sex
- age range (min/max)
- serious
- serious_type (death/hospitalization/etc.)
- date range (index_date)

Table columns แนะนำ:
- safetyreportid
- ingredient
- medicinal_product
- reaction_meddrapt
- nichd
- patient_sex
- age_years
- serious
- serious_type
- drug_indication
- drug_administration
- index_date

---

## 3) Tech Stack
### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Table: TanStack Table
- Charts: Recharts
- UI เน้น responsive และ clean

### Backend
- FastAPI
- Python 3.10+
- Pydantic
- SQLAlchemy / SQLModel
- Alembic migrations

### Database
- PostgreSQL
- ต้องมี index เพื่อ query เร็ว

---

## 4) Data Model Concept (FAERS / ADR)
ข้อมูลหลัก:
- safetyreportid (case identifier)
- ingredient (normalized)
- medicinal_product (raw drug name)
- reaction_meddrapt (MedDRA PT)
- drug_indication
- drug_administration
- patient_sex
- age_years
- nichd
- index_date
- serious + seriousness subtype flags:
  - congenital_anomali
  - death
  - disabling
  - hospitalization
  - life_threatening
  - other

ข้อสำคัญ:
- 1 safetyreportid มีหลาย drugs
- 1 safetyreportid มีหลาย reactions
- เป็น many-to-many ผ่าน report

---

## 5) กฎการทำงานของระบบ Search
- ต้องรองรับ query string แบบ partial match
- ต้องรองรับ filter แบบ exact match
- ต้องรองรับ pagination + sorting
- response ต้องมี total_count เสมอ

---

## 6) ข้อกำหนดด้าน Performance
- ห้าม query แบบ full scan โดยไม่จำเป็น
- ต้องมี pagination เสมอสำหรับตาราง
- dashboard endpoints ต้องคืนข้อมูลแบบ aggregated ไม่ใช่ raw rows
- ควรใช้ index สำหรับ column ที่ filter บ่อย

---

## 7) ข้อกำหนดด้านความปลอดภัย
- ป้องกัน SQL injection ด้วย ORM
- validate query parameters
- ไม่คืน stack trace ให้ user

---

## 8) ข้อจำกัด (Limitations)
- ระบบนี้ไม่ใช่เครื่องมือวินิจฉัยโรค
- สถิติ signal detection ไม่ได้แปลว่า causation
- FAERS มี reporting bias

---

## 9) กฎการทำงานของ Cursor/AI (สำคัญมาก)
เมื่อสร้างโค้ด:
- ต้องยึด stack Next.js + FastAPI + PostgreSQL เท่านั้น
- ห้ามใช้ MongoDB หรือ NoSQL โดยไม่มีเหตุผล
- ต้องออกแบบ API ให้รองรับ pagination + sorting
- UI ต้อง minimal และ research-like
- ใช้ design system สี+ฟอนต์ตาม docs/design-system.md
