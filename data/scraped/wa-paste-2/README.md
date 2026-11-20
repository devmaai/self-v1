# Washington city data — batch 2: Spokane and Bellevue

Source sheet: https://docs.google.com/spreadsheets/d/1flngEV3TomsrzcRGcoe497O-DzL1kLL746y6gbHuUfQ/edit

Scraped from selfstorage.com on 2026-11-20 for **Spokane, WA** and **Bellevue, WA**.

This batch is deduplicated against the WA rows already in the Sheet (67 facilities and 188 unit rows at the time of export), so pasting it will not create duplicate facilities or units. Bellevue listings that had already arrived with the Seattle scrape are excluded from this file and will still appear on the Bellevue page.

## What to paste

| Paste this file | Into this tab | Starting cell |
| --- | --- | --- |
| `facilities-rows.csv` (37 rows) | `Facilities` | first empty row in column A |
| `units-rows.csv` (79 rows) | `Units` | first empty row in column A |

The column order and names in these files match the Sheet tabs exactly (52 columns in `Facilities`, 20 in `Units`). Do **not** paste the header row — the tabs already have headers in row 1. The `*-full.csv` files include the header row if you need a reference or want to re-create a tab from scratch.

Per-city source files are also available in `../spokane-wa/` (30 facilities, 57 units) and `../bellevue-wa/` (30 facilities, 88 units). Those are the raw scrape results before deduplication against the Sheet.

## After pasting

The site caches the Sheet for 7 days (`revalidate = 604800`), so trigger a redeploy for the new listings to appear. Until then, the published Spokane and Bellevue pages fall back to the closest nationwide listings, which will not be Washington facilities.
