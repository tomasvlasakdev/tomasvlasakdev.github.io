// Shared by every page (inlined by the build): theme toggle and language menu.
(function () {
  var root = document.documentElement;
  var btn = document.querySelector(".theme-toggle");
  var label = btn.querySelector(".theme-label");
  var media = window.matchMedia("(prefers-color-scheme: dark)");
  var still = window.matchMedia("(prefers-reduced-motion: reduce)");
  function isDark() {
    var t = root.dataset.theme;
    return t ? t === "dark" : media.matches;
  }
  function sync() {
    var dark = isDark();
    root.classList.toggle("is-dark", dark);
    label.textContent = dark ? btn.dataset.toLight : btn.dataset.toDark;
  }
  function flip() {
    var next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    sync();
  }
  btn.addEventListener("click", function () {
    if (!document.startViewTransition || still.matches) return flip();
    // Reveal the new theme as a circle growing out of the button.
    var r = btn.getBoundingClientRect();
    var x = r.left + r.width / 2, y = r.top + r.height / 2;
    var end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(flip).ready.then(function () {
      root.animate(
        { clipPath: ["circle(0px at " + x + "px " + y + "px)", "circle(" + end + "px at " + x + "px " + y + "px)"] },
        { duration: 550, easing: "cubic-bezier(.4,0,.2,1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  });
  if (media.addEventListener) media.addEventListener("change", sync);
  sync();

  // Language menu: remember an explicit choice so English pages stop auto-redirecting.
  var menu = document.querySelector(".lang");
  document.querySelectorAll("[data-lang]").forEach(function (a) {
    a.addEventListener("click", function () {
      try { localStorage.setItem("lang", a.dataset.lang); } catch (e) {}
    });
  });
  document.addEventListener("click", function (e) { if (menu.open && !menu.contains(e.target)) menu.open = false; });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu.open) { menu.open = false; menu.querySelector("summary").focus(); } });
})();
