/** CMS download URLs and cache paths for the MPFS build pipeline. */

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const CACHE_DIR = join(__dirname, 'cache');

export const CMS_SOURCES = {
  rvu: {
    url: 'https://www.cms.gov/files/zip/rvu26b-updated-05-01-2026.zip',
    zipName: 'rvu26b.zip',
    extractDir: 'rvu26b',
    pprrvuFile: 'PPRRVU2026_Apr_nonQPP.csv',
    gpciFile: 'GPCI2026.csv',
  },
  zipLocality: {
    url: 'https://www.cms.gov/files/zip/zip-code-carrier-locality-file-updated-05-13-2026.zip',
    zipName: 'zip-locality.zip',
    extractDir: 'zip-locality',
    dataFile: 'ZIP5_JUL2026.txt',
  },
  ncciPractitioner: {
    version: '2026Q3',
    files: [
      {
        url: 'https://www.cms.gov/files/zip/medicare-ncci-2026q3-practitioner-ptp-edits-ccipra-v322r0-f1.zip',
        zipName: 'ncci-pra-f1.zip',
        extractDir: 'ncci-pra-f1',
        marker: 'ccipra-v322r0-f1.TXT',
      },
      {
        url: 'https://www.cms.gov/files/zip/medicare-ncci-2026q3-practitioner-ptp-edits-ccipra-v322r0-f2.zip',
        zipName: 'ncci-pra-f2.zip',
        extractDir: 'ncci-pra-f2',
        marker: 'ccipra-v322r0-f2.TXT',
      },
      {
        url: 'https://www.cms.gov/files/zip/medicare-ncci-2026q3-practitioner-ptp-edits-ccipra-v322r0-f3.zip',
        zipName: 'ncci-pra-f3.zip',
        extractDir: 'ncci-pra-f3',
        marker: 'ccipra-v322r0-f3.TXT',
      },
      {
        url: 'https://www.cms.gov/files/zip/medicare-ncci-2026q3-practitioner-ptp-edits-ccipra-v322r0-f4.zip',
        zipName: 'ncci-pra-f4.zip',
        extractDir: 'ncci-pra-f4',
        marker: 'ccipra-v322r0-f4.TXT',
      },
    ],
    mergeDir: 'ncci-practitioner',
  },
};
