# Feedback World Model — Project Page

Project webpage for the paper:
**Feedback World Model Enables Precise Guidance of Diffusion Policy**
*Tuo An\*, Jindou Jia\*, Gen Li, Jingliang Li, Chuhao Zhou, Pengfei Liu, Bofan Lyu, Jiaqi Bai, Xinying Guo, Geng Li, Jianfei Yang†*
MARS Lab, Nanyang Technological University, Singapore

\* Equal contribution. † Corresponding author.

The page mirrors the layout and dark-mode aesthetic of [Much Ado About Noising](https://simchowitzlabpublic.github.io/much-ado-about-noising-project/), itself built on the [Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template) (Nerfies lineage).

## Local preview

```bash
cd /Users/lijingliang/Desktop/fwm_project_page
python3 -m http.server 8765
# then open http://localhost:8765
```

A pre-configured launch entry also exists in the parent project's `.claude/launch.json` under the name `fwm-page`, so it can be started via the Claude Code preview MCP.

## Directory layout

```
fwm_project_page/
├── index.html                     # main page
├── README.md
├── .claude/launch.json            # local preview server config
└── static/
    ├── css/
    │   ├── bulma.min.css          # vendored Bulma 0.9.4
    │   └── index.css              # dark theme ported from Much Ado + FWM overrides
    ├── js/
    │   └── index.js               # BibTeX copy button + placeholder-button guard
    ├── images/                    # 9 figures (PDF→PNG via pdftoppm @ 250 dpi)
    │   ├── teaser.png             # ← Figs/method_latest.pdf
    │   ├── framework.png          # ← Figs/framework.png (already PNG)
    │   ├── method_overview.png    # ← Figs/framework_overview.pdf
    │   ├── sim_tasks.png          # ← Figs/simulated tasks.pdf
    │   ├── prediction_mse.png     # ← Figs/latent_prediction_mse_with_reduction.pdf
    │   ├── real_world_results.png # ← Figs/real-world task results.png (downsampled)
    │   ├── real_world_bar.png     # ← Figs/real_world_bar_chart.pdf
    │   ├── trajectories.png       # ← Figs/trajectories.pdf
    │   └── action_aware.png       # ← Figs/action-aware visualize.pdf
    └── pdfs/
        └── feedback_world_model.pdf  # ← copy of Overleaf draft.pdf
```

## TODO before public release

The current page is configured for **double-blind submission stage**:

| What | Where | How |
|---|---|---|
| arXiv link | `index.html` near line 99 | Replace `href="#"` on arXiv button with the arXiv URL and remove `is-placeholder` class. |
| Code link | `index.html` near line 105 | Replace `href="#"` on Code button with GitHub URL and remove `is-placeholder` class. |
| Teaser video | `index.html` teaser section | Optional: replace `<img src="static/images/teaser.png">` block with an `<video controls loop playsinline>` pointing at a `static/videos/teaser.mp4`. |
| BibTeX | `index.html` `#BibTeX` section | Replace the `@misc{feedbackworldmodel2025,...}` block with the camera-ready entry once known. |
| Favicon | `<link rel="icon">` in `<head>` | Replace the inline SVG data URI with a proper `favicon.ico` if desired. |

## Regenerating figures

If you update a source PDF in the Overleaf project, regenerate its PNG with:

```bash
SRC="/Users/lijingliang/Downloads/Feedback_World_Model/Figs"  # adjust to your local copy
DST="./static/images"
pdftoppm -png -r 250 -singlefile "$SRC/<source>.pdf" "$DST/<target>"
# downsample if > 1.5 MB:
sips -Z 2000 "$DST/<target>.png" --out "$DST/<target>.png"
```

## Tech stack

- HTML + [Bulma 0.9.4](https://bulma.io) (vendored, no CDN at load time)
- [Open Sans](https://fonts.google.com/specimen/Open+Sans) via Google Fonts (300–800 weights)
- [Font Awesome 6.4.0](https://fontawesome.com) + [Academicons](https://jpswalsh.github.io/academicons/) via CDN (icon-only; pulled in as needed for `<i>` glyphs)
- No JS framework; ~30 lines of vanilla JS for the BibTeX copy button

## License

Page template is CC BY-SA 4.0 (inherited from Academic Project Page Template / Nerfies). Paper content is © the authors.
