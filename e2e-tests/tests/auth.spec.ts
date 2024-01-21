import { test, expect } from '@playwright/test';

const CLIENT_URL = 'http://localhost:3000';

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(CLIENT_URL);

  // Click the sign in link.
  await page.getByRole('link', { name: ' Login' }).click();

  // Check that the sign in form is visible.
  await expect(page.getByRole('heading', { name : 'Log In' })).toBeVisible();

  // Fill the form and submit it.
  await page.locator('[name="email"]').fill('e2etest@somerandomemaildomain.com');
  await page.locator('[name="password"]').fill('testpassword');

  await page.getByRole('button', { name: 'Log In' }).click();

  // Check if the user can see menu items for authenticated users.
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Log Out' })).toBeVisible();
});

test('should allow user to register', async ({ page }) => {
  await page.goto(CLIENT_URL);

  // Click the register link.
  await page.getByRole('link', { name: ' Register' }).click();

  // Check that the register form is visible.
  await expect(page.getByRole('heading', { name : 'Create an Account' })).toBeVisible()
  
  await page.locator('[name="firstName"]').fill('First name');
  await page.locator('[name="lastName"]').fill('Last name');
  const email = `e2etest${Math.floor(Math.random() * 100000)}@somerandomemaildomain.com`;
  await page.locator('[name="email"]').fill(email);
  await page.locator('[name="password"]').fill('testpassword');
  await page.locator('[name="repeatPassword"]').fill('testpassword');

  await page.getByRole('button', { name: 'Create Account' }).click();

  // Check if the user can see menu items for authenticated users.
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Log Out' })).toBeVisible();
});