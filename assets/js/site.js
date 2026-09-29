/*
 * Public release metadata lives here so the page can be updated in one place.
 * Use null until an artifact is public.
 */
const RELEASE = {
  paper: "assets/preprint.pdf",
  arxiv: "https://arxiv.org/abs/2609.01526",
  code: "https://github.com/evoscm/EvoSCM",
  bibtex: `@article{zhao2026evoscm,
  title={{EvoSCM}: Scientific Belief Revision Through Causal Model Evolution and Experimentation},
  author={Zhao, Qing and Li, Haowei and Deng, Weijian and Yang, Sibei and Wei, Pengxu and Lin, Liang},
  journal={arXiv preprint arXiv:2609.01526},
  year={2026}
}`,
};

const releaseLabels = {
  paper: "Paper",
  arxiv: "arXiv",
  code: "Code",
};

document.querySelectorAll("[data-release]").forEach((link) => {
  const key = link.dataset.release;
  const url = RELEASE[key];
  const label = link.querySelector("span");

  if (!url) {
    link.setAttribute("aria-disabled", "true");
    link.addEventListener("click", (event) => event.preventDefault());
    return;
  }

  link.href = url;
  link.removeAttribute("aria-disabled");
  if (/^https?:/.test(url)) {
    link.target = "_blank";
    link.rel = "noreferrer";
  }
  label.textContent = releaseLabels[key];
});

const bibtexNode = document.querySelector("[data-bibtex]");
const copyButton = document.querySelector("[data-copy-bib]");

if (RELEASE.bibtex && bibtexNode && copyButton) {
  bibtexNode.textContent = RELEASE.bibtex.trim();
  copyButton.disabled = false;
  copyButton.textContent = "Copy";

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(RELEASE.bibtex.trim());
      copyButton.textContent = "Copied";
      window.setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 1600);
    } catch {
      copyButton.textContent = "Select text to copy";
    }
  });
}

const header = document.querySelector("[data-header]");
const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 16);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const tabs = [...document.querySelectorAll("[data-tab]")];
const panels = [...document.querySelectorAll("[data-panel]")];

const activateTab = (tab) => {
  tabs.forEach((item) => {
    const active = item === tab;
    item.setAttribute("aria-selected", String(active));
    item.tabIndex = active ? 0 : -1;
  });

  panels.forEach((panel) => {
    panel.hidden = panel.dataset.panel !== tab.dataset.tab;
  });
};

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(tab));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();

    let nextIndex = index;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;

    activateTab(tabs[nextIndex]);
    tabs[nextIndex].focus();
  });
});

const dialog = document.querySelector("[data-lightbox-dialog]");
const dialogImage = document.querySelector("[data-lightbox-image]");
const dialogCaption = document.querySelector("[data-lightbox-caption]");

document.querySelectorAll("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!dialog || !dialogImage || !dialogCaption) return;
    const sourceImage = button.querySelector("img");
    dialogImage.src = button.dataset.lightbox;
    dialogImage.alt = sourceImage?.alt ?? "Expanded research figure";
    dialogCaption.textContent = button.dataset.caption ?? "";
    dialog.showModal();
  });
});

document.querySelector("[data-lightbox-close]")?.addEventListener("click", () => dialog?.close());

dialog?.addEventListener("click", (event) => {
  const bounds = dialog.getBoundingClientRect();
  const outside =
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom;
  if (outside) dialog.close();
});
