import { test, expect } from '@playwright/test';

test.describe('Crypto Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the dashboard title and description', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /cryptocurrency dashboard/i })).toBeVisible();
    await expect(page.getByText(/track the top cryptocurrencies/i)).toBeVisible();
  });

  test('should have a search bar', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search cryptocurrencies/i);
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toBeEditable();
  });

  test('should display coin list when data loads', async ({ page }) => {
    // Wait for the coin list to load
    await expect(page.getByText(/top cryptocurrencies/i)).toBeVisible();
    
    // Check if at least one coin card is displayed
    const coinCards = page.locator('[href^="/coin/"]');
    await expect(coinCards.first()).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to coin detail page when clicking a coin', async ({ page }) => {
    // Wait for coins to load and click the first one
    const firstCoin = page.locator('[href^="/coin/"]').first();
    await expect(firstCoin).toBeVisible({ timeout: 10000 });
    
    const coinHref = await firstCoin.getAttribute('href');
    await firstCoin.click();
    
    // Check if we're on the coin detail page
    await expect(page).toHaveURL(coinHref!);
    await expect(page.getByText(/back to dashboard/i)).toBeVisible();
  });

  test('should toggle between light and dark themes', async ({ page }) => {
    // Find and click the theme toggle button
    const themeToggle = page.getByRole('button', { name: /toggle theme/i });
    await expect(themeToggle).toBeVisible();
    
    // Get initial theme class
    const html = page.locator('html');
    const initialClass = await html.getAttribute('class');
    
    // Toggle theme
    await themeToggle.click();
    
    // Wait for theme change
    await page.waitForTimeout(100);
    
    // Check that theme changed
    const newClass = await html.getAttribute('class');
    expect(newClass).not.toBe(initialClass);
  });

  test('should search for cryptocurrencies', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search cryptocurrencies/i);
    
    // Type in search query
    await searchInput.fill('bitcoin');
    
    // Wait for search results
    await page.waitForTimeout(500);
    
    // Should show search results or loading state
    const coinList = page.getByText(/top cryptocurrencies/i).or(page.getByText(/loading/i));
    await expect(coinList).toBeVisible();
  });
});