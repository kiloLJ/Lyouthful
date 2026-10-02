/* ═══════════════════════════════════════════
   宇宙主题 · 章节式整屏切换 · 核心脚本
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const pad = (n) => String(n).padStart(2, '0');

  const SCENE_IDS = ['home', 'timeline', 'photos', 'about', 'survey'];
  const NAV_LABELS = ['首页', '成长记录', '拾光集', '锦天自白', '旁人寄语'];

  let current = 0;
  let switching = false;

  /* ── 入口 ── */
  document.addEventListener('DOMContentLoaded', () => {
    loadSceneBgs();
    buildStarrySky();
    buildNav();
    buildDots();
    buildNextButtons();
    buildHero();
    buildTimeline();
    buildPhotoStrip();
    buildAbout();
    buildSurvey();
    startCountdown();
    initKeyboard();
    activateScene(0, true); // 首屏直接激活
  });

  /* ═══════ 场景背景 ═══════ */
  function loadSceneBgs() {
    $$('.scene').forEach((sec) => {
      const url = CONFIG.scenes[sec.dataset.scene];
      if (url) sec.querySelector('.scene-bg').style.backgroundImage = `url('${url}')`;
    });
  }

  /* ═══════ 动态星野生成器 ═══════ */
  function buildStarrySky() {
    $$('.scene').forEach((sec) => {
      // 三层闪烁星点
      const starCounts = [60, 35, 18]; // 小 / 中 / 大 星
      const starSizes  = [1.2, 2.4, 3.6];
      const starOpac   = [.35, .55, .75];
      starCounts.forEach((count, layer) => {
        const div = document.createElement('div');
        div.className = `star-layer s${layer + 1}`;
        for (let i = 0; i < count; i++) {
          const star = document.createElement('i');
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const delay = Math.random() * 4;
          const s = starSizes[layer];
          star.style.cssText = `left:${x}%;top:${y}%;width:${s}px;height:${s}px;background:#fff;box-shadow:0 0 ${s*2.5}px rgba(255,240,214,.9);--tw:${2+Math.random()*4}s;--o0:${(starOpac[layer]*.3).toFixed(2)};animation-delay:${delay}s;`;
          div.appendChild(star);
        }
        sec.appendChild(div);
      });

      // 漂浮光尘 × 12
      for (let i = 0; i < 12; i++) {
        const d = document.createElement('div');
        d.className = 'dust';
        const s = 2 + Math.random() * 5;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        d.style.cssText = `width:${s}px;height:${s}px;left:${x}%;top:${y}%;--dur:${10+Math.random()*16}s;--dd:${Math.random()*8}s;--dx:${30+Math.random()*60}px;--dy:${-30-Math.random()*60}px;`;
        sec.appendChild(d);
      }
    });
  }

  /* ═══════ 章节切换（柔和衔接动画） ═══════ */
  function goTo(idx) {
    if (switching || idx === current || idx < 0 || idx >= SCENE_IDS.length) return;
    switching = true;

    const from = $('#' + SCENE_IDS[current]);
    const to = $('#' + SCENE_IDS[idx]);

    // 旧场景：迸发舒展 → 柔化模糊（0.5s）
    from.classList.add('leaving');

    setTimeout(() => {
      from.classList.remove('active', 'leaving');
      activateScene(idx, false);
    }, 480);

    setTimeout(() => { switching = false; }, 1000);
  }

  function activateScene(idx, instant) {
    const to = $('#' + SCENE_IDS[idx]);
    current = idx;

    // 重置该场景的渐显元素（每次进入都重新浮现）
    to.querySelectorAll('.rv').forEach((el) => el.classList.remove('in'));

    to.classList.add('active');
    if (!instant) to.classList.add('entering');
    to.querySelector('.scene-content').scrollTop = 0;

    // 渐显元素依次浮现（0.6s ease-out 柔缓淡入上移）
    setTimeout(() => {
      to.querySelectorAll('.rv').forEach((el) => el.classList.add('in'));
    }, instant ? 300 : 560);

    setTimeout(() => to.classList.remove('entering'), 1150);

    updateNav();
    updateDots();
  }

  /* ═══════ 导航 ═══════ */
  function buildNav() {
    $('#navBrand').addEventListener('click', () => goTo(0));
    const links = $('#navLinks');
    const overlay = $('#overlayMenu');
    NAV_LABELS.forEach((label, i) => {
      const a1 = document.createElement('a');
      a1.textContent = label;
      a1.addEventListener('click', () => goTo(i));
      links.appendChild(a1);
      const a2 = document.createElement('a');
      a2.textContent = label;
      a2.addEventListener('click', () => { closeMenu(); goTo(i); });
      overlay.appendChild(a2);
    });
    $('#hamburger').addEventListener('click', () => {
      const open = $('#hamburger').classList.toggle('open');
      overlay.classList.toggle('open', open);
    });
  }
  function updateNav() {
    $$('#navLinks a').forEach((a, i) => a.classList.toggle('active', i === current));
  }
  function closeMenu() {
    $('#hamburger').classList.remove('open');
    $('#overlayMenu').classList.remove('open');
  }

  /* ═══════ 圆点 ═══════ */
  function buildDots() {
    const wrap = $('#sceneDots');
    SCENE_IDS.forEach((id, i) => {
      const d = document.createElement('div');
      d.className = 'dot'; d.title = NAV_LABELS[i];
      d.addEventListener('click', () => goTo(i));
      wrap.appendChild(d);
    });
  }
  function updateDots() {
    $$('#sceneDots .dot').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  /* ═══════ 下一幕按钮 ═══════ */
  function buildNextButtons() {
    $$('.next-btn').forEach((btn) => {
      const gotoIdx = btn.id === 'heroNextBtn' ? 1 : parseInt(btn.dataset.goto, 10);
      btn.innerHTML = `
        <span>${CONFIG.nextLabels[gotoIdx - 1] || ''}</span>
        <span class="ring"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg></span>`;
      btn.addEventListener('click', () => goTo(gotoIdx));
    });
  }

  /* ═══════ 键盘切换章节 ═══════ */
  function initKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo((current + 1) % SCENE_IDS.length);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goTo((current - 1 + SCENE_IDS.length) % SCENE_IDS.length);
    });
  }

  /* ═══════ 首页 ═══════ */
  function buildHero() {
    const titleEl = $('#heroTitle');
    CONFIG.heroTitle.split('').forEach((c, i) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = c === ' ' ? '\u00A0' : c;
      titleEl.appendChild(span);
      setTimeout(() => span.classList.add('show'), 400 + i * 45);
    });

    const cheers = $('#heroCheers');
    cheers.textContent = CONFIG.heroCheers;
    setTimeout(() => cheers.classList.add('show'), 400 + CONFIG.heroTitle.length * 45 + 200);

    const tagline = $('#heroTagline');
    tagline.textContent = CONFIG.heroTagline;
    setTimeout(() => tagline.classList.add('show'), 1600);

    $('#cdLabel').textContent = '距离我的18岁生日（北京时间）';
    setTimeout(() => $('#countdownWrap').classList.add('show'), 1100);
  }

  /* ═══════ 北京时间倒计时 ═══════ */
  function startCountdown() {
    const birth = new Date(CONFIG.birthday + 'T00:00:00+08:00');
    const target = new Date(birth); target.setFullYear(target.getFullYear() + 18);

    function beijingNow() {
      const now = new Date();
      return new Date(now.getTime() + (now.getTimezoneOffset() + 480) * 60000);
    }

    function tick() {
      const diff = target - beijingNow();
      if (diff <= 0) {
        $('#countdownWrap').style.display = 'none';
        $('#birthdayMsg').style.display = 'block';
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      [['#cdDays', d], ['#cdHours', h], ['#cdMins', m], ['#cdSecs', s]].forEach(([el, v]) => {
        const node = $(el); const str = pad(v);
        if (node.textContent !== str) {
          node.textContent = str;
          node.classList.remove('count-pop');
          void node.offsetWidth;
          node.classList.add('count-pop');
        }
      });
    }
    tick(); setInterval(tick, 1000);
  }

  /* ═══════ 成长记录（两行方格 · 点击聚焦展开 · 点空白恢复） ═══════ */
  function buildTimeline() {
    const list = $('#timelineList');
    const wrap = $('#timelineWrap');
    const detail = $('#tlDetail');
    let activeIdx = -1;

    CONFIG.timeline.forEach((item, i) => {
      const div = document.createElement('div');
      div.className = 'tl-item rv';
      div.style.setProperty('--d', (i * 0.12) + 's');
      div.innerHTML = `
        <div class="tl-card" data-idx="${i}">
          <div class="tl-year">${item.year}</div>
          <h3 class="tl-title">${item.title}</h3>
        </div>`;
      list.appendChild(div);
    });

    function openDetail(i) {
      const item = CONFIG.timeline[i];
      const inner = detail.querySelector('.tl-detail-inner');

      if (activeIdx === -1) {
        // 首次展开：填入内容，其他卡片模糊退后
        $('#tlDetailYear').textContent = item.year;
        $('#tlDetailTitle').textContent = item.title;
        $('#tlDetailText').textContent = item.detail;
        wrap.classList.add('expanded');
      } else {
        // 切换年份：旧文字淡出 → 更新 → 新文字淡入
        inner.classList.add('fading');
        setTimeout(() => {
          $('#tlDetailYear').textContent = item.year;
          $('#tlDetailTitle').textContent = item.title;
          $('#tlDetailText').textContent = item.detail;
          inner.classList.remove('fading');
        }, 300);
      }
      activeIdx = i;
    }

    function closeDetail() {
      wrap.classList.remove('expanded');
      activeIdx = -1;
    }

    // 点击方格卡片
    list.addEventListener('click', (e) => {
      const card = e.target.closest('.tl-card');
      if (!card) return;
      e.stopPropagation();
      openDetail(parseInt(card.dataset.idx, 10));
    });

    // 点击本幕任意空白处：恢复到方格页面
    $('#timeline').addEventListener('click', (e) => {
      if (activeIdx !== -1 && !e.target.closest('.tl-card')) closeDetail();
    });
  }

  /* ═══════ 拾光集 · 照片条（匀速循环，点击轻量切换） ═══════ */
  let psActiveIdx = -1;
  function buildPhotoStrip() {
    const strip = $('#photoStrip');
    const cap = $('#psActiveCap');
    const items = CONFIG.photos.concat(CONFIG.photos); // 双份无缝循环
    items.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'ps-card';
      card.innerHTML = `
        <img class="ps-img" src="${p.src}" alt="${p.caption}"
             onerror="this.src='https://via.placeholder.com/300x400/14100c/D4A574?text=${encodeURIComponent(p.caption)}'" />
        <div class="ps-cap">${p.caption}</div>`;
      card.addEventListener('click', () => {
        const realIdx = i % CONFIG.photos.length;
        if (realIdx === psActiveIdx) {
          card.classList.remove('active');
          cap.classList.remove('show');
          psActiveIdx = -1;
          return;
        }
        $$('.ps-card').forEach((c, ci) => c.classList.toggle('active', ci % CONFIG.photos.length === realIdx));
        cap.textContent = CONFIG.photos[realIdx].caption;
        cap.classList.remove('show');
        void cap.offsetWidth;
        cap.classList.add('show');
        psActiveIdx = realIdx;
      });
      strip.appendChild(card);
    });
  }

  /* ═══════ 锦天自白 ═══════ */
  function buildAbout() {
    $('#aboutCard').innerHTML = `
      <p class="about-bio">${CONFIG.bio}</p>
      <div class="about-label">我的兴趣爱好</div>
      <div class="tags">${CONFIG.interests.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
      <div class="about-label">联系方式</div>
      ${CONFIG.contact.wechat ? `<p class="contact-row">微信：${CONFIG.contact.wechat}</p>` : ''}
      ${CONFIG.contact.qq ? `<p class="contact-row">QQ：${CONFIG.contact.qq}</p>` : ''}
      ${CONFIG.contact.email ? `<p class="contact-row">邮箱：${CONFIG.contact.email}</p>` : ''}`;
  }

  /* ═══════ 旁人寄语 ═══════ */
  function buildSurvey() {
    const area = $('#surveyArea');
    area.innerHTML = `
      <form class="sv-form" id="svForm">
        ${CONFIG.surveyQuestions.map((q) => `
          <div class="sv-field">
            <label>${q.q}</label>
            ${q.id <= 3 ? `<textarea name="q${q.id}" placeholder="${q.ph}" rows="3" required></textarea>`
                        : `<input type="text" name="q${q.id}" placeholder="${q.ph}" required />`}
          </div>`).join('')}
        <button type="submit" class="sv-submit">封存寄语</button>
      </form>`;
    $('#svForm').addEventListener('submit', (e) => { e.preventDefault(); renderSuccess(); });
    $('#backHome').addEventListener('click', (e) => { e.preventDefault(); goTo(0); });
  }

  function renderSuccess() {
    $('#surveyArea').innerHTML = `
      <div class="sv-result">
        <div class="sv-result-icon">🎉</div><h3>寄语已封存</h3>
        <p>感谢你的参与，现在可以抽奖啦！</p>
        <button class="sv-lottery-btn" id="lotteryBtn">🎁 点击抽奖</button>
        <div id="flashArea" style="margin-top:14px;font-family:'Instrument Serif',serif;font-size:1.2rem;color:#fff;min-height:2rem;"></div>
      </div>`;
    $('#lotteryBtn').addEventListener('click', drawPrize);
    const foot = $('#surveyFoot');
    foot.style.display = 'block';
    requestAnimationFrame(() => requestAnimationFrame(() => foot.classList.add('show')));
  }

  function drawPrize() {
    const btn = $('#lotteryBtn'); const flash = $('#flashArea');
    btn.disabled = true; btn.textContent = '抽奖中...';
    let c = 0;
    const id = setInterval(() => {
      flash.textContent = CONFIG.prizes[Math.floor(Math.random() * CONFIG.prizes.length)];
      flash.className = 'prize-flashing'; c++;
      if (c > 28) { clearInterval(id); flash.className = ''; renderPrize(CONFIG.prizes[Math.floor(Math.random() * CONFIG.prizes.length)]); }
    }, 100);
  }

  function renderPrize(prize) {
    $('#surveyArea').innerHTML = `
      <div class="sv-result">
        <div class="sv-result-icon">🎊</div><h3>恭喜你获得</h3>
        <div class="sv-prize-name">${prize}</div>
        <p>请联系我领取礼物哦！</p>
      </div>`;
  }

})();