# Product Management Document: LMS Student-Teacher Matching System

## 1. Ringkasan Eksekutif (Executive Summary)

Sistem ini dirancang untuk mengotomatisasi proses penjodohan (matching) antara siswa dan pengajar dalam sebuah Learning Management System (LMS). Tujuannya adalah memastikan siswa mendapatkan pengajar yang paling sesuai berdasarkan keahlian, jadwal, dan gaya belajar. Sistem ini akan meningkatkan efektivitas pembelajaran dengan mengurangi waktu pencarian pengajar yang tepat dan meningkatkan kepuasan pengguna.

## 2. Gambaran Umum Sistem (System Overview)

Proses dimulai dari registrasi profil kedua belah pihak hingga terciptanya sesi pembelajaran yang terukur.

**Input:**
- Data profil siswa (preferensi belajar, jadwal, lokasi)
- Data profil pengajar (subjek keahlian, ketersediaan, kualifikasi)

**Core Engine:**
- Matching Engine yang memproses kecocokan menggunakan algoritma berbobot

**Output:**
- Kursus baru dengan tanggal mulai/selesai yang ditentukan
- Sesi pembelajaran yang terjadwal
- Pelacakan progres real-time
- Penilaian akhir dan feedback

## 3. Fitur Utama & Alur Kerja (Key Features)

Berdasarkan Sequence Diagram dan State Transitions:

### Pendaftaran & Profiling
- Siswa menginput tujuan belajar, gaya belajar, dan preferensi jadwal
- Pengajar menginput ketersediaan, subjek keahlian, dan kualifikasi
- Sistem memvalidasi dan menyimpan profil

### Mesin Penjodohan Otomatis
- Sistem menjalankan analisis kecocokan berdasarkan algoritma berbobot
- Jika ditemukan kecocokan yang memadai, sistem memberikan notifikasi
- Siswa dapat memilih/konfirmasi dari beberapa opsi matching

### Manajemen Status (State Management)
**Siswa:**
- `Registered` → `ProfileComplete` → `SeekingMatch` → `Matched` → `CourseScheduled`

**Pengajar:**
- `Registered` → `ProfileVerified` → `Available` → `Matched` → `Busy`

### Manajemen Kursus
- Setelah match disetujui, sistem membuat entitas Course
- Kursus memiliki tanggal mulai/selesai yang ditentukan
- Pelacakan progres dan penilaian akhir

## 4. Struktur Data & Entitas (Data Schema)

Berikut adalah entitas utama berdasarkan Relationship Diagram:

### Entitas Student
| Atribut | Tipe | Deskripsi |
|---------|------|-----------|
| student_id | string | Primary key |
| name | string | Nama lengkap siswa |
| email | string | Email untuk komunikasi |
| learning_style | enum | Gaya belajar (visual, auditory, kinesthetic, reading_writing) |
| preferred_schedule | Schedule[] | Array jadwal preferensi |
| location | string | Lokasi (optional) |
| timezone | string | Zona waktu (optional) |
| status | StudentStatus | Status saat ini |
| created_at | Date | Timestamp pembuatan |
| updated_at | Date | Timestamp update |

### Entitas Teacher
| Atribut | Tipe | Deskripsi |
|---------|------|-----------|
| teacher_id | string | Primary key |
| name | string | Nama lengkap pengajar |
| email | string | Email untuk komunikasi |
| expertise_areas | string[] | Array subjek keahlian |
| availability | Schedule[] | Array ketersediaan waktu |
| qualifications | string[] | Array kualifikasi |
| teaching_style | enum | Gaya mengajar |
| location | string | Lokasi (optional) |
| timezone | string | Zona waktu (optional) |
| rating | number | Rating rata-rata (0-5) |
| total_sessions | number | Total sesi yang telah dilakukan |
| status | TeacherStatus | Status saat ini |
| created_at | Date | Timestamp pembuatan |
| updated_at | Date | Timestamp update |

### Entitas Match
| Atribut | Tipe | Deskripsi |
|---------|------|-----------|
| match_id | string | Primary key |
| student_id | string | Foreign key ke Student |
| teacher_id | string | Foreign key ke Teacher |
| match_date | Date | Tanggal matching |
| status | MatchStatus | Status matching |
| compatibility_score | number | Skor kecocokan (0-100) |
| match_criteria | MatchCriteria | Detail kriteria matching |
| created_at | Date | Timestamp pembuatan |
| updated_at | Date | Timestamp update |

### Entitas Course
| Atribut | Tipe | Deskripsi |
|---------|------|-----------|
| course_id | string | Primary key |
| match_id | string | Foreign key ke Match |
| title | string | Judul kursus |
| subject | string | Subjek pembelajaran |
| start_date | Date | Tanggal mulai |
| end_date | Date | Tanggal selesai |
| status | CourseStatus | Status kursus |
| progress_percentage | number | Progress (0-100) |
| final_rating | number | Rating akhir (optional) |
| created_at | Date | Timestamp pembuatan |
| updated_at | Date | Timestamp update |

## 5. Algoritma Penjodohan (Matching Criteria)

Sistem menggunakan bobot prioritas sebagai berikut untuk menentukan kecocokan:

### Bobot Kriteria:
- **Subject Expertise (35%)**: Kesesuaian materi yang dikuasai guru dengan kebutuhan siswa
- **Schedule Compatibility (25%)**: Kesesuaian waktu luang antara kedua pihak
- **Teaching/Learning Style (20%)**: Kecocokan metode mengajar dengan gaya belajar siswa
- **Previous Ratings (15%)**: Rekam jejak performa pengajar
- **Location/Time Zone (5%)**: Penyesuaian zona waktu untuk koordinasi

### Perhitungan Skor:
```
Total Score = (SubjectScore × 0.35) + (ScheduleScore × 0.25) +
              (StyleScore × 0.20) + (RatingScore × 0.15) +
              (LocationScore × 0.05)
```

### Threshold Matching:
- Minimum compatibility score: 60/100
- Matching dianggap baik jika score ≥ 70
- Matching sangat baik jika score ≥ 85

## 6. Lini Masa Implementasi (Timeline)

Proyek dibagi menjadi tiga fase utama:

### Fase 1: Foundation (Jan - Mar)
- [ ] Registrasi user dan manajemen profil
- [ ] Pengembangan algoritma matching
- [ ] Setup database schema
- [ ] Basic UI/UX untuk profiling

### Fase 2: Matching (Mar - Mei)
- [ ] Testing & optimasi algoritma matching
- [ ] Integrasi sistem matching dengan UI
- [ ] Development notifikasi system
- [ ] State management untuk matching flow

### Fase 3: Deployment (Mei - Juli)
- [ ] Program pilot dengan user terbatas
- [ ] Peluncuran penuh (Full Launch)
- [ ] Monitoring dan analytics
- [ ] Iterasi berdasarkan feedback user

## 7. Teknologi & Arsitektur (Technology & Architecture)

### Frontend:
- React 18 dengan TypeScript
- Vite sebagai build tool
- Tailwind CSS untuk styling
- React Hook Form untuk form management
- Zustand untuk state management

### Backend:
- Node.js dengan Express.js
- PostgreSQL untuk database
- Redis untuk caching
- JWT untuk authentication

### Algoritma:
- Weighted scoring algorithm
- Schedule overlap calculation
- Compatibility matrix untuk style matching

## 8. Risiko & Mitigasi (Risks & Mitigation)

### Risiko Teknis:
- **Complex scheduling algorithm**: Mitigasi dengan unit testing menyeluruh
- **Performance dengan data besar**: Implementasi caching dan pagination
- **Timezone handling**: Library khusus untuk timezone calculation

### Risiko Bisnis:
- **Low matching success rate**: Continuous algorithm improvement
- **User adoption**: User-friendly interface dan clear value proposition
- **Competition**: Differentiate dengan advanced matching features

## 9. Metrik Kesuksesan (Success Metrics)

### User Engagement:
- Profile completion rate > 80%
- Matching success rate > 70%
- Course completion rate > 75%

### Technical Performance:
- Matching algorithm accuracy > 85%
- System response time < 2 seconds
- Uptime > 99.5%

### Business Impact:
- User satisfaction score > 4.2/5
- Monthly active users growth
- Revenue per user increase

## 10. Roadmap Future Enhancements

### Phase 4: Advanced Features (Aug - Oct)
- AI-powered learning path recommendation
- Video call integration untuk trial sessions
- Advanced analytics dashboard
- Mobile app development

### Phase 5: Scale & Optimization (Nov - Dec)
- Multi-language support
- Advanced filtering options
- Integration dengan external LMS platforms
- Machine learning untuk improved matching
