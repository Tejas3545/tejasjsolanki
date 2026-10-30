"""Production browser acceptance tests and portfolio screenshots."""

import os
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from playwright.sync_api import sync_playwright
from playwright.sync_api import expect

BASE = os.environ.get("PORTFOLIO_BASE_URL", "http://localhost:3000")
ROOT = Path(__file__).resolve().parents[1]
ROUTES = ("/", "/about", "/projects", "/contact")


def main():
    errors = []
    screenshots = ROOT / "screenshots"
    screenshots.mkdir(exist_ok=True)
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        context = browser.new_context()
        page = context.new_page()
        page.on("pageerror", lambda error: errors.append(str(error)))
        for width in (320, 390, 768, 1440):
            page.set_viewport_size({"width": width, "height": 1000})
            for route in ROUTES:
                response = page.goto(BASE + route)
                assert response.status == 200, (route, response.status)
                assert page.locator("h1").count() == 1
                assert page.locator('nav[aria-label="Main navigation"] [aria-current]').count() == 1
                assert page.evaluate(
                    "document.documentElement.scrollWidth <= innerWidth"
                ), f"Overflow: {route} at {width}"
                assert not page.locator('a[href=""], a[href="#"]').count()
        page.set_viewport_size({"width": 1440, "height": 1000})
        page.goto(BASE)
        page.get_by_role("button", name="Preview Atmiya IT Portal").click()
        assert page.locator(".studio-project strong").inner_text() == "Atmiya IT Portal"
        page.get_by_role("button", name="Preview Money Heist Quiz").click()
        assert page.locator(".studio-project strong").inner_text() == "Money Heist Quiz"
        page.get_by_role("button", name="Preview SyncSpend").click()
        page.goto(BASE + "/projects")
        page.get_by_role("button", name="Mobile", exact=False).click()
        assert page.locator(".project-case").count() == 1
        assert page.get_by_role("status").inner_text() == "1 project"
        page.get_by_role("button", name="Web", exact=False).click()
        assert page.locator(".project-case").count() == 2
        page.get_by_role("button", name="All projects", exact=False).click()
        assert page.locator(".project-case").count() == 3
        page.goto(BASE + "/contact")
        page.get_by_role("button", name="Prepare email draft").click()
        assert not page.locator("#name").evaluate("(input) => input.validity.valid")
        page.locator("#name").fill("Test Visitor")
        page.locator("#email").fill("not-an-email")
        assert not page.locator("#email").evaluate("(input) => input.validity.valid")
        page.locator("#email").fill("visitor@example.com")
        page.locator("#message").fill("A useful test enquiry & a question about collaboration.")
        page.get_by_role("button", name="Prepare email draft").click()
        draft = page.get_by_role("link", name="Open email draft")
        assert draft.is_visible()
        query = parse_qs(urlparse(draft.get_attribute("href")).query)
        assert "visitor@example.com" in query["body"][0]
        assert "& a question" in query["body"][0]
        assert "Nothing has been sent yet" in page.locator(".form-status").inner_text()
        page.locator("#message").fill("A changed message should invalidate the old draft.")
        assert not draft.count()
        page.evaluate("""
          Object.defineProperty(navigator, 'clipboard', {
            configurable: true, value: {writeText: async value => {window.copied = value;}}
          });
        """)
        page.get_by_role("button", name="Copy email address").click()
        assert page.locator(".copy-status").inner_text() == "Email copied"
        assert page.evaluate("window.copied") == "tejassolanki5881@gmail.com"
        page.evaluate("""
          Object.defineProperty(navigator, 'clipboard', {
            configurable: true, value: {writeText: async () => {throw new Error('denied');}}
          });
        """)
        page.get_by_role("button", name="Copy email address").click()
        assert "Copy manually" in page.locator(".copy-status").inner_text()
        page.set_viewport_size({"width": 390, "height": 844})
        page.goto(BASE)
        page.wait_for_function("document.documentElement.dataset.motion")
        menu = page.get_by_role("button", name="Menu", exact=True)
        assert not page.locator("#main-nav").is_visible()
        menu.click()
        expect(page.locator("#main-nav")).to_be_visible()
        page.keyboard.press("Escape")
        expect(page.locator("#main-nav")).not_to_be_visible()
        assert menu.evaluate("(element) => document.activeElement === element")
        menu.click()
        page.locator("#main-nav").get_by_role("link", name="About", exact=True).click()
        page.wait_for_url(BASE + "/about")
        expect(page.locator("#main-nav")).not_to_be_visible()
        page.get_by_role("button", name="Motion on").click()
        expect(page.locator("html")).to_have_attribute("data-motion", "paused")
        page.reload()
        expect(page.get_by_role("button", name="Motion off")).to_have_attribute("aria-pressed", "true")
        reduced = browser.new_context(reduced_motion="reduce")
        reduced_page = reduced.new_page()
        reduced_page.goto(BASE)
        expect(reduced_page.get_by_role("button", name="Motion off")).to_be_visible()
        assert reduced_page.locator(".word-underline").evaluate(
            "(element) => getComputedStyle(element).animationName"
        ) == "none"
        reduced_page.keyboard.press("Tab")
        assert reduced_page.locator(".skip-link").evaluate(
            "(element) => document.activeElement === element"
        )
        reduced.close()
        fallback_context = browser.new_context(java_script_enabled=False)
        fallback = fallback_context.new_page()
        fallback.goto(BASE + "/projects")
        assert fallback.locator(".project-case").count() == 3
        assert fallback.locator("h1").is_visible()
        fallback_context.close()
        assert page.goto(BASE + "/does-not-exist").status == 404
        for route, filename, width in (
            ("/", "home-desktop.png", 1440),
            ("/", "home-mobile.png", 390),
            ("/projects", "projects.png", 1440),
            ("/contact", "contact.png", 1440),
        ):
            page.set_viewport_size({"width": width, "height": 1000})
            page.goto(BASE + route)
            page.screenshot(path=str(screenshots / filename), full_page=True)
        browser.close()
    assert not errors, errors
    print("PASS: 16 route/viewport checks, preview selection, filters, form validation,")
    print("draft generation, clipboard success/failure, mobile menu, Escape focus,")
    print("motion persistence, OS reduced motion, keyboard skip link, no-JS content,")
    print("404 response and zero browser script errors. Four screenshots saved.")


if __name__ == "__main__":
    main()
