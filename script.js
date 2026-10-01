/* NET Logistics — bespoke interactions */

(function () {
  'use strict';

  /* Sticky header shadow */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 8);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile nav toggle */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* Reveal on scroll */
  var revealables = document.querySelectorAll('.service-card, .why-item, .route-card, .review-card, .gallery-item, .section-head');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealables.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  }

  /* Quote form — validates and composes a WhatsApp/mailto handoff */
  var form = document.getElementById('quoteForm');
  var note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('qName').value.trim();
      var phone = document.getElementById('qPhone').value.trim();
      var email = document.getElementById('qEmail').value.trim();
      var company = document.getElementById('qCompany').value.trim();
      var message = document.getElementById('qMessage').value.trim();

      if (!name || !phone || !email || !message) {
        if (note) {
          note.textContent = 'Please complete all required fields.';
          note.className = 'form-note error';
        }
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (note) {
          note.textContent = 'Please enter a valid email address.';
          note.className = 'form-note error';
        }
        return;
      }

      var body = encodeURIComponent(
        'Quote request from website:\n\n' +
        'Name: ' + name + '\n' +
        'Phone: ' + phone + '\n' +
        'Email: ' + email + '\n' +
        (company ? 'Company: ' + company + '\n' : '') +
        'Details: ' + message
      );
      var subject = encodeURIComponent('Website Quote Request — ' + name);
      var mailto = 'mailto:pierre@newent.co.za?subject=' + subject + '&body=' + body;

      if (note) {
        note.textContent = 'Thank you, ' + name + '! Your quote request is ready to send.';
        note.className = 'form-note';
      }
      window.location.href = mailto;
    });
  }
})();