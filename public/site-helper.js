// public/site-helper.js
(function() {
  'use strict';

  // 配置数据
  const SITE_CONFIG = {
    baseUrl: 'https://home-cn-hth.com.cn',
    keyword: '华体会',
    containerId: 'site-helper-root'
  };

  // 样式注入
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .site-helper-wrapper {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        max-width: 360px;
        width: 100%;
      }
      .site-helper-card {
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.12);
        padding: 20px;
        transition: transform 0.2s ease;
        border: 1px solid #e8e8e8;
      }
      .site-helper-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 24px rgba(0,0,0,0.16);
      }
      .site-helper-title {
        font-size: 16px;
        font-weight: 600;
        color: #1a1a1a;
        margin: 0 0 12px 0;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .site-helper-badge {
        display: inline-block;
        background: #f0f5ff;
        color: #2b5ea7;
        border-radius: 20px;
        padding: 4px 12px;
        font-size: 12px;
        font-weight: 500;
        border: 1px solid #d6e4ff;
        white-space: nowrap;
      }
      .site-helper-badge-group {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 14px;
      }
      .site-helper-desc {
        font-size: 14px;
        line-height: 1.6;
        color: #4a4a4a;
        margin: 0 0 16px 0;
      }
      .site-helper-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: #2b5ea7;
        color: #fff;
        text-decoration: none;
        padding: 8px 18px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        transition: background 0.2s;
      }
      .site-helper-link:hover {
        background: #1d4a8a;
        color: #fff;
      }
      .site-helper-close {
        position: absolute;
        top: 12px;
        right: 12px;
        background: transparent;
        border: none;
        font-size: 18px;
        color: #999;
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 4px;
        line-height: 1;
      }
      .site-helper-close:hover {
        background: #f0f0f0;
        color: #333;
      }
      .site-helper-footer {
        font-size: 11px;
        color: #b0b0b0;
        margin-top: 12px;
        text-align: right;
      }
    `;
    document.head.appendChild(style);
  }

  // 生成关键词徽章
  function createBadge(text) {
    const span = document.createElement('span');
    span.className = 'site-helper-badge';
    span.textContent = text;
    return span;
  }

  // 构建卡片内容
  function buildCard() {
    const wrapper = document.createElement('div');
    wrapper.className = 'site-helper-wrapper';
    wrapper.id = SITE_CONFIG.containerId;

    const card = document.createElement('div');
    card.className = 'site-helper-card';
    card.style.position = 'relative';

    // 关闭按钮
    const closeBtn = document.createElement('button');
    closeBtn.className = 'site-helper-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', '关闭提示');
    closeBtn.addEventListener('click', function() {
      wrapper.style.display = 'none';
    });

    // 标题
    const title = document.createElement('div');
    title.className = 'site-helper-title';
    title.innerHTML = `💡 关于 <strong>${SITE_CONFIG.keyword}</strong>`;

    // 关键词徽章组
    const badgeGroup = document.createElement('div');
    badgeGroup.className = 'site-helper-badge-group';
    const tags = ['推荐', '官方', '安全', '最新'];
    tags.forEach(function(tag) {
      badgeGroup.appendChild(createBadge(tag));
    });

    // 描述文字
    const desc = document.createElement('p');
    desc.className = 'site-helper-desc';
    desc.textContent = `欢迎访问「${SITE_CONFIG.keyword}」官方页面。本平台提供稳定可靠的服务体验，如需了解更多功能或获取帮助，请点击下方按钮访问主站。`;

    // 链接按钮
    const link = document.createElement('a');
    link.className = 'site-helper-link';
    link.href = SITE_CONFIG.baseUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.innerHTML = `前往 ${SITE_CONFIG.keyword} 官网 →`;

    // 底部信息
    const footer = document.createElement('div');
    footer.className = 'site-helper-footer';
    footer.textContent = '页面辅助提示 · 点击外部链接将离开当前页面';

    // 组装
    card.appendChild(closeBtn);
    card.appendChild(title);
    card.appendChild(badgeGroup);
    card.appendChild(desc);
    card.appendChild(link);
    card.appendChild(footer);
    wrapper.appendChild(card);

    return wrapper;
  }

  // 初始化
  function init() {
    if (document.getElementById(SITE_CONFIG.containerId)) {
      return;
    }
    injectStyles();
    const card = buildCard();
    document.body.appendChild(card);
  }

  // 确保DOM加载完成后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();