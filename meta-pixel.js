// pixel.js
$w.onReady(function () {
    // 🔹 Charger le Pixel ID depuis la collection Logo
    wixData.query("Logo").find().then((results) => {
        if (results.items.length > 0) {
            const pixelId = results.items[0].metaPixel;

            // 🔹 Charger dynamiquement le script Meta Pixel
            (function (f, b, e, v, n, t, s) {
                if (f.fbq) return;
                n = f.fbq = function () {
                    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
                };
                if (!f._fbq) f._fbq = n;
                n.push = n;
                n.loaded = !0;
                n.version = '2.0';
                n.queue = [];
                t = b.createElement(e);
                t.async = !0;
                t.src = 'https://connect.facebook.net/en_US/fbevents.js';
                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
            })(window, document, 'script');

            fbq('init', pixelId);
            fbq('track', 'PageView');

            console.log(`✅ Facebook Pixel ${pixelId} initialisé`);

            // 🔹 Détecter ouverture du Side Cart (#lightbox1)
            const lightbox = document.querySelector('#lightbox1');
            if (lightbox) {
                const observer = new MutationObserver(() => {
                    const isVisible = window.getComputedStyle(lightbox).display !== 'none';
                    if (isVisible) {
                        fbq('track', 'AddToCart');
                        console.log('🛒 AddToCart déclenché (Side Cart visible)');
                    }
                });
                observer.observe(lightbox, { attributes: true, attributeFilter: ['style', 'class'] });
            }

            // 🔹 Détecter remplissage du formulaire (#form2)
            const form = document.querySelector('#form2');
            if (form) {
                form.addEventListener('submit', () => {
                    fbq('track', 'Lead');
                    console.log('📩 Lead déclenché (formulaire soumis)');
                });
            }

            // 🔹 Détecter clic sur bouton de validation (#buttonOrder)
            const button = document.querySelector('#buttonOrder');
            if (button) {
                button.addEventListener('click', () => {
                    fbq('track', 'Purchase');
                    console.log('💰 Purchase déclenché (commande validée)');
                });
            }

        } else {
            console.warn("⚠️ Aucun Pixel ID trouvé dans la collection Logo.");
        }
    });
});
