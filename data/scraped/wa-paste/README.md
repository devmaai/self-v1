# Washington city data — paste into the Google Sheet

Source sheet: https://docs.google.com/spreadsheets/d/1flngEV3TomsrzcRGcoe497O-DzL1kLL746y6gbHuUfQ/edit

Scraped from selfstorage.com on 2026-11-19 for **Seattle, WA**, **Tacoma, WA** and **Vancouver, WA**.

## What to paste

| Paste this file | Into this tab | Starting cell |
| --- | --- | --- |
| `facilities-rows.csv` (90 rows) | `Facilities` | `A2` (first empty row) |
| `units-rows.csv` (249 rows) | `Units` | `A2` (first empty row) |

The column order and names in these files match the Sheet tabs exactly (52 columns in `Facilities`, 20 in `Units`). Do **not** paste the header row — the tabs already have headers in row 1. The `*-full.csv` files include the header row if you need a reference or want to re-create a tab from scratch.

Per-city source files are also available in `../seattle-wa/`, `../tacoma-wa/` and `../vancouver-wa/`.

## After pasting

The site caches the Sheet for 7 days (`revalidate = 604800`), so trigger a redeploy (or wait for the next one) for the new listings to appear. Until then, the published WA pages fall back to the 12 closest nationwide listings, which will not be Washington facilities.
