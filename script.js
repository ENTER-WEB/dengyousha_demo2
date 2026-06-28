(function () {
  "use strict";

  const header = document.getElementById("siteHeader");
  const menuButton = document.getElementById("menuButton");
  const globalNav = document.getElementById("globalNav");
  const worksTrack = document.getElementById("worksTrack");
  const workPrev = document.getElementById("workPrev");
  const workNext = document.getElementById("workNext");
  const pageTop = document.getElementById("pageTop");
  const demoModal = document.getElementById("demoModal");
  const spModal = document.getElementById("spModal");
  const countNumbers = document.querySelectorAll(".count-number");

  function updateScrollState() {
    const scrolled = window.scrollY > 16;
    header.classList.toggle("is-scrolled", scrolled);
    pageTop.classList.toggle("is-visible", window.scrollY > 500);
  }

  menuButton.addEventListener("click", function () {
    const isOpen = globalNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
  });

  globalNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      globalNav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "メニューを開く");
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      const headerHeight = header.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  function openDemoModal() {
    if (!demoModal) return;
    demoModal.classList.add("is-open");
    demoModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeDemoModal() {
    if (!demoModal) return;
    demoModal.classList.remove("is-open");
    demoModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function openSpModal() {
    if (!spModal || sessionStorage.getItem("spModalClosed") === "1") return;
    spModal.classList.add("is-open");
    spModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeSpModal() {
    if (!spModal) return;
    spModal.classList.remove("is-open");
    spModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    sessionStorage.setItem("spModalClosed", "1");
  }

  document.querySelectorAll('a[href="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      openDemoModal();
    });
  });

  document.querySelectorAll("[data-demo-close]").forEach(function (button) {
    button.addEventListener("click", closeDemoModal);
  });

  document.querySelectorAll("[data-sp-close]").forEach(function (button) {
    button.addEventListener("click", closeSpModal);
  });

  document.querySelectorAll("[data-demo-top]").forEach(function (link) {
    link.addEventListener("click", function () {
      closeDemoModal();
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeDemoModal();
      closeSpModal();
    }
  });

  if (window.matchMedia("(max-width: 1023px)").matches) {
    window.setTimeout(openSpModal, 250);
  }

  function scrollWorks(direction) {
    if (!worksTrack) return;
    const amount = Math.max(280, worksTrack.clientWidth * 0.72);
    worksTrack.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  workPrev.addEventListener("click", function () {
    scrollWorks(-1);
  });

  workNext.addEventListener("click", function () {
    scrollWorks(1);
  });

  pageTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  function animateCount(element) {
    const target = Number(element.dataset.count || 0);
    const decimals = Number(element.dataset.decimals || 0);
    const duration = 1300;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;

      element.textContent = decimals > 0 ? value.toFixed(decimals) : String(Math.floor(value));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        element.textContent = decimals > 0 ? target.toFixed(decimals) : String(Math.round(target));
      }
    }

    requestAnimationFrame(tick);
  }

  if ("IntersectionObserver" in window && countNumbers.length > 0) {
    const countObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.45 });

    countNumbers.forEach(function (number) {
      countObserver.observe(number);
    });
  } else {
    countNumbers.forEach(function (number) {
      const target = Number(number.dataset.count || 0);
      const decimals = Number(number.dataset.decimals || 0);
      number.textContent = decimals > 0 ? target.toFixed(decimals) : String(Math.round(target));
    });
  }

  window.addEventListener("scroll", updateScrollState, { passive: true });
  updateScrollState();
})();
