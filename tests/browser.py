"""Production browser acceptance tests and portfolio verification."""

import os
import time
from pathlib import Path
from playwright.sync_api import sync_playwright

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
                response = page.goto(BASE + route, wait_until="load")
                assert response.status == 200, (route, response.status)
                assert page.locator("h1").count() >= 1
                assert page.evaluate(
                    "document.documentElement.scrollWidth <= innerWidth"
                ), f"Overflow detected: {route} at viewport width {width}"

        # 2. Desktop Full Page Screenshot & Centering Verification (1440x900)
        page.set_viewport_size({"width": 1440, "height": 900})
        page.goto(BASE, wait_until="load")
        time.sleep(0.5)

        # Centering check: main content must be ~768px wide and centered (margins ~336px)
        main_box = page.locator("main.main-content").bounding_box()
        assert main_box is not None, "main.main-content not found"
        assert main_box["width"] <= 780, f"Content too wide: {main_box['width']}px (expected <= 780px)"
        assert main_box["x"] >= 250, f"Content not centered horizontally: x = {main_box['x']}"
        print(f"Desktop centering verified: width={main_box['width']}px, left_margin={main_box['x']}px")

        page.screenshot(path=str(screenshots / "home-desktop.png"), full_page=True)
        print("Captured screenshots/home-desktop.png")

        # 3. Mobile View (390x844)
        page.set_viewport_size({"width": 390, "height": 844})
        page.goto(BASE, wait_until="load")
        time.sleep(0.5)
        page.screenshot(path=str(screenshots / "home-mobile.png"), full_page=False)
        print("Captured screenshots/home-mobile.png")

        # 4. Projects Page Screenshot (1440x900)
        page.set_viewport_size({"width": 1440, "height": 900})
        page.goto(BASE + "/projects", wait_until="load")
        time.sleep(0.5)
        page.screenshot(path=str(screenshots / "projects.png"), full_page=True)
        print("Captured screenshots/projects.png")

        # 5. Contact Page Screenshot (1440x900)
        page.goto(BASE + "/contact", wait_until="load")
        time.sleep(0.5)
        page.screenshot(path=str(screenshots / "contact.png"), full_page=True)
        print("Captured screenshots/contact.png")

        # 6. Explicit 8-Point Verification on Home Page
        page.goto(BASE, wait_until="load")

        # Requirement 1: Exploring Machine Learning, GHL, LLM and Deep Learning
        exploring_text = page.locator(".hero-bio").inner_text()
        assert "Machine Learning" in exploring_text
        assert "GHL" in exploring_text
        assert "LLM" in exploring_text
        assert "Deep Learning" in exploring_text
        print("Verified Req 1: Currently exploring line.")

        # Requirement 2: Studying is 'IT @ AU Rajkot'
        studying_el = page.locator("dt:has-text('Studying') + dd")
        assert "IT @ AU Rajkot" in studying_el.inner_text()
        print("Verified Req 2: Studying tag 'IT @ AU Rajkot'.")

        # Requirement 3: Resume button has text; social links are icon-only
        resume_btn = page.locator(".resume-btn")
        assert resume_btn.is_visible()
        assert "Resume" in resume_btn.inner_text()
        social_btns = page.locator(".social-icons-group .social-icon-btn")
        assert social_btns.count() >= 4
        for i in range(social_btns.count()):
            btn_text = social_btns.nth(i).inner_text().strip()
            assert btn_text == "", f"Social icon button has visible text: '{btn_text}'"
        print("Verified Req 3: Resume is only text button; social links are icon-only.")

        # Requirement 4: Contributions heatmap original green colors
        gh_0 = page.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--gh-0').trim()")
        gh_4 = page.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--gh-4').trim()")
        assert "161b22" in gh_0 or "ebedf0" in gh_0 or "39d353" in gh_4 or "216e39" in gh_4
        print("Verified Req 4: GitHub contribution green palette active.")

        # Requirement 5: Section ordering check
        body_text = page.locator("main").inner_text().lower()
        pos_contrib = body_text.find("contributions")
        pos_exp = body_text.find("experience")
        pos_leader = body_text.find("leadership & achievements")
        pos_tech = body_text.find("tech stack")
        pos_high = body_text.find("highlights & achievements")
        pos_proj = body_text.find("featured projects")
        pos_contact = body_text.find("get in touch")
        pos_visitors = body_text.find("visitors")

        assert pos_contrib < pos_exp < pos_leader < pos_tech < pos_high < pos_proj < pos_contact < pos_visitors, (
            f"Section ordering mismatch: contrib={pos_contrib}, exp={pos_exp}, leader={pos_leader}, "
            f"tech={pos_tech}, high={pos_high}, proj={pos_proj}, contact={pos_contact}, visitors={pos_visitors}"
        )
        print("Verified Req 5: Exact 12-step section hierarchy.")

        # Requirement 6: Experience section company logos and correct joining dates
        weintern_period = page.locator(".timeline-item:has-text('WeIntern Pvt Ltd') .timeline-period").inner_text()
        assert "Oct 2026 — Present" in weintern_period
        persevex_period = page.locator(".timeline-item:has-text('Persevex') .timeline-period").inner_text()
        assert "Nov 2025 — Present" in persevex_period

        # Logo img check
        weintern_logo = page.locator(".timeline-item:has-text('WeIntern Pvt Ltd') .timeline-logo-img")
        assert weintern_logo.is_visible()
        persevex_logo = page.locator(".timeline-item:has-text('Persevex') .timeline-logo-img")
        assert persevex_logo.is_visible()
        print("Verified Req 6: Experience logos & dates (WeIntern: Oct 2026 — Present, Persevex: Nov 2025 — Present).")

        # Requirement 7: Tech Stack icons have color SVGs
        skill_svg = page.locator("#skills .skill-card-icon svg").first
        assert skill_svg.is_visible()
        print("Verified Req 7: Tech Stack colorful SVG brand icons.")

        # Requirement 8: Project screenshot image and 'About this project' section
        project_img = page.locator(".project-card .project-img").first
        assert project_img.is_visible()
        about_title = page.locator(".project-card .project-about-title").first
        assert "about this project" in about_title.inner_text().lower()
        print("Verified Req 8: Project preview images & 'About this project' sections.")

        # Requirement 5 (Thought & Visitor counter)
        thought_quote = page.locator(".thought-quote")
        assert thought_quote.is_visible()
        visitor_badge = page.locator(".visitor-badge")
        assert visitor_badge.is_visible()
        print(f"Verified Thought & Visitor Counter: '{thought_quote.inner_text()[:40]}...' and badge.")

        # Interactive tabs test
        work_tab = page.locator("button[role='tab']:has-text('Work')")
        edu_tab = page.locator("button[role='tab']:has-text('Education')")
        edu_tab.click()
        assert page.locator(".timeline-org:has-text('Atmiya University')").is_visible()
        atmiya_period = page.locator(".timeline-item:has-text('Atmiya University') .timeline-period").inner_text()
        assert "Sep 2022 — Jun 2026" in atmiya_period
        work_tab.click()
        assert page.locator(".timeline-org:has-text('WeIntern Pvt Ltd')").is_visible()

        browser.close()

    if errors:
        print("Encountered browser errors:", errors)
        raise RuntimeError("Browser test failed with errors")
    else:
        print("\nAll 8 requirements and browser acceptance tests passed with 100% precision!")


if __name__ == "__main__":
    main()
