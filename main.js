(function () {
  "use strict";

  var body = document.body;
  var burger = document.querySelector(".burger");
  var overlay = document.getElementById("mobile-menu");
  var mobileLinks = overlay
    ? overlay.querySelectorAll(".mobile-link, .mobile-cta")
    : [];

  function isMenuOpen() {
    return body.classList.contains("menu-open");
  }

  function openMenu() {
    body.classList.add("menu-open");
    burger.setAttribute("aria-expanded", "true");
    overlay.hidden = false;
  }

  function closeMenu() {
    body.classList.remove("menu-open");
    burger.setAttribute("aria-expanded", "false");
    overlay.hidden = true;
  }

  if (burger && overlay) {
    burger.addEventListener("click", function () {
      if (isMenuOpen()) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isMenuOpen()) {
        closeMenu();
      }
    });

    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu();
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 720 && isMenuOpen()) {
        closeMenu();
      }
    });
  }

  // ---------- Stats count-up ----------

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  var statValues = document.querySelectorAll(".stat-value");

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function formatValue(value, decimals, suffix) {
    var num =
      decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
    return num + suffix;
  }

  function animateValue(el, index) {
    var target = parseFloat(el.getAttribute("data-target"));
    var suffix = el.getAttribute("data-suffix") || "";
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);

    if (reduceMotion) {
      el.textContent = formatValue(target, decimals, suffix);
      return;
    }

    var duration = 1500 + index * 80;
    var startOffset = 480 + index * 90;

    setTimeout(function () {
      var startTime = null;

      function step(timestamp) {
        if (startTime === null) startTime = timestamp;
        var elapsed = timestamp - startTime;
        var progress = Math.min(elapsed / duration, 1);
        var eased = easeOutCubic(progress);
        el.textContent = formatValue(target * eased, decimals, suffix);
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = formatValue(target, decimals, suffix);
        }
      }

      requestAnimationFrame(step);
    }, startOffset);
  }

  if (statValues.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      statValues.forEach(function (el, i) {
        animateValue(el, i);
      });
    } else {
      var fired = false;
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !fired) {
              fired = true;
              statValues.forEach(function (el, i) {
                animateValue(el, i);
              });
              observer.disconnect();
            }
          });
        },
        { threshold: 0.25 }
      );

      var statsSection = document.querySelector(".stats");
      if (statsSection) observer.observe(statsSection);
    }
  }
})();
