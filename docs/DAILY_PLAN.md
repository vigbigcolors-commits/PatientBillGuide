# Daily Build Plan — Post-Launch Sprint

> **Как пользоваться:** в конце каждого дня обновляй секцию «Отчёт» и ставь ✅.  
> Агенты: читай **текущий день** перед работой. Не перескакивай дни без явного запроса пользователя.

**Спринт:** Scale A (174 → ~220 страниц, 130 → 200 CPT)  
**Старт:** 2026-07-05  
**Мастер-план:** [GROWTH_MASTER.md](GROWTH_MASTER.md)

---

## День 1 — 5 июля 2026 ✅

### Задачи
- [x] GSC: domain property + DNS verify
- [x] Sitemap `sitemap-index.xml` → Success
- [x] Зафиксировать roadmap (GROWTH_MASTER, DECISIONS, STATUS)
- [x] **5 compare pages** (`99213-vs-99214`, `99214-vs-99215`, `99283-vs-99284`, `99202-vs-99203`, `45378-vs-45380`)
- [x] **5 category hubs** (office-visits, emergency-room, imaging, laboratory, surgery)
- [x] Hub `/codes/` — секции category + compare
- [x] Internal links CPT → compare + category

### Отчёт дня 1
| Метрика | Было | Стало |
|---------|------|-------|
| Страниц (build) | 163 | **174** |
| Compare | 0 | **5** |
| Category hubs | 0 | **5** |
| CPT guides | 130 | 130 |
| GSC | — | Verified + sitemap |

**Сделано:** long-tail слой (compare + category) live в коде; build + 84 tests OK.  
**Не сделано (перенос):** deploy на production, Batch 2 CPT, AdSense, Reddit, email.

### → День 2
Deploy compare/category на live + GSC indexing + проверка sitemap 174 URL.

---

## День 2 — 6 июля 2026 ✅

### Задачи
- [x] `git push` → Cloudflare deploy (compare + category на live) — уже на `main`, live 200 OK
- [x] Smoke test: 12 URL — все **200 OK**
- [ ] GSC → **URL Inspection** → Request indexing *(вручную в GSC — см. чеклист ниже)*
- [ ] GSC → Sitemaps: discovered URLs *(проверить в панели — live sitemap **173** URL)*
- [x] Обновить STATUS.md — отчёт дня 2

### Отчёт дня 2
- Deploy: ✅ OK (origin/main синхронизирован, compare/category live)
- Smoke test: ✅ 12/12 URLs → 200
- Live sitemap: **173** URL в `sitemap-0.xml` (build локально 174 — `/404` не в sitemap)
- Tests: **84 passed**
- GSC indexing: ⏳ пользователь (чеклист ниже)

### GSC — чеклист indexing (5–10 мин, вручную)

1. [Google Search Console](https://search.google.com/search-console) → property `patientbillguide.com`
2. **Проверка URL** → вставить URL → **Запросить индексирование**:

| # | URL |
|---|-----|
| 1 | `https://patientbillguide.com/` |
| 2 | `https://patientbillguide.com/tools/fair-price/` |
| 3 | `https://patientbillguide.com/codes/compare/99213-vs-99214/` |
| 4 | `https://patientbillguide.com/codes/category/imaging/` |
| 5 | `https://patientbillguide.com/codes/cpt/99213/` |
| 6 | `https://patientbillguide.com/codes/cpt/99214/` |
| 7 | `https://patientbillguide.com/codes/cpt/77067/` |
| 8 | `https://patientbillguide.com/codes/cpt/71046/` |
| 9 | `https://patientbillguide.com/codes/cpt/45378/` |

3. **Файлы Sitemap** → проверить discovered pages (ожидаем ~173)

### → День 3
Batch 2 CPT: seed + генерация **+35 кодов** → ~165 CPT, ~209 страниц.

---

## День 3 — 7 июля 2026

### Задачи
- [ ] Расширить seed из MPFS (коды не в encyclopedia)
- [ ] `npm run generate:cpt-pages` — **макс 25–35 CPT** (см. [GOOGLE_QUALITY.md](GOOGLE_QUALITY.md) Gate D)
- [ ] **10% manual QA** — прочитать 3 страницы из батча, убрать template stiffness
- [ ] EEAT pass: 800+ слов, related links только на live codes
- [ ] `npm test && npm run build` — цель **~209 страниц**, **~165 CPT**
- [ ] Deploy
- [ ] Отчёт в STATUS

### Отчёт дня 3 *(заполнить вечером)*
- Коды добавлены: …
- Build pages: …
- Tests: ☐

### → День 4
Batch 2 завершение: ещё +35 CPT → **200 total** + deploy.

---

## День 4 — 8 июля 2026

### Задачи
- [ ] Batch 2 вторая половина: **+35 CPT** → **200 CPT guides**
- [ ] Обновить category hubs (автоматически подтянут новые коды)
- [ ] `npm test && npm run build` — цель **~244 страниц**
- [ ] Deploy
- [ ] GSC: resubmit sitemap или дождаться авто-краула
- [ ] Отчёт в STATUS — milestone **Scale A CPT 200** 🎯

### Отчёт дня 4 *(заполнить вечером)*
- CPT total: …
- Pages total: …

### → День 5
Trust + monetization: `contact@` + AdSense application.

---

## День 5 — 9 июля 2026

### Задачи
- [ ] Настроить **contact@patientbillguide.com** (Cloudflare Email Routing или forwarding)
- [ ] Проверить `/contact/` — ссылка на email работает
- [ ] **Google AdSense** — подать заявку (174+ страниц, trust stack готов)
- [ ] GSC → Performance — первый взгляд (может быть пусто — норма)
- [ ] Отчёт в STATUS

### Отчёт дня 5 *(заполнить вечером)*
- Email: ☐
- AdSense status: submitted / pending / …

### → День 6
Learn content: pillar «Surprise Medical Bills».

---

## День 6 — 10 июля 2026

### Задачи
- [ ] Новая learn-статья: `/learn/surprise-medical-bills/` (или обновить план из PHASES)
- [ ] 1500+ слов, original, CTA → Surprise Bill Checker + dispute letter
- [ ] FAQ schema + internal links к `/for/uninsured/`, NSA context
- [ ] Deploy + request indexing в GSC
- [ ] Отчёт в STATUS

### Отчёт дня 6 *(заполнить вечером)*
- Learn URL: …
- Word count: …

### → День 7
Reddit launch — Fair Price (один сильный пост).

---

## День 7 — 11 июля 2026

### Задачи
- [ ] Написать Reddit-пост (r/personalfinance или r/HealthInsurance)
  - Честный тон, не spam
  - Demo: CPT + ZIP → Medicare benchmark
  - Ссылка на fair-price + privacy angle
- [ ] Опубликовать в лучшее US время (утро EST)
- [ ] Мониторить комментарии 2–4 часа — отвечать по делу
- [ ] Cloudflare Analytics — зафиксировать spike (если будет)
- [ ] Отчёт в STATUS

### Отчёт дня 7 *(заполнить вечером)*
- Subreddit: …
- Post URL: …
- Visits spike: …

### → День 8
Отдых / аналитика / мелкие фиксы по feedback.

---

## День 8 — 12 июля 2026 (лёгкий день)

### Задачи
- [ ] GSC: проверить indexed pages count
- [ ] Исправить issues если есть (404, crawl errors)
- [ ] Ответы на Reddit / contact email
- [ ] **Не** публиковать новый CPT batch (пауза после недели роста)
- [ ] Запланировать Batch 3 (следующие 50 CPT)
- [ ] Отчёт в STATUS

### Отчёт дня 8 *(заполнить вечером)*

### → День 9
Glossary — первые 6 терминов.

---

## День 9 — 13 июля 2026

### Задачи
- [ ] Glossary pages (6): `eob`, `deductible`, `copay`, `allowed-amount`, `cpt`, `coinsurance`
- [ ] URL: `/learn/glossary/[term]/`
- [ ] Короткие но уникальные (~400–600 слов каждый), link to learn pillars
- [ ] Deploy + sitemap
- [ ] Отчёт в STATUS

### Отчёт дня 9 *(заполнить вечером)*
- Glossary count: …

### → День 10
Batch 3 CPT: +25 кодов (мягкий старт к 250).

---

## День 10 — 14 июля 2026

### Задачи
- [ ] Batch 3: **+25 CPT** → **225 total**
- [ ] Build + test + deploy
- [ ] Learn: `medicare-allowed-amount` или `medical-billing-errors` (одна статья)
- [ ] Отчёт в STATUS

### Отчёт дня 10 *(заполнить вечером)*

### → День 11
Продолжение Batch 3 + state guide #1.

---

## День 11–14 — preview (неделя 2)

| День | Дата | Фокус |
|------|------|-------|
| **11** | 15 июл | Batch 3: +25 CPT → **250** |
| **12** | 16 июл | State guide: California surprise billing |
| **13** | 17 июл | State guide: Texas + New York |
| **14** | 18 июл | Review week: GSC report, AdSense status, план Batch 4 |

---

## Шаблон отчёта (копировать в STATUS session log)

```
| YYYY-MM-DD | Day N: [1 строка что сделано] · pages: X · CPT: Y · next: Day N+1 |
```

## Правила спринта

1. **Макс ~50 CPT за deploy** — не больше за один день.
2. **Каждый deploy:** `npm test` → `npm run build` → push.
3. **Чередовать:** код (CPT) ↔ контент (learn/glossary) ↔ маркетинг (GSC/Reddit).
4. **Пауза** после Reddit (день 8) — не перегружать индексацию.

---

**Текущий день:** 2 ✅ закрыт (GSC indexing — вручную) → **следующий: День 3 (7 июля)**
