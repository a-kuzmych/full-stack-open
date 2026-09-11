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

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("log in to application")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "testuser", "password");
      await expect(page.getByText("Test User logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "testuser", "wrong");

      const errorDiv = page.locator(".error");
      await expect(errorDiv).toContainText("wrong username or password");
      await expect(errorDiv).toHaveCSS("border-style", "solid");
      await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");

      await expect(page.getByText("testuser logged in")).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "testuser", "password");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, "Test Blog", "Test Author", "http://testblog.com");
      await expect(
        page.getByText("Test Blog by Test Author added"),
      ).toBeVisible();
    });

    describe("and a blog exists", () => {
      beforeEach(async ({ page }) => {
        await createBlog(
          page,
          "Existing Blog",
          "Existing Author",
          "http://existingblog.com",
        );
      });

      test("it can be liked", async ({ page }) => {
        const blogText = page.getByText("Existing Blog");
        const blogElement = blogText.locator("..");
        await blogElement.getByRole("button", { name: "view" }).click();
        await blogElement.getByRole("button", { name: "like" }).click();
        await expect(blogElement.getByText("likes 1")).toBeVisible();
      });

      test("it cannot be deleted by another user", async ({ page, request }) => {
        const anotherUser = {
          name: "Another User",
          username: "anotheruser",
          password: "password",
        };
        await request.post("/api/users", { data: anotherUser });
        await page.getByRole("button", { name: "logout" }).click();
        await loginWith(page, "anotheruser", "password");
        await page.getByRole("button", { name: "view" }).click();
        await expect(
          page.getByRole("button", { name: "remove" }),
        ).not.toBeVisible();
      });

      test("it can be deleted by the creator", async ({ page }) => {
        const blogText = page.getByText("Existing Blog");
        const blogElement = blogText.locator("..");
        await page.reload();
        await blogElement.getByRole("button", { name: "view" }).click();
        page.on("dialog", (dialog) => dialog.accept());
        await blogElement.getByRole("button", { name: "remove" }).click();
        await expect(page.getByRole("button", { name: "view" })).not.toBeVisible();
      });
    });

    describe("and multiple blogs exist", () => {
      beforeEach(async ({ page }) => {
        await createBlog(
          page,
          "Blog One",
          "Author One",
          "http://blogone.com",
        );
        await createBlog(
          page,
          "Blog Two",
          "Author Two",
          "http://blogtwo.com",
        );
      });

      test("blogs are ordered by likes in descending order", async ({ page }) => {
        const blogOne = page.getByText("Blog One").locator("..");
        const blogTwo = page.getByText("Blog Two").locator("..");

        await blogOne.getByRole("button", { name: "view" }).click();
        await blogOne.getByRole("button", { name: "like" }).click();
        await blogTwo.getByRole("button", { name: "view" }).click();
        await expect(blogOne.getByText("likes 1")).toBeVisible();
        await blogTwo.getByRole("button", { name: "like" }).click();
        await expect(blogTwo.getByText("likes 1")).toBeVisible();
        await blogTwo.getByRole("button", { name: "like" }).click();
        await expect(blogTwo.getByText("likes 2")).toBeVisible();

        const box1 = await blogOne.boundingBox();
        const box2 = await blogTwo.boundingBox();
        expect(box2.y).toBeLessThan(box1.y);
      });
    });
  });
});
