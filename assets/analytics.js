/* ─────────────────────────────────────────────────────────────
   analytics.js — Google Analytics 4 (Claude 세션)
   측정 ID를 아래 GA_ID 한 곳에만 넣으면 전 페이지에 적용된다.
   플레이스홀더(G-XXXXXXXXXX)인 동안에는 아무 요청도 보내지 않는다.

   자동 수집(GA4 Enhanced Measurement): 페이지뷰·스크롤 90%·외부 링크·파일 다운로드·세션.
   아래 커스텀 이벤트만 코드로 추가한다.
   ──────────────────────────────────────────────────────────── */
(function () {
  var GA_ID = 'G-0Z1CG69S0Q'; // GA4 측정 ID (analytics.google.com · portfolio-site 스트림)

  var ready = GA_ID && GA_ID.indexOf('XXXX') === -1;

  // gtag 부트스트랩
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  if (ready) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  // ID가 없을 때도 콘솔로 확인 가능하게 (배선 자체는 항상 동작)
  function track(name, params) {
    if (ready) gtag('event', name, params || {});
    else if (window.console) console.log('[analytics:dry-run]', name, params || {});
  }

  function wire() {
    // 1) 이력서 PDF 다운로드/열기 (★채용 관심)
    // 2) 연락 클릭 (★연락 의사)
    // 3) 프로젝트 상세 진입
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a, button');
      if (!a) return;
      var href = (a.getAttribute && a.getAttribute('href')) || '';

      if (/\.pdf(\?|#|$)/i.test(href) || a.hasAttribute('download')) {
        track('resume_download', { location: location.pathname });
        return;
      }
      if (href.indexOf('mailto:') === 0) {
        track('contact_click', { method: 'email' });
        return;
      }
      if (a.classList && (a.classList.contains('nav-cta') || a.classList.contains('currently-link'))) {
        track('contact_click', { method: 'cta' });
        return;
      }
      var m = href.match(/projects\/([a-z]+)\.html/i);
      if (m) {
        track('project_view', { project: m[1] });
        return;
      }
    }, true);

    // 4) 다크/라이트 토글 (낮은 우선순위지만 배선만)
    var toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var now = document.documentElement.getAttribute('data-theme') || 'dark';
        // 토글 직후 값이 바뀌므로 반대를 기록
        track('theme_toggle', { to: now === 'dark' ? 'light' : 'dark' });
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire);
  else wire();
})();
