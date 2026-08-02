// 케이스 페이지 공용: 목차 스크롤스파이 (소유: Claude 세션)
(function () {
      var toc = document.querySelector(".page-toc");
      if (!toc) return;
      var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
      var map = new Map();
      links.forEach(function (a) {
        var el = document.getElementById(a.getAttribute("href").slice(1));
        if (el) map.set(el.closest("section") || el, a);
      });
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var link = map.get(entry.target);
          if (!link) return;
          links.forEach(function (l) { l.classList.remove("active"); });
          link.classList.add("active");
        });
      }, { rootMargin: "-15% 0px -75% 0px" });
      map.forEach(function (_, el) { obs.observe(el); });
    })();
