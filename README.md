# KoanCare Web

Public static entry for KoanCare's online study. This repository contains only the public entry page and the current public connection address. It contains no API keys, prompts, questionnaires, participant records, or backend source.

GitHub Pages serves this entry. The study itself runs on the researcher's computer through a free Cloudflare Quick Tunnel. The computer, local application and tunnel must remain running while the study is open.

## Enable GitHub Pages

Settings → Pages → Deploy from a branch → main → /(root) → Save.

Expected entry URL after Pages is enabled: https://gabeva621.github.io/KoanCare-Web/

## If the connection changes

Quick Tunnel hostnames change when a new tunnel is created. Update only `origin` in `connection.json` to the new HTTPS `trycloudflare.com` origin. The GitHub Pages entry URL stays the same. To close the entry, set `enabled` to `false`.

Quick Tunnels are intended for development/testing and have no uptime guarantee. Start with a small remote trial, and verify access on participants' actual networks. The underlying application's consent, privacy, withdrawal and research-version controls still apply.
