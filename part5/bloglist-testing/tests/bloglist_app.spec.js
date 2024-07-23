const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset');
        await request.post('/api/users', {
            data: {
                username: 'grey',
                name: 'grey',
                password: 'grey'
            }
        });

        await page.goto('/');
    });

    test('Login form is shown', async ({ page }) => {
        const locator = await page.getByText('Login to Blogs Page!');
        await expect(locator).toBeVisible();
    });

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            const textboxes = await page.getByRole('textbox').all();
            await textboxes[0].fill('grey');
            await textboxes[1].fill('grey');

            await page.getByRole('button', { name: 'login' }).click();
            await expect(page.getByText('grey logged in')).toBeVisible();

        })

        test('fails with wrong credentials', async ({ page }) => {
            const textboxes = await page.getByRole('textbox').all();
            await textboxes[0].fill('grey');
            await textboxes[1].fill('wrong password');

            await page.getByRole('button', { name: 'login' }).click();
        })
    })


})












// // @ts-check
// const { test, expect } = require('@playwright/test');

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
