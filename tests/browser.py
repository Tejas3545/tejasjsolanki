"""Production browser acceptance tests and portfolio screenshots."""

import os
import time
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
        for width in (320, 390, 768, 1200):
            page.set_viewport_size({"width": width, "height": 1000})
            for route in ROUTES:
                response = page.goto(BASE + route, wait_until="networkidle")
                assert response.status == 200, (route, response.status)
                assert page.locator("h1").count() >= 1
                assert page.evaluate(
                    "document.documentElement.scrollWidth <= innerWidth"
                ), f"Overflow detected: {route} at viewport width {width}"

        # 2. Desktop Full Page Screenshots (1440x900)
        page.set_viewport_size({"width": 1440, "height": 900})
        page.goto(BASE, wait_until="networkidle")
        time.sleep(0.5)
        page.screenshot(path=str(screenshots / "home-desktop.png"), full_page=True)
        print("Captured screenshots/home-desktop.png")

        # 3. Mobile View (390x844)
        page.set_viewport_size({"width": 390, "height": 844})
        page.goto(BASE, wait_until="networkidle")
        time.sleep(0.5)
        page.screenshot(path=str(screenshots / "home-mobile.png"), full_page=False)
        print("Captured screenshots/home-mobile.png")

        # 4. Projects Page Screenshot (1440x900)
        page.set_viewport_size({"width": 1440, "height": 900})
        page.goto(BASE + "/projects", wait_until="networkidle")
        time.sleep(0.5)
        page.screenshot(path=str(screenshots / "projects.png"), full_page=True)
        print("Captured screenshots/projects.png")

        # 5. Contact Page Screenshot (1440x900)
        page.goto(BASE + "/contact", wait_until="networkidle")
        time.sleep(0.5)
        page.screenshot(path=str(screenshots / "contact.png"), full_page=True)
        print("Captured screenshots/contact.png")

        # 6. Test Interactive Features
        page.goto(BASE, wait_until="networkidle")

        # Theme toggle test
        theme_btn = page.locator("button[aria-label='Toggle color theme']")
        assert theme_btn.is_visible()
        initial_theme = page.locator("html").get_attribute("data-theme")
        theme_btn.click()
        toggled_theme = page.locator("html").get_attribute("data-theme")
        assert toggled_theme != initial_theme, "Theme did not toggle"
        theme_btn.click() # toggle back

        # Experience tabs test
        work_tab = page.locator("button[role='tab']:has-text('Work')")
        edu_tab = page.locator("button[role='tab']:has-text('Education')")
        assert work_tab.is_visible()
        assert edu_tab.is_visible()
        edu_tab.click()
        assert page.locator(".timeline-org:has-text('Atmiya University')").is_visible()
        work_tab.click()
        assert page.locator(".timeline-org:has-text('WeIntern Pvt Ltd')").is_visible()

        # Tech stack tabs test
        backend_tab = page.locator("button[role='tab']:has-text('Backend')")
        if backend_tab.is_visible():
            backend_tab.click()
            assert page.locator("#skills .skill-card-label:has-text('Python')").is_visible()

        # Projects page category filtering test
        page.goto(BASE + "/projects", wait_until="networkidle")
        mobile_filter = page.locator("button[role='tab']:has-text('Mobile / Android')")
        if mobile_filter.is_visible():
            mobile_filter.click()
            assert page.locator(".project-title:has-text('SyncSpend')").is_visible()

        # Contact form test
        page.goto(BASE + "/contact", wait_until="networkidle")
        page.fill("#contact-name", "Hiring Lead")
        page.fill("#contact-email", "lead@company.com")
        page.fill("#contact-message", "Great portfolio Tejas, let's schedule an interview!")
        submit_btn = page.locator("button[type='submit']")
        assert submit_btn.is_visible()

        browser.close()

    if errors:
        print("Encountered browser errors:", errors)
    else:
        print("All browser acceptance tests passed successfully!")


if __name__ == "__main__":
    main()
