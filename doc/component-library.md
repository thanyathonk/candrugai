# component-library.md
# UI Component Library & Styling Rules (Must Follow)

ไฟล์นี้เป็นกฎ UI Design ที่ละเอียดที่สุดของโปรเจกต์  
Cursor ต้องใช้เป็นมาตรฐานในการสร้าง component ทุกตัว  
เพื่อให้ UI ออกมาสวยแบบ mockup (minimal dashboard + research theme)

---

## 1) เป้าหมาย UI (UI Goal)
เว็บไซต์ต้องมีความรู้สึกแบบ:
- research / biotech / medical dashboard
- minimal
- clean
- modern
- readable
- spacing เยอะ
- card-based layout

UI ต้องดู "พรีเมียมแบบเว็บงานวิจัย" ไม่เหมือน admin dashboard แข็ง ๆ

---

## 2) Layout Standard (โครงสร้างหน้าเว็บ)
### 2.1 Page Container
ทุกหน้าต้องใช้ container เดียวกัน:

- max width: 1200px – 1400px
- padding desktop: 24px – 32px
- padding mobile: 16px
- layout ต้อง centered

### 2.2 Section Spacing
- ระยะห่างระหว่าง section: 48px – 72px
- ระยะห่างระหว่างหัวข้อกับ content: 20px – 28px

### 2.3 Typography Hierarchy
- H1: 42–52px (hero title)
- H2: 28–36px (page title)
- H3: 20–24px (section title)
- Body: 14–16px
- Label: 12–14px

ใช้ font: Golos Text ทั้งหมด (ตาม design-system.md)

---

## 3) Component Tokens (มาตรฐาน UI Tokens)
### 3.1 Border Radius
- Card radius: 16px (rounded-2xl)
- Button radius: 12px–16px
- Input radius: 12px–16px
- Chip radius: 999px (rounded-full)

### 3.2 Shadows
- ใช้ shadow เบาเท่านั้น
- ห้ามใช้ shadow หนักแบบ admin template
- Card shadow: shadow-sm
- Hover card shadow: shadow-md (เบามาก)

### 3.3 Border
- border สี Gray-200 หรือ Gray-300
- ห้ามใช้ border สีดำ

---

## 4) Global Components
ส่วนนี้กำหนดว่า component หลักทุกตัวต้องหน้าตาแบบไหน

---

# 4.1 Navbar (Global Navigation)
### Layout
- background: white
- border-bottom: neutral Gray-200
- สูงประมาณ 64px
- menu ชิดขวา
- logo ชิดซ้าย

### Menu Items
- Home
- Resources
- DrugSearch

### CTA Button (Contact Us)
- background: Blue-700 (#3F51B5)
- text: white
- hover: Blue-500 (#6380C3)
- padding: px-4 py-2
- radius: 999px

Navbar ต้อง sticky ได้ (optional) และต้องดู clean

---

# 4.2 Page Title Header (ใช้ในหน้า ADR Database / DrugSearch)
### Style
- Title ใหญ่ H2
- Subtitle optional สี Gray-600
- มี background hero แบบ gradient เบา ๆ ได้

---

# 4.3 Buttons
### Primary Button
- background: Blue-700
- text: white
- hover: Blue-500
- focus ring: Blue-200
- font weight: 600
- height: 40px–44px

### Secondary Button
- background: white
- border: Gray-300
- text: default
- hover background: Blue-50

### Ghost Button
- ไม่มี border
- hover: Blue-50
- ใช้กับ icon actions

### Disabled State
- opacity: 0.5
- cursor: not-allowed

---

# 4.4 Cards (พื้นฐานของทุก Section)
### Card Base
- background: white
- border: Gray-200
- radius: 16px
- padding: 20px–28px
- shadow-sm

### Card Hover
- shadow-md (เบา)
- border เปลี่ยนเป็น Gray-300

---

# 4.5 Input / Search Bar
### Search Input (หน้า DrugSearch)
ต้องดูเหมือน mockup:
- กว้างประมาณ 520px–720px (desktop)
- center alignment
- border: Gray-200
- background: white
- radius: 16px
- padding: px-5 py-3
- font-size: 16px
- placeholder สี Gray-600
- icon search ซ้าย (optional)

Hover:
- border เป็น Gray-300

Focus:
- ring Blue-200
- border Blue-500

---

# 4.6 Filter Chips (Active Filters)
Active filters ต้องแสดงเป็น chips แบบ minimal:

- background: Blue-50
- border: Blue-200
- text: Blue-700
- radius: rounded-full
- padding: px-3 py-1

ปุ่ม clear filter (x) ต้องเป็น icon เล็ก ๆ

---

# 4.7 Toggle (Adult / Pediatric)
Toggle ต้องเหมือน mockup:
- เป็น 2 ปุ่มใหญ่แบบ segmented control
- มี icon + label

Style:
- container: border Gray-200 + background white
- selected state:
  - background: Blue-50 หรือ Green-50
  - border: Blue-200 หรือ Green-200
  - text bold
- unselected state:
  - background white
  - text Gray-600

---

# 4.8 KPI Card (Outcome Cards CA/DE/DS/HL/LT/OT)
KPI card ต้องเหมือน mockup:
- เป็น card เล็กเรียงแนวนอน 6 ใบ
- มีตัวอักษร label ตัวใหญ่ (CA, DE, ...)
- มี count ตัวเลขด้านล่าง

Style:
- background: white
- border: Gray-200
- radius: 16px
- padding: 18px–22px
- shadow-sm
- text align: center

Typography:
- label: 20px–24px (bold)
- count: 16px–18px (semi-bold)

Color Rules:
- CA: Blue-700
- DE: Red tone ไม่ควรใช้แดงสด ให้ใช้ accent หรือใช้ Blue-700 ก็ได้
- DS: Purple/Blue family
- HL: Green-700
- LT: Orange tone (แต่ต้องไม่หลุด palette → ใช้ neutral + highlight)
- OT: Blue-500 หรือ Gray-600

หมายเหตุ: ห้ามเพิ่มสีใหม่แรง ๆ ถ้าจำเป็นให้ใช้ blue/green/gray เท่านั้น

---

# 4.9 Total Reported Cases Banner (แถบยาวกลางหน้า)
Banner ต้องเหมือน mockup:
- เป็น card ยาวเต็มความกว้าง
- มี gradient background (Blue-700 → Green-700)
- มี text สีขาวตรงกลาง

Style:
- height: 72px–96px
- radius: 18px
- font-size: 18px–22px
- font-weight: 600

Example Text:
- "Total Reported Cases : 71,944 (2012 - 2025)"

---

# 4.10 Demographic Cards (Male/Female Sidebar)
ส่วน Male/Female ต้องเหมือน mockup:
- แสดง icon ชัดเจน (male/female)
- ตัวเลขใหญ่
- label อยู่ด้านล่าง

Style:
- layout เป็น column
- icon ใหญ่ 60–90px
- text color ใช้ Blue-700 (male) และ Pink/Neutral (female) แต่ห้ามฉูดฉาด

---

# 4.11 Age Distribution Bars (Row Cards)
Age distribution ต้องแสดงเป็น row cards เช่น:
- label "21-30 Years"
- count ตัวใหญ่
- progress bar ด้านขวา

Style:
- card background: white
- border Gray-200
- radius 16px
- padding 18px–22px

Progress bar:
- base: Gray-200
- fill: Blue-700
- optional highlight: Purple-ish แต่ไม่ควรใช้ถ้าไม่อยู่ใน palette

---

# 4.12 Data Statistics Cards (ADR / Drugs / Drug-ADR pairs)
ต้องเหมือน mockup:
- card 3 ใบเรียง row
- มี title เล็ก ๆ
- มี number ใหญ่
- มี progress bar หรือ breakdown

Style:
- border Gray-200
- radius 16px
- padding 18px–22px

Typography:
- title: 12px–14px Gray-600
- number: 28px–36px bold

---

# 4.13 Table Component (DrugSearch)
Table ต้องดูสะอาดแบบ minimal:

Style:
- header background: Blue-50
- header text: Blue-700
- row hover: Blue-50
- border: Gray-200
- cell padding: 12px–16px
- font-size: 14px–15px

Table must support:
- pagination
- sorting icons
- sticky header (optional)
- loading skeleton rows

---

# 4.14 Pagination Component
Pagination ต้อง minimal:
- previous / next button
- page indicator
- page size dropdown

Style:
- buttons เป็น outline (border Gray-300)
- active page ใช้ Blue-700 background

---

# 4.15 Loading & Empty State
### Loading
- ใช้ skeleton loading แบบ gray shimmer
- ห้ามใช้ spinner อย่างเดียว

### Empty
- มีข้อความชัดเจน:
  - "ไม่พบข้อมูลที่ตรงกับเงื่อนไข"
- มีปุ่ม clear filters

---

## 5) Home Page Components
### 5.1 Hero Banner
Hero ต้องเป็นจุดเด่นสุด:
- background gradient (Blue-700 → Green-700)
- overlay ด้วย molecular pattern
- text สีขาว

Button:
- primary CTA: Explore
- secondary CTA: Secondary (outline)

Hero ต้องสูงประมาณ 420px–520px (desktop)

---

### 5.2 Research Collaboration Logos
- row layout
- spacing เท่ากัน
- grayscale/colored allowed
- responsive

---

### 5.3 Team Cards
Team card style:
- avatar circle
- name bold
- role/affiliation สี Gray-600
- hover: shadow-md

Grid:
- desktop: 4–6 columns
- tablet: 2–3 columns
- mobile: 1 column

---

## 6) Layout Grid Rules (สำคัญมาก)
### Dashboard Layout (หน้า ADR Database)
แนะนำ layout:
1) Toggle row (Adult/Pediatric) อยู่บนสุด
2) KPI cards row 6 ใบ
3) Total banner
4) Demographic + Age distribution:
   - left column: male/female summary
   - right column: age distribution rows
5) Data statistics cards row 3 ใบ

---

## 7) Implementation Rules สำหรับ Cursor
### MUST
- ใช้ Tailwind tokens จาก design-system.md
- ใช้ Golos Text เป็น default
- ใช้ Card-based layout เป็นหลัก
- spacing ต้องเยอะ (อย่าแน่น)
- responsive ต้องครบ

### MUST NOT
- ห้ามใช้ bootstrap
- ห้ามใช้สีใหม่มั่ว
- ห้ามใช้ font อื่น
- ห้ามทำ UI แบบ admin template แข็ง ๆ

---

## 8) Mock Data Rules (ยังไม่เชื่อม DB)
ตอนนี้ระบบยังไม่เชื่อม database จริง  
Frontend ต้องใช้ mock data ในรูปแบบไฟล์ TypeScript เช่น:

- src/mock/dashboard.ts
- src/mock/reports.ts

### Mock Data Requirements
- ต้องมีข้อมูลสำหรับ:
  - dashboard summary
  - demographic distribution
  - age distribution
  - data statistics
  - table results

Mock data ต้องมี format ที่ "เหมือน API จริง" ตาม docs/api-contract.md  
เพื่อให้เปลี่ยนไปใช้ backend จริงได้ง่ายภายหลัง

---

## 9) Naming Standard (Component Names)
ชื่อ component ต้องชัดเจน เช่น:
- Navbar
- HeroSection
- DatasetToggle
- OutcomeKpiCard
- TotalCasesBanner
- DemographicSummary
- AgeDistributionCard
- DataStatisticsCard
- ReportsTable
- FilterPanel
- PaginationBar

---

## 10) UI Quality Checklist (ต้องผ่าน)
ก่อนส่งงาน UI ต้องเช็ค:
- หน้า Home ดู professional แบบเว็บวิจัย
- หน้า Dashboard ดูเหมือน mockup
- spacing ไม่แน่น
- typography อ่านง่าย
- สี consistent
- table ใช้งานง่าย
- responsive mobile ไม่พัง
