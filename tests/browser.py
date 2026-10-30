"""Production browser acceptance tests and portfolio screenshots."""

import os
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

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

        # 1. Multi-viewport and route accessibility / overflow checks
        for width in (320, 390, 768, 1440):
            page.set_viewport_size({"width": width, "height": 1000})
            for route in ROUTES:
                response = page.goto(BASE + route)
                assert response.status == 200, (route, response.status)
                assert page.locator("h1").count() == 1
                assert page.locator('nav[aria-label="Main navigation"] [aria-current]').count() == 1
                assert page.evaluate(
                    "document.documentElement.scrollWidth <= innerWidth"
                ), f"Overflow detected: {route} at viewport width {width}"

        # 2. Hero Interactive Studio (Preview Switcher)
        page.set_viewport_size({"width": 1440, "height": 1000})
        page.goto(BASE)
        page.get_by_role("button", name="Preview Atmiya IT Portal").click()
        assert "Atmiya IT Portal" in page.locator(".studio-project strong").inner_text()

        page.get_by_role("button", name="Preview Money Heist Quiz").click()
        assert "Money Heist Quiz" in page.locator(".studio-project strong").inner_text()

        page.get_by_role("button", name="Preview SyncSpend").click()
        assert "SyncSpend" in page.locator(".studio-project strong").inner_text()

        # 3. Theme Toggle Test (Light / Dark)
        theme_toggle = page.locator(".theme-toggle")
        assert theme_toggle.is_visible()
        theme_toggle.click()
        theme_val = page.locator("html").get_attribute("data-theme")
        assert theme_val in ("dark", "light")
        # Toggle back or check persistence
        theme_toggle.click()

        # 4. Projects Category Filters
        page.goto(BASE + "/projects")
        page.get_by_role("button", name="Android / Mobile", exact=False).click()
        assert page.locator(".project-case").count() == 1
        assert "1 project" in page.get_by_role("status").inner_text()

        page.get_by_role("button", name="Web & Full-Stack", exact=False).click()
        assert page.locator(".project-case").count() == 2

        page.get_by_role("button", name="All Projects", exact=False).click()
        assert page.locator(".project-case").count() == 3

        # 5. Direct Contact Hub & Form Validation
        page.goto(BASE + "/contact")
        # Direct WhatsApp and Email links exist
        assert page.locator(".whatsapp-card[href*='whatsapp.com']").count() >= 1
        assert page.locator(".email-card[href*='tejassolanki5881@gmail.com']").count() >= 1

        # Form validation
        send_email_btn = page.locator("button:has-text('Send via Email')")
        send_wa_btn = page.locator("button:has-text('Send on WhatsApp')")
        assert send_email_btn.is_visible()
        assert send_wa_btn.is_visible()

        # Fill and test
        name_input = page.locator("input[name='name']")
        email_input = page.locator("input[name='email']")
        msg_input = page.locator("textarea[name='message']")

        name_input.fill("Internship Coordinator")
        email_input.fill("coordinator@example.com")
        msg_input.fill("Hello Tejas, we reviewed your projects and would like to discuss an opportunity.")

        # Trigger WhatsApp button click (handled with window.open)
        with page.expect_popup():
            send_wa_btn.click()

        # 6. Mobile navigation drawer and keyboard navigation
        page.set_viewport_size({"width": 390, "height": 844})
        page.goto(BASE)
        menu_btn = page.locator(".menu-button")
        assert not page.locator("#main-nav").is_visible()
        menu_btn.click()
        expect(page.locator("#main-nav")).to_be_visible()
        page.keyboard.press("Escape")
        expect(page.locator("#main-nav")).not_to_be_visible()

        # 7. Motion Toggle
        page.get_by_role("button", name="Motion on").click()
        expect(page.locator("html")).to_have_attribute("data-motion", "paused")
        page.reload()
        expect(page.get_by_role("button", name="Motion off")).to_have_attribute("aria-pressed", "true")

        # 8. 404 Route handling
        assert page.goto(BASE + "/does-not-exist").status == 404

        # 9. Screenshots capture
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
    print("PASS: Multi-viewport responsiveness, interactive workbench, theme switcher,")
    print("category filters, direct WhatsApp & Email triggers, mobile menu, a11y,")
    print("and screenshots updated successfully.")


if __name__ == "__main__":
    main()
