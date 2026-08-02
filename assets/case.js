// 케이스 페이지 공용: .fi 스크롤 페이드인 (소유: Claude 세션)
(function () {
      if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.fi').forEach(function (el) {
          el.classList.add('vis');
        });
        return;
      }
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('vis');
            obs.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px 20% 0px', threshold: 0 });
      document.querySelectorAll('.fi').forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('vis');
        } else {
          obs.observe(el);
        }
      });
    })();
