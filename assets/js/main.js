document.addEventListener('DOMContentLoaded', function() {
  // 外部リンククリック計測の共通関数
  function trackOutboundLink(url, category, label, options) {
    options = options || {};
    var opened = false;
    var eventParams = {
      'event_category': category,
      'event_label': label,
      'event_callback': function() {
        if (!opened) {
          opened = true;
          window.open(url, '_blank');
        }
      }
    };

    // オプションパラメータを追加
    if (options.linkType) {
      eventParams['link_type'] = options.linkType;
    }
    if (options.position) {
      eventParams['position'] = options.position;
    }

    gtag('event', 'click', eventParams);
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
      var isAppStore = url.includes('apple.com');
      var label = isAppStore ? 'App Store' : 'Google Play';

      // position判定（親セクションで判別）
      var position = this.closest('.download-cta') ? 'top_cta' : 'bottom_cta';

      // App Storeの場合、リンクタイプ（mobile/desktop）を判定
      var linkType = '';
      if (isAppStore) {
        linkType = url.includes('/jp/app/') ? 'desktop' : 'mobile';
      }

      trackOutboundLink(url, 'store', label, {
        linkType: linkType,
        position: position
      });
    });
  });

  // 1280px以上でのみホバーエフェクトを有効化
  const mediaQuery = window.matchMedia('(min-width: 1280px)');

  // App Storeリンクの定義
  const APP_STORE_LINK_MOBILE = 'https://apps.apple.com/app/%E3%81%AD%E3%81%93%E3%81%AE%E5%AE%9D%E6%8E%A2%E3%81%97/id6670185361?mt=8';
  const APP_STORE_LINK_DESKTOP = 'https://apps.apple.com/jp/app/id6670185361';

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

  // App Storeリンクの切り替え
  function handleAppStoreLinks(e) {
    const appStoreButtons = document.querySelectorAll('.store-button');
    appStoreButtons.forEach(button => {
      if (button.href && button.href.includes('apps.apple.com')) {
        if (e.matches) {
          // 1280px以上: デスクトップ用リンク
          button.href = APP_STORE_LINK_DESKTOP;
        } else {
          // 1280px未満: モバイル用リンク
          button.href = APP_STORE_LINK_MOBILE;
        }
      }
    });
  }

  // 初期実行
  handleHoverEffects(mediaQuery);
  handleAppStoreLinks(mediaQuery);

  // 画面サイズ変更時に再実行
  mediaQuery.addEventListener('change', handleHoverEffects);
  mediaQuery.addEventListener('change', handleAppStoreLinks);
});
