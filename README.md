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
show their labels without status subtitles. Paper opens `assets/preprint.pdf`;
arXiv stays disabled until its URL is supplied. Code links to
`https://github.com/evoscm/EvoSCM`.
BibTeX points to the citation section, where copying is disabled until the
citation is supplied. Paper and Code links are also present in `index.html` for
visitors without JavaScript; keep them in sync if their URLs change.

To update the paper, replace `assets/preprint.pdf` with the new PDF.
