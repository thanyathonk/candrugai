# project-rules.md
# กฎการเขียนโค้ดและโครงสร้างโปรเจกต์ (Cursor MUST FOLLOW)

ไฟล์นี้ใช้เพื่อให้ Cursor สร้างโค้ดได้ถูกต้อง ไม่หลุดโครง

---

## 1) Global Rules
- ใช้ภาษาไทยในการอธิบายและ comment ได้ แต่ชื่อโค้ดใช้ภาษาอังกฤษ
- ห้าม hardcode mock data ใน production component
- ห้ามใช้สีอื่นนอก design-system.md
- ห้ามใช้ font อื่นนอก Golos Text
- ทุกหน้าเว็บต้อง responsive

---

## 2) Folder Structure (Frontend)
แนะนำ structure:

- src/app
  - page.tsx (Home)
  - adr-database/page.tsx
  - drugsearch/page.tsx
  - reports/[safetyreportid]/page.tsx

- src/components
  - layout/
  - ui/
  - dashboard/
  - table/
  - filters/

- src/lib
  - api.ts
  - utils.ts

- src/styles
  - globals.css

---

## 3) Component Rules
- แยก component ให้เล็กและ reusable
- ใช้ shadcn/ui ได้ (Button, Card, Input, Table)
- ทุก component ต้องรองรับ loading state
- table ต้องรองรับ pagination และ sorting

---

## 4) Backend Structure Rules
แนะนำ structure:

- app/main.py
- app/api/routes/
- app/services/
- app/db/
- app/models/
- app/schemas/

Rules:
- ต้องแยก router/service/schema ชัดเจน
- ใช้ Pydantic response model เสมอ
- validate query params เสมอ

---

## 5) Database Rules
- ใช้ PostgreSQL เท่านั้น
- ห้าม query แบบโหลดทั้งหมดเข้า memory
- ต้องใช้ LIMIT/OFFSET เสมอสำหรับ list endpoint

---

## 6) UI Design Rules
- ใช้ design-system.md เป็นมาตรฐาน
- ใช้ card design เป็นหลัก
- ใช้ spacing เยอะ (p-4, p-6)
- ใช้ shadow เบา
- ใช้ gradient เฉพาะ hero/header
