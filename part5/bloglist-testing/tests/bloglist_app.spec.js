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
        await request.post('/api/users', {
            data: {
                username: 'meredith',
                name: 'meredith',
                password: 'meredith'
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
        });

        test('fails with wrong credentials', async ({ page }) => {
            await login(page, 'grey', 'wrongpassword');
            await expect(page.getByText('grey logged in')).not.toBeVisible();
            await expect(page.getByText('Wrong username or password')).toBeVisible();
        });
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await login(page, 'grey', 'grey');
        });

        test('a new blog can be created, and shows in blog list', async ({ page }) => {
            await createBlog(page, 'new blog', 'new blog url');
            await expect(page.getByRole('heading', { name: 'new blog' })).toBeVisible();
        });

        test('new blog created can be deleted', async ({ page }) => {
            await createBlog(page, 'new blog', 'new blog url');
            await page.getByRole('button', { name: 'view' }).click();
            await expect(page.getByRole('heading', { name: 'new blog' })).toBeVisible();

            // Define handler first
            page.on('dialog', async dialog => {
                console.log(dialog.message());
                dialog.accept();
            });
            await page.getByRole('button', { name: 'delete' }).click();

            await expect(page.getByRole('heading', { name: 'new blog' })).not.toBeVisible();
        });

        const blogHeading = 'grey\s blog';
        test('another user cannot delete others blog', async ({ page }) => {
            await createBlog(page, blogHeading, 'url');
            await logout(page);
            await login(page, 'meredith', 'meredith');
            await page.getByRole('button', { name: 'view' }).click();

            await expect(page.getByRole('heading', { name: blogHeading })).toBeVisible();
            await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible();
        });

    });

    describe('When multiple blogs exist', () => {
        beforeEach(async ({ page }) => {
            await login(page, 'grey', 'grey');
            await createBlog(page, 'blog 1', 'url');
            await createBlog(page, 'blog 2', 'url');
            await createBlog(page, 'blog 3', 'url');
            await page.getByText('New blog "blog 3" by grey').waitFor();
        });

        test('blogs ordered by likes', async ({ page }) => {
            const viewButtons = await page.getByRole('button', { name: 'view' }).all();
            // console.log(viewButtons);

            // Click Blog 2
            await page.getByRole('button', { name: 'view' }).nth(1).click();
            await page.getByRole('button', { name: 'like' }).click();
            await page.getByRole('button', { name: 'like' }).click();
            await page.getByRole('button', { name: 'like' }).click();

            // First Blog will be blog 2
            const blogs = await page.getByTestId('blogs');
            const blog = await blogs.locator('h2').first();
            expect(await blog.textContent()).toBe('blog 2');
        });
    });

});


async function createBlog(page, title, url) {
    await page.getByRole('button', { name: 'create new blog' }).click();
    await page.locator('div').filter({ hasText: /^Title:$/ }).getByRole('textbox').fill(title);
    await page.locator('div').filter({ hasText: /^URL:$/ }).getByRole('textbox').fill(url);
    await page.getByRole('button', { name: 'Add Blog' }).click();
}

async function logout(page) {
    await page.getByRole('button', { name: 'logout' }).click();
}

async function login(page, username, password) {
    const textboxes = await page.getByRole('textbox').all();
    await textboxes[0].fill(username);
    await textboxes[1].fill(password);

    await page.getByRole('button', { name: 'login' }).click();
}
