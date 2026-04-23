from __future__ import annotations

import re
from datetime import datetime
from pathlib import Path


def count(pattern: str, text: str) -> int:
    return len(re.findall(pattern, text, re.IGNORECASE))


def has(pattern: str, text: str) -> bool:
    return bool(re.search(pattern, text, re.IGNORECASE))


def main() -> None:
    root = Path(__file__).resolve().parents[2]
    pages_dir = root / "pages"
    files = [root / "index.html", *sorted(pages_dir.glob("*.html"), key=lambda path: path.name)]
    out_dir = root / "docs" / "phase0"
    out_dir.mkdir(parents=True, exist_ok=True)

    component_lines: list[str] = []
    interaction_lines: list[str] = []

    for file_path in files:
        text = file_path.read_text(encoding="utf-8")
        name = file_path.name

        component_lines.append(
            "- "
            + name
            + " | "
            + " ".join(
                [
                    f"header:{str(has(r'<header\b', text)).lower()}",
                    f"nav:{str(has(r'<nav\b', text)).lower()}",
                    f"main:{str(has(r'<main\b', text)).lower()}",
                    f"section:{str(has(r'<section\b', text)).lower()}",
                    f"aside:{str(has(r'<aside\b', text)).lower()}",
                    f"footer:{str(has(r'<footer\b', text)).lower()}",
                    f"form:{str(has(r'<form\b', text)).lower()}",
                    f"table:{str(has(r'<table\b', text)).lower()}",
                    f"modal:{str(has(r'modal|dialog|aria-modal', text)).lower()}",
                    f"card-like:{str(has(r'card|rounded-\[|shadow|border', text)).lower()}",
                ]
            )
        )

        interaction_lines.append(
            f"- {name} | "
            f"onclick:{count(r'onclick\s*=', text)} "
            f"onchange:{count(r'onchange\s*=', text)} "
            f"onsubmit:{count(r'onsubmit\s*=', text)} "
            f"scriptBlocks:{count(r'<script\b', text)} "
            f"dataToggle:{count(r'data-(toggle|target|modal|drawer)', text)} "
            f"buttons:{count(r'<button\b', text)} "
            f"href#:{count(r'href\s*=\s*\"#\"', text)}"
        )

    generated_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    audited_files = [f"- {file_path.name}" for file_path in files]

    component_content = [
        "# Phase 0 Component Inventory",
        "",
        f"Generated: {generated_at}",
        "",
        "## Files audited",
        *audited_files,
        "",
        "## Structural summary",
        *component_lines,
        "",
    ]
    interaction_content = [
        "# Phase 0 Interaction Inventory",
        "",
        f"Generated: {generated_at}",
        "",
        "## Files audited",
        *audited_files,
        "",
        "## Interaction summary",
        *interaction_lines,
        "",
    ]

    (out_dir / "component-inventory.md").write_text("\n".join(component_content), encoding="utf-8")
    (out_dir / "interaction-inventory.md").write_text("\n".join(interaction_content), encoding="utf-8")
    print("Phase 0 inventory files generated successfully")


if __name__ == "__main__":
    main()
