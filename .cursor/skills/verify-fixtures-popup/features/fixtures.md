# Fixture rendering

## Sub-features
Provider response displays first3 eventnames/leagues/date and HH:MM. HTML-looking data must stay literal text. Realproviderfreshness unverified.

## How to get to it (user POV)
Load the unpacked extension in Chrome and open its toolbar action. Verification instead opens the real installed extension popup page directly.

## Driving it with Puppeteer
Run helper from SKILL.md. It controls only the externalfetch boundary and records actualpopup DOM/pixels.

## Gotchas
Fixture data is fabricated, not a current schedule. Headlesspopup-tab cannot certify true toolbar-popup autoclose. Nouserprofile is used.
