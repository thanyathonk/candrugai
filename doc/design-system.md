# design-system.md
# Design System ของ CanDrugAI (Colors + Fonts)

ไฟล์นี้เป็นกฎการออกแบบ UI ของโปรเจกต์ทั้งหมด  
Cursor/AI ต้องใช้สีและฟอนต์ตามไฟล์นี้เท่านั้น ห้ามสร้าง palette ใหม่เอง

---

## 1) ฟอนต์หลัก (Typography)
### Font Family
- ฟอนต์หลักของระบบ: **Golos Text**
- ใช้สำหรับทุกข้อความในเว็บ:
  - heading
  - paragraph
  - buttons
  - labels
  - table

### Font Weight ที่แนะนำ
- 400: body text
- 500: labels / navigation
- 600: section heading
- 700: main heading / hero title

---

## 2) Color Palette (ต้องใช้ตามนี้เท่านั้น)

### 2.1 Blue (Primary)
- Blue-700: `#3F51B5`
- Blue-500: `#6380C3`
- Blue-200: `#BCCBF0`
- Blue-50 : `#E2EDFE`

ใช้สำหรับ:
- primary button
- links
- highlight
- dashboard card accents

---

### 2.2 Green (Secondary / Success)
- Green-700: `#35A265`
- Green-500: `#68BA8C`
- Green-200: `#CDE8D9`
- Green-50 : `#E6F4EC`

ใช้สำหรับ:
- positive KPI
- success state
- active filter state
- confirmation state

---

### 2.3 Neutral (Gray)
- Gray-600: `#949CA1`
- Gray-300: `#BBC6CE`
- Gray-200: `#E3E3E3`

ใช้สำหรับ:
- secondary text
- border/divider
- subtle backgrounds

---

## 3) Rules การใช้สี (UI Token Rules)
### Background
- background หลัก: white
- background section (soft): ใช้ Blue-50 หรือ Green-50

### Text
- primary text: black/near-black
- secondary text: Gray-600

### Border / Divider
- default border: Gray-300
- light border: Gray-200

### Buttons
- Primary Button:
  - background: Blue-700
  - text: white
  - hover: Blue-500
- Secondary Button:
  - background: white
  - border: Gray-300
  - hover background: Blue-50
- Success Button:
  - background: Green-700
  - hover: Green-500

### Cards
- background: white
- border: Gray-200
- shadow: เบามาก (minimal)

---

## 4) Component Style Rules
- UI ต้อง minimal, spacing เยอะ, อ่านง่าย
- หลีกเลี่ยงสีสด/ฉูดฉาดนอก palette
- ใช้ gradient ได้เฉพาะ hero banner และ header background
- KPI cards ต้องดูเป็น clean dashboard

---

## 5) Tailwind Implementation Requirement
Frontend ต้อง map สีทั้งหมดเข้า Tailwind theme และตั้งค่า font-family ให้ Golos Text เป็น default

ตัวอย่างชื่อ token ที่แนะนำ:
- brandBlue.700
- brandGreen.700
- neutral.600
