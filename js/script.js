/* ThermTech — interactions */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- sticky header shadow ---- */
  var header = document.getElementById('header');
  var onScroll = function () {
    header.classList.toggle('scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- mobile nav ---- */
  var toggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  var backdrop = document.getElementById('navBackdrop');
  function setNav(open) {
    mobileNav.classList.toggle('open', open);
    backdrop.classList.toggle('show', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  toggle.addEventListener('click', function () {
    setNav(!mobileNav.classList.contains('open'));
  });
  backdrop.addEventListener('click', function () { setNav(false); });
  mobileNav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setNav(false); });
  });

  /* ---- scroll reveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- animated stat counters ---- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduce) { el.textContent = target + suffix; return; }
    var start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var nums = document.querySelectorAll('.num[data-count]');
  if ('IntersectionObserver' in window) {
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); io2.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    nums.forEach(function (n) { io2.observe(n); });
  } else {
    nums.forEach(animateCount);
  }

  /* ---- heat / cool dial toggle ---- */
  var arcCool = document.getElementById('arcCool');
  var arcHeat = document.getElementById('arcHeat');
  var tempVal = document.getElementById('tempVal');
  var dialLabel = document.getElementById('dialLabel');
  var modeBtns = document.querySelectorAll('.mode-pill button');
  // circumference for r=150 ≈ 943; show 270° sweep (≈707)
  var FULL = 707, TOTAL = 943;
  function setMode(mode) {
    var heat = mode === 'heat';
    modeBtns.forEach(function (b) {
      b.classList.toggle('on', b.getAttribute('data-mode') === mode);
    });
    if (heat) {
      arcHeat.style.opacity = 1; arcCool.style.opacity = 0;
      arcHeat.setAttribute('stroke-dasharray', FULL + ' ' + TOTAL);
      tempVal.textContent = '22';
      dialLabel.textContent = 'Heating · indoor target';
      tempVal.parentNode.querySelector('sup').style.color = 'var(--ember-br)';
    } else {
      arcHeat.style.opacity = 0; arcCool.style.opacity = 1;
      arcCool.setAttribute('stroke-dasharray', FULL + ' ' + TOTAL);
      tempVal.textContent = '21';
      dialLabel.textContent = 'Cooling · indoor target';
      tempVal.parentNode.querySelector('sup').style.color = 'var(--frost-br)';
    }
  }
  if (arcCool) {
    arcCool.style.transition = arcHeat.style.transition = 'opacity .4s ease';
    modeBtns.forEach(function (b) {
      b.addEventListener('click', function () { setMode(b.getAttribute('data-mode')); });
    });
  }

  /* ---- form (graceful for static hosting) ---- */
  var form = document.getElementById('quoteForm');
  var msg = document.getElementById('formMsg');
  function show(kind, text) { msg.className = 'form-msg ' + kind; msg.textContent = text; }
  if (form) {
    form.addEventListener('submit', function (ev) {
      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      var email = form.email.value.trim();
      if (!name || !phone || !email) {
        ev.preventDefault();
        show('err', 'Please add your name, phone and email so we can reach you.');
        return;
      }
      var action = form.getAttribute('action') || '';
      if (action.indexOf('your-form-id') !== -1) {
        ev.preventDefault();
        var body = encodeURIComponent(
          'Name: ' + name + '\nPhone: ' + phone + '\nEmail: ' + email +
          '\nService: ' + form.service.value + '\n\n' + form.message.value
        );
        window.location.href = 'mailto:info@thermtechhvac.com?subject=' +
          encodeURIComponent('Quote request from ' + name) + '&body=' + body;
        show('ok', 'Opening your email app to send the request — or call us at 416-835-1289.');
      }
    });
  }

  /* ---- footer year ---- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
