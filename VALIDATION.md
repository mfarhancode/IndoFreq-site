# Validation — 22 October 2026

## Passed

- `python tools/check_site.py`: two pages and 31 local references; unique IDs, one H1 and main landmark per page, English language, viewport, image alt text/dimensions, relative assets and valid local fragments.
- `node tools/check_download_config.cjs`: 12 configuration cases, including empty/malformed/untrusted URLs and both supported GitHub release-asset URL forms. Synthetic test URLs are not actual published assets.
- `node --check script.js` and `node --check config.js`: JavaScript syntax.
- Browser rendering at the actual subdirectory `/indofreq-site/`; homepage, policy and all six referenced image elements loaded on desktop.
- Desktop visual review at 1363px browser width. Responsive frame checks at nominal widths 320, 390 and 768px; their content widths were 305, 375 and 753px after scrollbar space. No horizontal overflow. Policy also checked at 390px.
- Mobile visual review at 320 and 390px, plus desktop hero/features/download/privacy views. Complete app screenshots remain visible; quiz feedback is not cropped away.
- Mobile menu opens and closes, updates `aria-expanded`, closes after selecting Download, and closes on Escape. Escape returns focus to the menu control.
- Keyboard Tab exposes the skip link with a visible outline; Enter moves focus to the main content.
- Download fallback is disabled and clearly labeled; the hero Android button points to the Download section until configured. Web App remains usable.
- Privacy policy navigation and back/home links work.
- Main text, muted text, teal text and primary button foreground/background pairs meet WCAG AA normal-text contrast: 4.65:1 minimum among checked pairs. Reduced-motion CSS removes smooth scrolling and transitions. No reliance on color alone for website controls.
- Original logo bytes match the supplied app PNG exactly. Four actual guest-mode PWA screenshots captured with no private data, reconstructed UI or generated artwork.
- HTTP checks: live PWA, maintainer GitHub profile, Firebase privacy page, GitHub privacy statement and Pages deployment guide returned 200.
- No site-origin JavaScript errors observed; browser-extension metadata errors were unrelated to the website.
- ZIP integrity and contents checked; no APK, Flutter source, credentials, dependencies, QA iframe wrappers or deployment configuration included.

## Known limits / owner setup

- The supplied app repository and Releases API returned **404** to unauthenticated requests. The supplied repository link is preserved as requested, but its public availability is not verified. Confirm its visibility/address before launch.
- No public APK asset URL was available. `config.js` deliberately leaves it empty. Add an actual public GitHub Releases `.apk` URL and verify a signed-out download before announcing Android availability.
- This is website verification, not a new test of Android installation, OAuth, notifications or complete PWA offline behavior. The app source and Firebase deployment were not changed.
- Browser QA used Chromium and responsive iframes, not physical phones or every browser. No screen-reader audit or formal WCAG certification was performed. No-JavaScript behavior was reviewed in source: navigation remains visible and PWA links work; APK fallback remains unavailable until static links are also configured.
- No GitHub repository was created or modified and nothing was deployed. GitHub Pages behavior was checked through relative paths, static packaging and a matching subdirectory preview, not a live Pages deployment.

## Design

Warm off-white, deep teal, system typography and restrained borders. Real screenshots carry the product explanation. The page progresses from practice to features, platform choices and data handling. No external fonts, decorative illustrations, ratings, testimonials, tracking or animation dependencies.
