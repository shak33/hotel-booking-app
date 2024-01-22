import { test, expect } from '@playwright/test';
import path from 'path';

const CLIENT_URL = 'http://localhost:3000';

test.beforeEach(async ({ page }) => {
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

test('should allow the user to create a hotel', async ({ page }) => {
  // Go to create hotel page.
  await page.goto(`${CLIENT_URL}/my-hotels/create`);

  // Check that the create hotel form is visible.
  await expect(page.getByRole('heading', { name : 'Add Hotel' })).toBeVisible();
  await page.locator('[name="name"]').fill('Hotel name');
  await page.locator('[name="city"]').fill('City name');
  await page.locator('[name="country"]').fill('Country name');
  await page.locator('[name="description"]').fill('Hotel description');
  await page.locator('[name="pricePerNight"]').fill('100');
  await page.locator('[name="adultCount"]').fill('2');
  await page.locator('[name="childrenCount"]').fill('2');

  await page.getByText('Budget').click();
  
  await page.getByText('Free Wifi').check();
  await page.getByText('Parking').check();

  await page.selectOption('select[name="starRating"]', '5');

  await page.setInputFiles('input[name="imageFiles"]', [
    path.join(__dirname, 'files/create-hotel/photo-1625244724120-1fd1d34d00f6.avif'),
    path.join(__dirname, 'files/create-hotel/photo-1625244724120-1fd1d34d00f7.jpeg'),
  ]);

  await page.getByRole('button', { name: 'Save' }).click();
});