export function initStickyNav(navEl) {
  if (!navEl || navEl.dataset.stickyInitialized) return () => {};
  navEl.dataset.stickyInitialized = "true";

  let sentinel = navEl.previousElementSibling;
  if (!sentinel || !sentinel.classList.contains("pe-sticky-sentinel")) {
    sentinel = document.createElement("div");
    sentinel.className = "pe-sticky-sentinel";
    sentinel.setAttribute("aria-hidden", "true");
    navEl.parentNode.insertBefore(sentinel, navEl);
  }

  const header = document.querySelector(".top-header");
  const mainWrapper = document.querySelector(".main-content-wrapper");

  function update() {
    if (!navEl.isConnected) {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      return;
    }

    const headerBottom = header ? header.getBoundingClientRect().bottom : 60;
    const isStuck = sentinel.getBoundingClientRect().top <= headerBottom;
    navEl.classList.toggle("is-stuck", isStuck);

    if (isStuck && mainWrapper) {
      const wrapperRect = mainWrapper.getBoundingClientRect();
      const sentinelRect = sentinel.getBoundingClientRect();
      const shiftLeft = Math.max(0, Math.round(sentinelRect.left - wrapperRect.left));
      const totalWidth = Math.round(wrapperRect.width);

      navEl.style.setProperty("--stuck-shift-left", `-${shiftLeft}px`);
      navEl.style.setProperty("--stuck-width", `${totalWidth}px`);
    } else {
      navEl.style.removeProperty("--stuck-shift-left");
      navEl.style.removeProperty("--stuck-width");
    }
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  update();

  return () => {
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
  };
}

