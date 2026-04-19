// @ts-check
import { test, expect } from '@playwright/test';

/*test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});*/


test('buscar empleos y aplicar a una oferta', async ({ page }) => {
    await  page.goto("http://localhost:5173")

    const searchInput = page.getByRole('searchbox')
    await searchInput.fill("React")

    await page.getByRole("button", {name: "Buscar"}).click()

    const jobCards = page.locator('.job-listing-card')

    await expect(jobCards.first()).toBeVisible()

    const firstJobTitle = jobCards.first().locator('h3')
    await expect(firstJobTitle).toHaveText('Desarrollador de Software Senior')

    await page.getByRole('button', { name: 'Iniciar sesión' }).click()

    const applyButton = page.getByRole('button', { name: 'Aplicar' }).first()
    await applyButton.click()

    await expect(page.getByRole('button', { name: 'Aplicado' })).toBeVisible();
  })