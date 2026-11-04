---
name: verify-fixtures-popup
description: Install and drive next-3-games' actual MV3 Chrome popup against explicit provider-boundary success and failure fixtures.
---
# Fixtures popup verification

## Launch
This repository is a Chrome MV3 extension, not a Next.js app. From the repository root use Node22.12+ and `npm ci --ignore-scripts --prefix .cursor/skills/verify-fixtures-popup`. Chrome must support dynamic extension loading; set CHROME_PATH if not /usr/bin/google-chrome. The helper launches a fresh private browser with extension debugging enabled and installs this actual repository. It opens the manifest's popup.html using the returned extension ID. No user's saved profile/extension installation is changed. No local server, account or secret is required.

## Doctor
The helper first checks MV3, zero general permissions and the single TheSportsDB host permission. It requires successful real extension installation and a fresh rendered fixture/error selector before evaluating each scenario. An ordinary HTTP-served page is not an extension proof. After failure rerun the helper in a fresh output directory; it closes the failed browser rather than reusing an uncertain state.

## Drive
`node .cursor/skills/verify-fixtures-popup/helpers/verify.mjs /tmp/fixtures-proof` drives the actual installed popup with response fixtures intercepted only at its existing TheSportsDB fetch boundary. Scenarios: first three of four games with time formatting and literal HTML title; no upcoming events; HTTP500; malformed response shape; invalid row; invalid JSON; network failure. The requested URL must be the real endpoint/team ID; unknown external requests fail. There is no internal state setter or test-only product endpoint. No fixture response is evidence of current real fixtures.

## Evidence
result.json records extension ID, manifest checks, request URLs, scenario outcomes and page errors. Each scenario has a screenshot. Inspect PNG pixels for readability and errors; no overflow alone is not visual proof. The provider boundary is deliberately controlled for repeatability and failure coverage. A live provider fetch timed out during setup; live fixture freshness/availability remains unverified. Do not read a fabricated fixture date as an actual sporting schedule.

## Cleanup
Helper closes only its own browser, removing its ephemeral extension/profile. Evidence remains at the named output directory. Confirm result.json and PNGs survive. Never install into a shared user profile or kill Chrome by process name. Each run is isolated, so concurrent runs do not share extension state.

## Coverage and maintenance
Opening the real extension popup page is proved; clicking the toolbar action and true popup-window auto-close after15seconds remain unverified. No current fixture accuracy, provider reliability, timezone conversion, broad device/accessibility or packaged-store-install claim. The old workflow targets main, not the actual default manutd-fixtures-extension branch, and uses unpinned lint tools/retired action versions. It is not CI proof and is left for scoped followthrough rather than silently disabling gates. Use /maintain-verification-skill after popup/provider changes, keeping product regressions separate from map corrections.
