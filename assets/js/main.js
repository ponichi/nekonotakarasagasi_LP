document.addEventListener('DOMContentLoaded', function() {
  // 1280px以上でのみホバーエフェクトを有効化
  const mediaQuery = window.matchMedia('(min-width: 1280px)');

  function handleHoverEffects(e) {
    const links = document.querySelectorAll('a, .store-button, .campaign-link');

    if (e.matches) {
      // 1280px以上: ホバーエフェクト有効
      links.forEach(link => {
        link.classList.add('hover-enabled');
      });
    } else {
      // 1280px未満: ホバーエフェクト無効
      links.forEach(link => {
        link.classList.remove('hover-enabled');
      });
    }
  }

  // 初期実行
  handleHoverEffects(mediaQuery);

  // 画面サイズ変更時に再実行
  mediaQuery.addEventListener('change', handleHoverEffects);
});
