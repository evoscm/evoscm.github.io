# EvoSCM project page

This repository contains the static EvoSCM project page. It has no build-time
dependencies. In GitHub Settings > Pages, select "Deploy from a branch", branch
`main`, and folder `/(root)` to publish at https://evoscm.github.io/.

## Preview locally

From this directory, run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Add release links

Edit the `RELEASE` object at the top of `assets/js/site.js`. The hero controls
show their labels without status subtitles. Paper and arXiv stay disabled until
their URLs are supplied; Code links to `https://github.com/evoscm/EvoSCM`.
BibTeX points to the citation section, where copying is disabled until the
citation is supplied. The Code link is also present in `index.html` for visitors
without JavaScript; keep it in sync if the repository URL changes.

When the final paper is ready, copy it to `assets/paper.pdf` and set `paper` to
`assets/paper.pdf`.
