# ui-pages.md
# โครงสร้างหน้าเว็บและองค์ประกอบ UI

ไฟล์นี้อธิบาย layout และ component requirements ของแต่ละหน้า  
Cursor ต้องยึดตามนี้เมื่อสร้าง UI

---

## 1) Navbar (ใช้ทุกหน้า)
Navbar ต้องมีเมนู:
- Home
- Resources
- DrugSearch
- Contact Us (เป็นปุ่ม CTA)

Style:
- background: white
- border bottom: neutral gray
- ปุ่ม Contact Us ใช้ Primary Button (Blue-700)

---

## 2) หน้า Home (Landing Page)
### Sections ที่ต้องมี
1) Hero Section
   - headline ใหญ่
   - subtitle
   - ปุ่ม CTA เช่น Explore / Learn More
   - background เป็น gradient (Blue/Green)
   - ใช้ภาพประกอบแนว molecular / biotech

2) Research Collaborations
   - แสดงโลโก้ partner
   - layout row, responsive

3) Aims
   - bullet points
   - ปุ่ม Read More

4) Research Diagram
   - แสดง infographic pipeline ของ CanDrugAI

5) Our Research Team
   - grid card profile
   - avatar + name + title

6) Our Advisory Team
   - card profile แบบใหญ่กว่า research team

7) Footer
   - logo + links
   - social icons

---

## 3) หน้า ADR Database (Dashboard Page)
### Components ที่ต้องมี
1) Header Title: "Adverse Drug Reaction Database"

2) Dataset Mode Toggle
- Adult
- Pediatric

3) KPI Cards (6 cards)
- CA, DE, DS, HL, LT, OT
- แสดง label + count
- style เป็น card minimal

4) Total Reported Cases Banner
- แสดง total cases + year range
- เป็น banner card ยาวเต็มความกว้าง

5) Demographic Section
- male count
- female count
- age group distribution

6) Data Statistics Section
- ADR terms count
- Drugs count
- Drug-ADR pairs count
- MedDRA breakdown (SOC/HLGT/HLT/PT)

---

## 4) หน้า DrugSearch (Table Search Page)
### Components ที่ต้องมี
1) Search Bar
- input กลางหน้า
- placeholder เช่น "Search ingredient or reaction..."

2) Filter Panel
- เป็น sidebar หรือ collapsible panel
- filter chips แสดง active filters

3) Table Results
- TanStack Table
- pagination
- sorting
- loading state
- empty state

4) Row Click
- เปิดหน้า detail report (/reports/{safetyreportid})

---

## 5) Responsive Rules
- Desktop: 3-column layout ได้ (filter + table)
- Mobile: filter collapsible, table scrollable
