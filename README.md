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
arXiv opens `https://arxiv.org/abs/2609.01526`. Code links to
`https://github.com/evoscm/EvoSCM`. BibTeX points to the citation section with a
Copy button. Paper, arXiv, Code, and the citation text are also present in
`index.html` for visitors without JavaScript; keep them in sync when updating
the release metadata.

To update the paper, replace `assets/preprint.pdf` with the new PDF.
