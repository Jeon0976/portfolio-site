// 라이트/다크 토글 — 시스템 추종 기본, 클릭 시 고정(localStorage)
(function () {
  var root = document.documentElement;
  function effective() {
    if (root.dataset.theme) return root.dataset.theme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function bind(btn) {
    btn.addEventListener('click', function () {
      var next = effective() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }
  document.querySelectorAll('.theme-toggle').forEach(bind);
})();
