const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    const user = {
      name: "Test User",
      username: "testuser",
      password: "password",
    };
    await request.post("/api/users", { data: user });
    await page.goto("/");
  });

  test("Login link is shown on main page", async ({ page }) => {
    await expect(page.getByRole("link", { name: "login" })).toBeVisible();
  });

  describe("Login", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("link", { name: "login" }).click();
    });

    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "testuser", "password");
      await expect(page.getByRole("button", { name: "logout" })).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "testuser", "wrong");

      const errorDiv = page.locator(".error");
      await expect(errorDiv).toContainText("wrong username or password");
      await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");

      await expect(page.getByRole("button", { name: "logout" })).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("link", { name: "login" }).click();
      await loginWith(page, "testuser", "password");
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("link", { name: "create new" }).click();
      await createBlog(page, "Test Blog", "Test Author", "http://testblog.com");
      
      await expect(page.getByText("a new blog Test Blog by Test Author added")).toBeVisible();
    });

    describe("and a blog exists", () => {
      beforeEach(async ({ page }) => {
        await page.getByRole("link", { name: "create new" }).click();
        await createBlog(page, "Existing Blog", "Existing Author", "http://existingblog.com");
        await expect(page.getByRole("link", { name: "Existing Blog by Existing Author" })).toBeVisible();      });

      test("it can be liked", async ({ page }) => {
        await page.getByRole("link", { name: "Existing Blog by Existing Author" }).click();
        
        await page.getByRole("button", { name: "like" }).click();
        await expect(page.getByText("likes 1")).toBeVisible();
      });

      test("it can be deleted by the creator", async ({ page }) => {
        await page.reload();
        await page.getByRole("link", { name: "Existing Blog by Existing Author" }).click();
        
        page.on("dialog", (dialog) => dialog.accept());
        await page.getByRole("button", { name: "remove" }).click();
        
        await expect(page.getByRole("link", { name: "Existing Blog by Existing Author" })).not.toBeVisible();
      });

      test("it cannot be deleted by another user", async ({ page, request }) => {
        const anotherUser = { name: "Another User", username: "anotheruser", password: "password" };
        await request.post("/api/users", { data: anotherUser });
        
        await page.getByRole("button", { name: "logout" }).click();
        await page.getByRole("link", { name: "login" }).click();
        await loginWith(page, "anotheruser", "password");

        await page.getByRole("link", { name: "Existing Blog by Existing Author" }).click();
        
        await expect(page.getByRole("button", { name: "remove" })).not.toBeVisible();
      });
    });
  });
});