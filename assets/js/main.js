document.addEventListener('DOMContentLoaded', function() {
  // 外部リンククリック計測の共通関数
  function trackOutboundLink(url, category, label) {
    var opened = false;
    gtag('event', 'click', {
      'event_category': category,
      'event_label': label,
      'event_callback': function() {
        if (!opened) {
          opened = true;
          window.open(url, '_blank');
        }
      }
    });
    setTimeout(function() {
      if (!opened) {
        opened = true;
        window.open(url, '_blank');
      }
    }, 1000);
  }

  // キャンペーン画像クリック計測
  var campaignLinks = document.querySelectorAll('.campaign-link');
  campaignLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var label = this.querySelector('img').alt;
      trackOutboundLink(this.href, 'campaign', label);
    });
  });

  // ストアボタンクリック計測
  var storeButtons = document.querySelectorAll('.store-button');
  storeButtons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      var url = this.href;
      var label = url.includes('apple.com') ? 'App Store' : 'Google Play';
      trackOutboundLink(url, 'store', label);
    });
  });

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
