# IndoFreq landing website

A standalone, buildless website for https://mfarhancode.github.io/indofreq-site/.
Plain HTML, CSS and a small JavaScript file; no dependencies, backend, analytics or build step. The Flutter project and Firebase deployment are separate and unchanged.

## Publish on GitHub Pages

1. Create a **new public repository named `indofreq-site`** under `mfarhancode`. Free GitHub Pages is available for public repositories.
2. Extract this ZIP. Upload the **contents** of the `indofreq-site` folder to the repository root. `index.html` must be at the root, not inside a second `indofreq-site` folder. Include `.nojekyll` (a dotfile); GitHub Pages will serve these static files without Jekyll processing.
3. Commit the files to `main`.
4. Open **Settings → Pages → Build and deployment**.
5. Select **Deploy from a branch**, branch **main**, folder **/(root)**, then **Save**.
6. Wait for the Pages workflow to succeed. Visit `https://mfarhancode.github.io/indofreq-site/` and open the Privacy policy link too.

No custom domain or paid service is required. Do not select or modify the Flutter app repository. Nothing has been deployed for you.

Official guide: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Android download: one configuration file

No verified public APK URL was available during preparation. The supplied app repository and Releases endpoint returned 404 to unauthenticated requests. It may be private or unavailable. The requested GitHub link is preserved; verify its visibility before launch.

The website intentionally displays **APK not available yet** and keeps the Web App link usable. The hero's Android button leads to this explanation. It does not point to an invented release or a broken APK.

When your signed, tested APK is ready:

1. Create a release in an appropriate **public** GitHub repository and attach the `.apk` as a **release asset**. Do not commit it into this website's source folder.
2. Copy the actual asset download URL, not the release page URL.
3. Edit `config.js`:

```js
window.INDOFREQ_SITE = Object.freeze({
  apkUrl: "",     // Paste the real public GitHub Releases .apk URL here.
  apkVersion: "", // Optional visible version, e.g. your actual release tag.
  apkSize: ""     // Optional actual file size.
});
```

Accepted URL shapes (OWNER, REPO, TAG and FILE are placeholders):
- `https://github.com/OWNER/REPO/releases/download/TAG/FILE.apk`
- `https://github.com/OWNER/REPO/releases/latest/download/FILE.apk`

A valid URL activates both download links. Test the URL in a signed-out/private browser and confirm it downloads the intended APK. A syntactically valid URL does not prove an asset exists. If the app repository stays private, a release in this public website repository can distribute the APK without publishing app source. With JavaScript disabled, the page still works and presents the unavailable fallback; configure a static anchor too if you want APK downloading without JavaScript.

## Edit the website

- `index.html`: page copy, supplied app and repository links.
- `privacy.html`: privacy policy; update when implementation changes.
- `styles.css`: colors, spacing, typography and responsive layouts.
- `config.js`: Android asset URL and optional release metadata.
- `script.js`: progressive mobile navigation and guarded download configuration.
- `assets/indofreq-logo.png`: copied unchanged from `assets/branding/indofreq_logo.png` in the supplied app.
- `assets/screenshots/`: actual live guest-mode PWA captures; see its README.

All local asset paths are relative. Keep that convention for GitHub Pages subdirectory hosting. No root-relative `/assets/` paths, client-side routing, service worker, or Firebase settings are needed for this landing site.

## Preview and check

From the parent of this folder on your own computer:

```sh
python -m http.server 8000
```

Visit `http://localhost:8000/indofreq-site/`. This tests the same subdirectory shape as Pages.

From inside `indofreq-site`:

```sh
python tools/check_site.py
node tools/check_download_config.cjs
node --check script.js
node --check config.js
```

Node is optional for these development checks; visitors need only a browser. Check the page and policy at 320, 390, 768 and desktop widths; open and close the mobile menu with a keyboard; follow local navigation; verify a real APK download after configuration. See `VALIDATION.md` for completed checks and limits. `preview/` contains visual QA captures and may be omitted from deployment.

## Privacy and source basis

Copy was checked against the supplied `indofreq_renamed_project(1).zip`, including `DEVELOPER_GUIDE.md`, local storage, authentication and `lib/cloud/sync/cloud_progress_snapshot.dart`.

Firestore's four summary fields are total words learned, current streak, last active date and installed vocabulary version. Detailed learning records are local; account login is not full recovery. There is no claim of automatic full cloud backups or account deletion through the app. The policy also distinguishes hosting/provider logs from application analytics. Review it when changing the app or adding any website scripts, forms or analytics.
