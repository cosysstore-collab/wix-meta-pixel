// meta-pixel.js (déposé dans ton repo GitHub)
(function(){
  function getParam(name){
    try {
      const params = new URLSearchParams(window.location.search || "");
      return params.get(name);
    } catch(e) {
      return null;
    }
  }
  var pixelID = getParam('pixel') || (window._externalPixelId || null);
  if(!pixelID) return;

  // Inject Facebook Pixel library
  !function(f,b,e,v,n,t,s){
    if(f.fbq) return;
    n = f.fbq = function(){ n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) };
    if(!f._fbq) f._fbq = n;
    n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
    t = b.createElement(e); t.async = true; t.src = v;
    s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  try {
    fbq('init', pixelID);
    fbq('track', 'PageView');
  } catch(e){ console.warn('fbq init failed', e); }

  // Exemple d'écoute générique d'événements :
  // Adapte les sélecteurs (.add-to-cart, .purchase-btn, .form-submit) à ton template.
  document.addEventListener('click', function(e){
    var t = e.target;
    // AddToCart : bouton avec classe .add-to-cart et attribut data-price
    if(t.closest && t.closest('.add-to-cart') || t.matches && t.matches('.add-to-cart')){
      var btn = t.closest ? t.closest('.add-to-cart') : t;
      var val = parseFloat(btn.getAttribute('data-price') || btn.dataset.price || 0) || 0;
      try { fbq('track', 'AddToCart', {value: val, currency: 'DZD'}); } catch(err){}
    }
    // Purchase : bouton finalisation
    if(t.closest && t.closest('.purchase-btn') || t.matches && t.matches('.purchase-btn')){
      var btn2 = t.closest ? t.closest('.purchase-btn') : t;
      var total = parseFloat(btn2.getAttribute('data-total') || btn2.dataset.total || 0) || 0;
      try { fbq('track', 'Purchase', {value: total, currency: 'DZD'}); } catch(err){}
    }
  }, false);

  // Si tu as des formulaires custom, trigger un Lead event quand soumis:
  document.addEventListener('submit', function(e){
    var form = e.target;
    if(form && (form.matches('.lead-form') || form.classList.contains('lead-form'))){
      try { fbq('track', 'Lead'); } catch(err){}
    }
  }, true);
})();
