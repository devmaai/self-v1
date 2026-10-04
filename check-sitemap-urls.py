import xml.etree.ElementTree as ET
import subprocess

root = ET.parse("sitemap-googlebot.xml").getroot()
ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}

urls = [
    x.text
    for x in root.findall("sm:url/sm:loc", ns)
]

problems = []

print(f"Testing {len(urls)} URLs...")

for i, url in enumerate(urls, 1):
    print(f"[{i}/{len(urls)}] {url}")

    result = subprocess.run(
        [
            "curl.exe",
            "--ssl-no-revoke",
            "-A", "Googlebot",
            "-sS",
            "-L",
            "--max-time", "15",
            "-o", "NUL",
            "-w", "%{http_code} %{url_effective}",
            "--",
            url
        ],
        capture_output=True,
        text=True
    )

    output = result.stdout.strip()

    if result.returncode != 0 or not output.startswith("200 "):
        problems.append({
            "url": url,
            "returncode": result.returncode,
            "output": output,
            "error": result.stderr.strip()
        })

print()
print("=" * 60)
print(f"PROBLEMS FOUND: {len(problems)}")
print("=" * 60)

for problem in problems:
    print(problem)
