---
name: screenshot
description: "Capture screenshots of web pages using Playwright for PR documentation, visual QA, or UI review. Supports capturing multiple pages, full-page screenshots, and specific viewport sizes."
user_invocable: true
---

# Screenshot Capture Skill

You are tasked with capturing screenshots of web pages using Playwright. Follow these steps carefully.

## Instructions

1. **Determine what to capture**: Based on the user's request, identify which URLs or pages need screenshots. If no specific pages are given, check git diff for changed frontend files and infer the relevant routes.

2. **Check if the dev server is running**: Run `lsof -i :5173 2>/dev/null | grep LISTEN` to check if the Vite dev server is already running on port 5173. If not running, start it in the background:
   ```bash
   cd client && npm run dev &
   ```
   Wait a few seconds for it to start, then verify it's listening.

3. **Capture screenshots using Python Playwright** (preferred since it's installed system-wide):

   Write a temporary Python script at `/tmp/claude_screenshot.py` and execute it. Use this template, adapting the URLs and filenames as needed:

   ```python
   import sys
   import os
   from playwright.sync_api import sync_playwright

   # Configuration - modify these based on what needs to be captured
   BASE_URL = "http://localhost:5173"
   OUTPUT_DIR = "/tmp/pr-screenshots"
   PAGES = [
       # ("route_path", "filename", optional_width, optional_height)
       # e.g., ("/", "homepage.png", 1280, 720),
       # e.g., ("/dashboard", "dashboard.png"),
   ]
   VIEWPORT_WIDTH = 1280
   VIEWPORT_HEIGHT = 720

   os.makedirs(OUTPUT_DIR, exist_ok=True)

   with sync_playwright() as p:
       browser = p.chromium.launch(headless=True)

       for entry in PAGES:
           route = entry[0]
           filename = entry[1]
           width = entry[2] if len(entry) > 2 else VIEWPORT_WIDTH
           height = entry[3] if len(entry) > 3 else VIEWPORT_HEIGHT

           context = browser.new_context(viewport={"width": width, "height": height})
           page = context.new_page()

           try:
               url = f"{BASE_URL}{route}"
               page.goto(url, wait_until="networkidle", timeout=15000)
               # Wait a moment for any animations to settle
               page.wait_for_timeout(1000)

               filepath = os.path.join(OUTPUT_DIR, filename)
               page.screenshot(path=filepath, full_page=True)
               print(f"Captured: {filepath}")
           except Exception as e:
               print(f"Error capturing {route}: {e}", file=sys.stderr)
           finally:
               context.close()

       browser.close()

   print(f"\nAll screenshots saved to {OUTPUT_DIR}")
   ```

4. **Adapt the script** for the specific pages requested. Common adaptations:
   - If the user wants a specific viewport (e.g., mobile), set `VIEWPORT_WIDTH = 375` and `VIEWPORT_HEIGHT = 812`
   - If authentication is required, add login steps before navigating to protected routes
   - If you need to interact with the page first (open a modal, fill a form), add Playwright actions before the screenshot
   - For before/after comparisons, capture screenshots on the current branch, then note you'd need to checkout main for "before" shots

5. **Upload screenshots to GitHub** for PR embedding. Use the GitHub CLI to upload images as PR comment attachments or embed them directly:

   Option A - If creating a new PR, reference the local screenshot paths and mention them in the PR body. The `gh` CLI doesn't natively support image uploads in PR bodies, so use this workaround:

   ```bash
   # Upload screenshot as a GitHub issue comment (creates a hosted URL)
   # Then use that URL in the PR body
   gh api repos/{owner}/{repo}/issues/{pr_number}/comments \
     -f body="![Screenshot description](/tmp/pr-screenshots/filename.png)"
   ```

   Option B - Commit screenshots to a dedicated branch (not recommended for most cases).

   Option C - Use the Read tool to view the screenshots directly (Claude Code can read images), then describe them in the PR body textually.

6. **Report results**: After capturing, use the Read tool to display each screenshot to the user for verification. List all captured files with their paths.

## Tips

- Always use `wait_until="networkidle"` to ensure the page is fully loaded
- Add `page.wait_for_timeout(1000)` after navigation to let animations settle
- For pages behind auth, you may need to set cookies or localStorage before navigating
- If Playwright browsers aren't installed, run: `playwright install chromium`
- Screenshots are saved to `/tmp/pr-screenshots/` by default - this is cleaned up on reboot
- The Vite dev server runs on port 5173 by default for this project
