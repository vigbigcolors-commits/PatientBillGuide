/**
 * Rehab generic CPT seed labels that leaked into batch pages.
 * Replaces placeholder phrases in src/data/cpt-batch-scale-35*.ts
 * Run: node scripts/rehab-cpt-generic-labels.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Plain-English labels — original educational wording, not AMA verbatim. */
const LABELS = {
  // Day 4 (35b) — indexed garbage + siblings
  90832: 'Psychotherapy, about 30 minutes',
  90836: 'Psychotherapy, about 45 minutes with E/M',
  90838: 'Psychotherapy, about 60 minutes with E/M',
  90839: 'Psychotherapy for crisis, first 60 minutes',
  90847: 'Family psychotherapy with patient present',
  90853: 'Group psychotherapy',
  96365: 'IV infusion for therapy, initial hour',
  96369: 'Subcutaneous infusion for therapy, initial',
  69200: 'Removal of foreign body from external ear',
  69420: 'Myringotomy (ear drainage), local anesthesia',
  69421: 'Myringotomy (ear drainage), general anesthesia',
  51700: 'Bladder irrigation or medication instillation',
  51701: 'Insertion of temporary bladder catheter',
  57452: 'Colposcopy of the cervix',
  57454: 'Colposcopy with biopsy and endocervical curettage',
  11400: 'Excision of benign skin lesion, 0.5 cm or less',
  11104: 'Punch biopsy of skin',
  17004: 'Destruction of premalignant lesions, 15 or more',
  93017: 'Cardiovascular stress test, tracing only',
  93308: 'Limited or follow-up echocardiogram',
  94726: 'Lung volume measurement (plethysmography)',
  94729: 'Lung diffusing capacity (DLCO) test',
  99406: 'Tobacco cessation counseling, 3–10 minutes',
  99407: 'Tobacco cessation counseling, over 10 minutes',
  99490: 'Chronic care management, first 20 minutes',
  // Day 3 (35)
  99234: 'Same-day observation admit/discharge, low complexity',
  99235: 'Same-day observation admit/discharge, moderate complexity',
  99236: 'Same-day observation admit/discharge, high complexity',
  99304: 'Initial nursing facility care, low complexity',
  99305: 'Initial nursing facility care, moderate complexity',
  99306: 'Initial nursing facility care, high complexity',
  99307: 'Subsequent nursing facility care, straightforward',
  99308: 'Subsequent nursing facility care, low complexity',
  99309: 'Subsequent nursing facility care, moderate complexity',
  99310: 'Subsequent nursing facility care, high complexity',
  76705: 'Limited abdominal ultrasound',
  76770: 'Complete retroperitoneal ultrasound',
  29880: 'Knee arthroscopy with meniscectomy, medial and lateral',
  47563: 'Laparoscopic gallbladder removal with cholangiography',
  51702: 'Insertion of temporary indwelling bladder catheter',
  90837: 'Psychotherapy, about 60 minutes',
  64483: 'Spinal nerve injection, lumbar or sacral, with imaging',
  93307: 'Complete transthoracic echocardiogram',
  45381: 'Colonoscopy with submucosal injection',
  66982: 'Complex cataract surgery with intraocular lens',
  27448: 'Osteotomy of the femur',
  11750: 'Excision of nail or nail bed tissue',
  17000: 'Destruction of first premalignant skin lesion',
  99341: 'Home visit, new patient, low complexity',
  99342: 'Home visit, new patient, moderate complexity',
  99350: 'Home visit, established patient, high complexity',
};

const FILES = [
  join(ROOT, 'src/data/cpt-batch-scale-35b.ts'),
  join(ROOT, 'src/data/cpt-batch-scale-35.ts'),
];

const GENERICS = [
  'Medicine procedure or service',
  'Surgical or procedural service',
  'medicine procedure or service',
  'surgical or procedural service',
  'Diagnostic imaging or radiology',
  'diagnostic imaging or radiology',
];

function patchFile(filePath) {
  let src = readFileSync(filePath, 'utf8');
  let changes = 0;

  for (const [code, label] of Object.entries(LABELS)) {
    const lower = label.toLowerCase();

    const patterns = [
      [
        new RegExp(
          `(title:\\s*'CPT Code ${code} — )(?:Medicine procedure or service|Surgical or procedural service|Diagnostic imaging or radiology|Procedure code ${code})( Cost & Billing Guide')`,
          'g',
        ),
        `$1${label}$2`,
      ],
      [
        new RegExp(
          `(metaDescription:\\s*'CPT ${code} is )(?:medicine procedure or service|surgical or procedural service|diagnostic imaging or radiology|procedure code ${code})(\\.)`,
          'gi',
        ),
        `$1${lower}$2`,
      ],
      [
        new RegExp(
          `(summary:\\s*'CPT ${code} bills for )(?:medicine procedure or service|surgical or procedural service|diagnostic imaging or radiology|procedure code ${code})( —)`,
          'gi',
        ),
        `$1${lower}$2`,
      ],
      [
        new RegExp(
          `(to describe )(?:medicine procedure or service|surgical or procedural service|diagnostic imaging or radiology|procedure code ${code})(\\.)`,
          'gi',
        ),
        // only safe if near this code — apply after verifying code appears in same object: do code-scoped below
        null,
      ],
    ];

    // Code-scoped block replace: from `'CODE': {` until next `'XXXXX': {` or file end-ish
    const blockRe = new RegExp(
      `('${code}':\\s*\\{[\\s\\S]*?)(?=\\n\\s+'\\d{5}':\\s*\\{|\\n\\};\\s*$)`,
    );
    const blockMatch = src.match(blockRe);
    if (!blockMatch) continue;

    let block = blockMatch[1];
    const before = block;

    block = block.replace(
      new RegExp(
        `(title:\\s*'CPT Code ${code} — )(?:Medicine procedure or service|Surgical or procedural service|Diagnostic imaging or radiology|Procedure code ${code})( Cost & Billing Guide')`,
        'g',
      ),
      `$1${label}$2`,
    );
    block = block.replace(
      new RegExp(
        `(metaDescription:\\s*'CPT ${code} is )(?:medicine procedure or service|surgical or procedural service|diagnostic imaging or radiology|procedure code ${code})(\\.)`,
        'gi',
      ),
      `$1${lower}$2`,
    );
    block = block.replace(
      new RegExp(
        `(summary:\\s*'CPT ${code} bills for )(?:medicine procedure or service|surgical or procedural service|diagnostic imaging or radiology|procedure code ${code})( —)`,
        'gi',
      ),
      `$1${lower}$2`,
    );
    block = block.replace(
      new RegExp(
        `(to describe )(?:medicine procedure or service|surgical or procedural service|diagnostic imaging or radiology|procedure code ${code})(\\.)`,
        'gi',
      ),
      `$1${lower}$2`,
    );
    block = block.replace(
      new RegExp(
        `(educational: )(?:Medicine procedure or service|Surgical or procedural service|Diagnostic imaging or radiology|Procedure code ${code})(\\.)`,
        'g',
      ),
      `$1${label}$2`,
    );
    block = block.replace(
      new RegExp(
        `(when )(?:medicine procedure or service|surgical or procedural service|diagnostic imaging or radiology|procedure code ${code})( is performed)`,
        'gi',
      ),
      `$1${lower}$2`,
    );
    block = block.replace(
      new RegExp(
        `(It identifies )(?:medicine procedure or service|surgical or procedural service|diagnostic imaging or radiology|procedure code ${code})( on a medical bill\\.)`,
        'gi',
      ),
      `$1${lower}$2`,
    );
    block = block.replace(
      new RegExp(
        `(Our summary: )(?:Medicine procedure or service|Surgical or procedural service|Diagnostic imaging or radiology|Procedure code ${code})(\\.)`,
        'g',
      ),
      `$1${label}$2`,
    );
    block = block.replace(
      new RegExp(
        `(\\{ code: '${code}', label: ')(?:Medicine procedure or service|Surgical or procedural service|Diagnostic imaging or radiology|Procedure code ${code})(')`,
        'g',
      ),
      `$1${label}$2`,
    );

    // related labels pointing TO this code from other pages
    src = src.replace(
      new RegExp(
        `(\\{ code: '${code}', label: ')(?:Medicine procedure or service|Surgical or procedural service|Diagnostic imaging or radiology|Procedure code ${code})(')`,
        'g',
      ),
      `$1${label}$2`,
    );

    if (block !== before) {
      changes++;
      src = src.replace(blockMatch[1], block);
    }
  }

  writeFileSync(filePath, src);
  return changes;
}

let total = 0;
for (const f of FILES) {
  try {
    const n = patchFile(f);
    total += n;
    console.log(f.replace(ROOT + '\\', '').replace(ROOT + '/', ''), 'patches', n);
  } catch (e) {
    console.error('skip', f, e.message);
  }
}

// Fix seeds so future regenerations stay clean
const seedFiles = [
  join(ROOT, 'scripts/build-data/cpt-seed-batch2-35b.mjs'),
  join(ROOT, 'scripts/build-data/cpt-seed-batch2-35.mjs'),
];
for (const sf of seedFiles) {
  let s = readFileSync(sf, 'utf8');
  let n = 0;
  for (const [code, label] of Object.entries(LABELS)) {
    const re = new RegExp(
      `(\\['${code}',\\s*')(?:Medicine procedure or service|Surgical or procedural service|Diagnostic imaging or radiology|Procedure code ${code})(')`,
      'g',
    );
    const next = s.replace(re, `$1${label}$2`);
    if (next !== s) {
      n++;
      s = next;
    }
  }
  writeFileSync(sf, s);
  console.log('seed', sf.split(/[/\\]/).pop(), 'patches', n);
}

console.log('done, content patch ops ~', total);
