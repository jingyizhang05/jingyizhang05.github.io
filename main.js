/* ================================================================
   张竞一个人主页 - 交互脚本 v2.0
   功能: 移动端菜单、主题切换、平滑滚动、导航高亮
================================================================ */

(function () {
  'use strict';

  /* ============ 1. 移动端顶部导航汉堡菜单 ============ */
  function toggleTopNav() {
    var nav = document.getElementById('topNav');
    if (nav) nav.classList.toggle('open');
  }
  window.toggleTopNav = toggleTopNav;

  /* ============ 2. 主题切换（浅色/暗色） ============ */
  function getThemeIcon(theme) {
    return theme === 'dark' ? '☀' : '🌙';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
    var btn = document.querySelector('.theme-toggle');
    if (btn) btn.textContent = getThemeIcon(theme);
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'light' ? 'dark' : 'light');
  }
  window.toggleTheme = toggleTheme;

  // 初始化按钮图标
  document.addEventListener('DOMContentLoaded', function () {
    var theme = document.documentElement.getAttribute('data-theme') || 'light';
    var btn = document.querySelector('.theme-toggle');
    if (btn) btn.textContent = getThemeIcon(theme);

    // 尊重系统偏好（若用户未手动选过）
    try {
      var saved = localStorage.getItem('theme');
      if (!saved && window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('dark');
      }
    } catch (e) {}
  });

  /* ============ 3. 平滑滚动 & 锚点偏移（避开固定顶栏） ============ */
  document.addEventListener('click', function (e) {
    var anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    var href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    var target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    var mastheadHeight = 70; // 顶栏高度 + 留白
    var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - mastheadHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    // 更新 URL hash 但不触发跳转
    if (history.pushState) {
      history.pushState(null, '', href);
    }
  });

  /* ============ 4. 点击页面其他位置关闭移动菜单 ============ */
  document.addEventListener('click', function (e) {
    if (window.innerWidth > 768) return;
    var nav = document.getElementById('topNav');
    var toggle = document.querySelector('.menu-toggle');
    if (!nav || !toggle) return;
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('open');
    }
  });

  /* ============ 5. 当前页导航高亮 ============ */
  // 通过 HTML 中的 .active 类已静态设置，无需 JS 干预

})();
