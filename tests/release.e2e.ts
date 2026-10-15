import { expect, test, type Page } from '@playwright/test';

async function expectNoHorizontalOverflow(page: Page) {
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
}

async function expectNoRuntimeErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.waitForTimeout(100);
  expect(errors).toEqual([]);
}

test('home page and mobile navigation are usable without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /your medical bill/i })).toBeVisible();
  await page.locator('.site-header__mobile-nav summary').click();
  await expect(page.getByRole('navigation', { name: 'Mobile main navigation' }).getByText('Tools')).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await expectNoRuntimeErrors(page);
});

test('Fair Price validates input, calculates a known value, and keeps tool traffic analytics-free', async ({ page }) => {
  const analyticsRequests: string[] = [];
  page.on('request', (request) => {
    if (/google-analytics|googletagmanager/i.test(request.url())) analyticsRequests.push(request.url());
  });

  await page.goto('/tools/fair-price/?code=99213&amount=PBG_PRIVACY_MARKER_741');
  await expect(page).toHaveURL(/\/tools\/fair-price\/$/);
  await page.locator('#cpt').fill('999');
  await page.getByRole('button', { name: 'Check price' }).click();
  await expect(page.getByText('Enter a valid 5-digit CPT code.')).toBeVisible();
  await page.locator('#cpt').fill('99213');
  await page.locator('#zip').fill('10001');
  await page.locator('#price').fill('300');
  await page.getByRole('button', { name: 'Check price' }).click();
  await expect(page.getByText('2026 MPFS reference')).toBeVisible();
  await expect(page.getByText('$107.37')).toBeVisible();
  await page.getByRole('link', { name: 'Open Dispute Letter template' }).click();
  await expect(page).toHaveURL(/\/tools\/dispute-letter\/$/);
  await expect(page.locator('#line-items')).toHaveValue(/CPT 99213/);
  await expect(page.locator('#amount-disputed')).toHaveValue('300');
  expect(analyticsRequests.join('\n')).not.toContain('PBG_PRIVACY_MARKER_741');
  expect(analyticsRequests).toEqual([]);
  await expectNoRuntimeErrors(page);
});

test('Medicare Part B applies deductible and rejects an invalid deductible', async ({ page }) => {
  await page.goto('/tools/fair-price/');
  await page.getByRole('tab', { name: 'Medicare Part B estimate' }).click();
  await page.locator('#cpt').fill('99213');
  await page.locator('#zip').fill('10001');
  await page.locator('#deductible-met').fill('284');
  await page.getByRole('button', { name: 'Estimate Part B cost' }).click();
  await expect(page.getByText('Enter a deductible amount from $0 to $283')).toBeVisible();
  await page.locator('#deductible-met').fill('0');
  await page.getByRole('button', { name: 'Estimate Part B cost' }).click();
  await expect(page.getByText('Your estimated share')).toBeVisible();
  await expect(page.locator('.part-b-owe-highlight__amount')).toHaveText('$107.37');
});

test('Bill Auditor reports skipped NCCI coverage instead of a normal bill', async ({ page }) => {
  await page.goto('/tools/bill-auditor/');
  await page.locator('#bill-text').fill('10/01/2026 99213 Office visit $150.00');
  await page.getByRole('button', { name: /audit bill/i }).click();
  await expect(page.getByText('NCCI unbundling check not fully evaluated')).toBeVisible();
  await expect(page.getByText('NCCI checked').locator('..')).toContainText('No');
  await expect(page.getByRole('heading', { name: 'Bill looks normal' })).toHaveCount(0);
});

test('other tool workflows render their actual results', async ({ page }) => {
  await page.goto('/tools/eob-analyzer/');
  await page.locator('#eob-text').fill('01/15/2026 99213 Office visit billed $200 allowed $100 plan paid $80 patient owes $20');
  await page.getByRole('button', { name: /analyze eob/i }).click();
  await expect(page.getByRole('heading', { name: 'EOB summary' })).toBeVisible();

  await page.goto('/tools/surprise-bill-check/');
  await page.locator('input[name="care-setting"][value="hospital_outpatient"]').check();
  await page.locator('input[name="facility-network"][value="in_network"]').check();
  await page.locator('input[name="provider-network"][value="out_of_network"]').check();
  await page.locator('input[name="insurance-type"][value="private_insured"]').check();
  await page.getByRole('button', { name: /check surprise bill risk/i }).click();
  await expect(page.locator('#surprise-bill-results')).toBeVisible();

  await page.goto('/tools/hospital-compare/');
  await page.locator('#cpt').fill('99213');
  await page.locator('#hc-zip').fill('10001');
  await page.locator('#hc-charge').fill('1000');
  await page.getByRole('button', { name: 'Compare hospital price' }).click();
  await expect(page.getByText('Your hospital charge')).toBeVisible();

  await page.goto('/tools/dispute-letter/');
  await page.locator('#line-items').fill('99213 office visit billed $250');
  await page.getByRole('button', { name: /generate letter/i }).click();
  await expect(page.getByRole('heading', { name: 'Your dispute letter' })).toBeVisible();
});

test('all mobile tool routes have no horizontal overflow', async ({ page }) => {
  for (const width of [320, 375, 390, 768]) {
    await page.setViewportSize({ width, height: 720 });
    for (const route of [
      '/tools/fair-price/',
      '/tools/bill-auditor/',
      '/tools/eob-analyzer/',
      '/tools/surprise-bill-check/',
      '/tools/hospital-compare/',
      '/tools/dispute-letter/',
    ]) {
      await page.goto(route);
      await expectNoHorizontalOverflow(page);
    }
  }
});
