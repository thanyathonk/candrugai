# repo-structure.md
# โครงสร้างโฟลเดอร์ + รายการไฟล์เอกสาร (สำหรับให้ Cursor อ้างอิง)

เอกสารนี้เป็นแผนผังโครงสร้างโปรเจกต์ ณ ตอนนี้  
จุดประสงค์คือให้ Cursor รู้ว่า “มีไฟล์อะไรบ้าง” และ “ต้องอ้างอิงไฟล์ไหน” เวลา generate UI/โค้ด

> สถานะปัจจุบัน: ทำ UI ด้วย mock data ก่อน (ยังไม่เชื่อม DB จริง)

---

## 1) โครงสร้างโฟลเดอร์ที่แนะนำ (Monorepo)
repo/
├─ docs/                       # เอกสารกำกับงานทั้งหมด (ให้ Cursor อ่านก่อนสร้างโค้ด)
│  ├─ skill.md                 # ขอบเขตระบบ + โครงสร้างหน้าเว็บ + requirements หลัก
│  ├─ design-system.md         # กฎสี/ฟอนต์ (Golos Text + palette ตาม mockup)
│  ├─ ui-pages.md              # รายละเอียด layout ของแต่ละหน้า (Home/Dashboard/Search)
│  ├─ api-contract.md          # รูปแบบ JSON response ที่ frontend จะยึด (ตอนนี้ mock)
│  ├─ database-schema.md       # แนวทาง schema + index (ไว้ใช้ตอนเริ่มต่อ DB จริง)
│  ├─ project-rules.md         # กฎโครงสร้างโค้ด + naming + ข้อห้าม (Cursor MUST FOLLOW)
│  ├─ component-library.md     # “คุม UI หนักสุด” (Card/Button/Table/KPI/Toggle ให้เหมือน mockup)
│  └─ repo-structure.md        # ไฟล์นี้: สรุปว่ามีอะไรบ้าง และ Cursor ต้องทำงานยังไง
│
├─ frontend/                   # Next.js (UI) — ใช้ mock data ก่อน
│  ├─ src/
│  │  ├─ app/
│  │  │  ├─ page.tsx                          # Home (Project Website)
│  │  │  ├─ adr-database/page.tsx             # ADR Dashboard (Visualization)
│  │  │  ├─ drugsearch/page.tsx               # Search + Table
│  │  │  └─ reports/[safetyreportid]/page.tsx # Report detail (ใช้ mock ก่อน)
│  │  │
│  │  ├─ components/
│  │  │  ├─ layout/            # Navbar, Footer, PageContainer
│  │  │  ├─ home/              # Hero, TeamCards, CollaborationLogos, DiagramSection
│  │  │  ├─ dashboard/         # DatasetToggle, KPI cards, Banner, Demographic, AgeDistribution, StatsCards
│  │  │  ├─ table/             # ReportsTable, PaginationBar
│  │  │  └─ filters/           # FilterPanel, FilterChips
│  │  │
│  │  ├─ mock/                 # Mock data (ห้ามฝัง mock ไว้ใน component)
│  │  │  ├─ dashboard.ts       # mock สำหรับหน้า ADR Database
│  │  │  ├─ reports.ts         # mock สำหรับหน้า DrugSearch + Report detail
│  │  │  └─ lookups.ts         # mock list (drugs/reactions) สำหรับ dropdown
│  │  │
│  │  ├─ lib/
│  │  │  ├─ api.ts             # client สำหรับเรียก API (ตอนนี้ชี้ไป mock หรือ future API)
│  │  │  └─ utils.ts
│  │  │
│  │  └─ styles/
│  │     └─ globals.css        # import Golos Text + base styles
│  │
│  ├─ tailwind.config.ts       # map tokens จาก design-system.md (brandBlue/brandGreen/neutral)
│  └─ package.json
│
└─ backend/                    # FastAPI (ยังไม่เริ่มเชื่อม DB ตอนนี้ / optional)
   └─ (จะเริ่มทำภายหลังเมื่อ schema พร้อม)

---

## 2) รายการไฟล์เอกสารที่มีตอนนี้ (Docs Inventory)
เอกสารที่มีและ Cursor ต้องอ้างอิง:

1) docs/skill.md
- ขอบเขตระบบ + หน้าเว็บที่ต้องมี + requirements หลัก

2) docs/design-system.md
- สี + ฟอนต์ (Golos Text) + token rules (ห้ามสีอื่น)

3) docs/ui-pages.md
- layout และองค์ประกอบ UI ของแต่ละหน้า (Home/Dashboard/Search)

4) docs/component-library.md
- รายละเอียด component + spacing + states เพื่อให้ UI เหมือน mockup มากที่สุด

5) docs/api-contract.md
- รูปแบบ response ที่ frontend ต้องยึด (ตอนนี้ใช้ mock data ให้ shape เหมือน API จริง)

6) docs/database-schema.md
- ใช้ตอนเริ่มเชื่อม DB จริง (ยังไม่ทำตอนนี้)

7) docs/project-rules.md
- กฎโครงสร้างโค้ด + naming + ข้อห้าม (Cursor MUST FOLLOW)

8) docs/repo-structure.md
- ไฟล์นี้: สรุปโครงสร้างและ workflow การทำงาน

---

## 3) หลักการทำงานตอนนี้ (Mock First Workflow)
สถานะตอนนี้ยังไม่เชื่อม DB จริง ดังนั้น:
- หน้าเว็บทั้งหมดต้อง render ได้ด้วย mock data
- mock data ต้องอยู่ใน `frontend/src/mock/*` เท่านั้น
- ห้ามสร้าง mock data แบบ hardcode อยู่ใน component
- รูปแบบ mock data ต้องเหมือน API ตาม `docs/api-contract.md`
- เมื่อเริ่มเชื่อม backend จริง จะค่อยเปลี่ยน `src/lib/api.ts` ให้เรียก API

---

## 4) กฎสำหรับ Cursor (ต้องทำตาม)
เมื่อ Cursor สร้าง/แก้โค้ด:
- ต้องอ่าน docs/design-system.md + docs/component-library.md ก่อนเสมอ
- ห้ามใช้สีอื่นนอก palette
- ต้องใช้ Golos Text เป็น font หลัก
- UI ต้อง minimal + research-like + spacing เยอะ
- table ต้องมี pagination + sorting + loading/empty state

---

## 5) เป้าหมายผลลัพธ์ (Acceptance Criteria)
- Home page ดูเป็นเว็บงานวิจัยจริง (modern + clean)
- ADR Database page มี toggle Adult/Pediatric + KPI cards + total banner + demographic + age + statistics
- DrugSearch page มี search bar + filter panel + table + pagination
- ทุกหน้า responsive และ consistent ตาม design system
- mock data สามารถสลับไปใช้ API จริงในอนาคตได้ง่าย (shape เดียวกัน)
