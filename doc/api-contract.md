````md
# api-contract.md
# API Contract (FastAPI) สำหรับ Frontend Next.js

เอกสารนี้เป็นสัญญา API ที่ frontend ต้องใช้  
ตอนนี้ยังไม่เชื่อม DB จริง ดังนั้น frontend จะใช้ mock data แต่ต้องมีรูปแบบ JSON ตามนี้  
เพื่อให้เปลี่ยนไปใช้ backend จริงได้ง่ายในอนาคต

---

## 1) Standard Rules (กฎกลาง)

### 1.1 Base URL
- ในอนาคต backend จะอยู่ที่:
  - `/api/*` (ผ่าน reverse proxy) หรือ
  - `https://api.<domain>/api/*`

### 1.2 Standard Response สำหรับ List
ทุก endpoint ที่เป็น list ต้องคืนรูปแบบนี้:

```json
{
  "total_count": 1000,
  "page": 1,
  "page_size": 25,
  "results": []
}
````

### 1.3 Standard Error Response

ทุก error ต้องคืนแบบนี้:

```json
{
  "error": true,
  "message": "ข้อความ error",
  "detail": "รายละเอียดเพิ่มเติม (optional)"
}
```

---

## 2) API: Dashboard (หน้า ADR Database)

### 2.1 GET /api/dashboard/summary

ใช้สำหรับ:

* KPI cards (CA/DE/DS/HL/LT/OT)
* Total reported cases banner
* Sex distribution

**Query Params**

* `dataset_mode`: `"adult"` | `"pediatric"` (required)

**Response**

```json
{
  "dataset_mode": "adult",
  "year_range": { "start": 2012, "end": 2025 },
  "total_reports": 71944,
  "outcome_counts": {
    "CA": 580,
    "DE": 7000,
    "DS": 200,
    "HL": 8000,
    "LT": 3468,
    "OT": 12000
  },
  "sex_distribution": {
    "male": 28600,
    "female": 11600,
    "unknown": 0
  }
}
```

---

### 2.2 GET /api/dashboard/age-distribution

ใช้สำหรับ:

* Age distribution section (blocks หรือ bar chart)

**Query Params**

* `dataset_mode`: `"adult"` | `"pediatric"` (required)

**Response**

```json
{
  "dataset_mode": "adult",
  "age_groups": [
    { "label": "0-10 Years", "min": 0, "max": 10, "count": 1250 },
    { "label": "11-20 Years", "min": 11, "max": 20, "count": 2600 },
    { "label": "21-30 Years", "min": 21, "max": 30, "count": 3900 }
  ]
}
```

---

### 2.3 GET /api/dashboard/statistics

ใช้สำหรับ:

* Data Statistics cards (ADR terms / Drugs / Drug-ADR pairs / MedDRA breakdown)

**Query Params**

* `dataset_mode`: `"adult"` | `"pediatric"` (required)

**Response**

```json
{
  "dataset_mode": "adult",
  "total_adr_terms": 12345,
  "total_drugs": 2345,
  "total_drug_adr_pairs": 56789,
  "meddra_distribution": {
    "SOC": 27,
    "HLGT": 120,
    "HLT": 420,
    "PT": 12345
  }
}
```

---

## 3) API: Search (หน้า DrugSearch)

### 3.1 GET /api/search/reports

ใช้สำหรับ:

* table results หน้า DrugSearch

**Query Params**

* `dataset_mode`: `"adult"` | `"pediatric"` (required)

optional filters:

* `q` (string)
* `ingredient` (string)
* `medicinal_product` (string)
* `reaction_meddrapt` (string)
* `nichd` (string)
* `patient_sex` (`"M"` | `"F"` | `"UNK"`)
* `age_min` (number)
* `age_max` (number)
* `serious` (true/false)
* `serious_type` (`"CA"|"DE"|"DS"|"HL"|"LT"|"OT"`)
* `date_start` (`"YYYY-MM-DD"`)
* `date_end` (`"YYYY-MM-DD"`)

pagination:

* `page` (default 1)
* `page_size` (default 25)

sorting:

* `sort_by` (default `"index_date"`)
* `sort_order` (`"asc"|"desc"`)

**Response**

```json
{
  "total_count": 10000,
  "page": 1,
  "page_size": 25,
  "results": [
    {
      "safetyreportid": "12345678",
      "ingredient": "ibuprofen",
      "medicinal_product": "ADVIL",
      "reaction_meddrapt": "Nausea",
      "nichd": "late_adolescence",
      "patient_sex": "M",
      "age_years": 15,
      "serious": true,
      "serious_type": "HL",
      "drug_indication": "Pain",
      "drug_administration": "oral",
      "index_date": "2024-01-01"
    }
  ]
}
```

---

## 4) API: Report Detail (หน้า Report Detail)

### 4.1 GET /api/reports/{safetyreportid}

ใช้สำหรับ:

* หน้า report detail (`/reports/[safetyreportid]`)

**Response**

```json
{
  "safetyreportid": "12345678",
  "dataset_mode": "adult",
  "index_date": "2024-01-01",
  "patient": {
    "patient_sex": "M",
    "age_years": 15,
    "nichd": "late_adolescence"
  },
  "serious": true,
  "serious_flags": {
    "CA": false,
    "DE": false,
    "DS": false,
    "HL": true,
    "LT": false,
    "OT": false
  },
  "drug_indication": "Pain",
  "drug_administration": "oral",
  "drugs": [
    { "ingredient": "ibuprofen", "medicinal_product": "ADVIL" }
  ],
  "reactions": [
    { "reaction_meddrapt": "Nausea", "meddra_soc_names": "Gastrointestinal disorders" }
  ]
}
```

---

## 5) API: Lookup Lists (Dropdown / Autocomplete)

### 5.1 GET /api/lookups/ingredients

ใช้สำหรับ:

* dropdown ingredient
* autocomplete search

**Query Params**

* `q` (optional string, partial match)
* `limit` (default 50)

**Response**

```json
{
  "results": ["ibuprofen", "aspirin", "metformin"]
}
```

---

### 5.2 GET /api/lookups/reactions

ใช้สำหรับ:

* dropdown reaction
* autocomplete search

**Query Params**

* `q` (optional string)
* `limit` (default 50)

**Response**

```json
{
  "results": ["Nausea", "Headache", "Diarrhoea"]
}
```

---

### 5.3 GET /api/lookups/nichd

ใช้สำหรับ:

* filter nichd (pediatric)

**Response**

```json
{
  "results": [
    "term_neonatal",
    "infancy",
    "toddler",
    "early_childhood",
    "middle_childhood",
    "early_adolescence",
    "late_adolescence"
  ]
}
```

---

## 6) Standard Enum Definitions

### 6.1 dataset_mode

* `adult`
* `pediatric`

### 6.2 serious_type

ใช้รหัสแบบ dashboard:

* `CA` = Congenital Anomaly
* `DE` = Death
* `DS` = Disabling
* `HL` = Hospitalization
* `LT` = Life Threatening
* `OT` = Other

---

## 7) หมายเหตุสำคัญ (Implementation Notes)

* frontend ต้องใช้ mock data ให้ response shape เหมือน API จริงตามเอกสารนี้
* backend ในอนาคตต้องคืน JSON ตาม schema นี้แบบ 1:1
* pagination ต้องมี `total_count` เสมอ
* sorting ต้อง validate `sort_by` และ `sort_order`

```
```
