document.addEventListener("DOMContentLoaded", function () {
    // Selectores de Cookies
    const cookieBanner = document.getElementById("cookieBanner");
    const cookieModal = document.getElementById("cookieModal");
    const btnAcceptCookies = document.getElementById("btnAcceptCookies");
    const btnRejectCookies = document.getElementById("btnRejectCookies");
    const btnConfigCookies = document.getElementById("btnConfigCookies");
    const btnSaveCookies = document.getElementById("btnSaveCookies");
    
    // Selectores del Formulario
    const lopdForm = document.getElementById("lopdForm");
    const formFeedback = document.getElementById("formFeedback");

    // Verificar si ya existe consentimiento guardado
    if (!localStorage.getItem("cookie_consent_saved")) {
        cookieBanner.classList.remove("hidden");
    }

    // Aceptar Todo
    btnAcceptCookies.addEventListener("click", function () {
        saveConsent(true, true);
        formFeedback.innerText = "✨ ¡Todas las cookies aceptadas de forma segura!";
    });

    // Rechazar Todo
    btnRejectCookies.addEventListener("click", function () {
        saveConsent(false, false);
    });

    // Mostrar Modal de Configuración
    btnConfigCookies.addEventListener("click", function () {
        cookieModal.classList.remove("hidden");
    });

    // Guardar desde el Modal
    btnSaveCookies.addEventListener("click", function () {
        const analitica = document.getElementById("cookieAnalitica").checked;
        const marketing = document.getElementById("cookieMarketing").checked;
        saveConsent(analitica, marketing);
        cookieModal.classList.add("hidden");
    });

    function saveConsent(analitica, marketing) {
        const consent = { necesarias: true, analitiques: analitica, marketing: marketing };
        localStorage.setItem("cookie_consent_saved", JSON.stringify(consent));
        cookieBanner.classList.add("hidden");
    }

    // Lógica del Formulario LOPD
    lopdForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const acceptPrivacy = document.getElementById("acceptPrivacy").checked;
        const acceptMarketing = document.getElementById("acceptMarketing").checked;

        if (!acceptPrivacy) {
            formFeedback.className = "feedback error";
            formFeedback.innerText = "⚠️ Has d'acceptar la Política de Privacitat obligatòriament.";
            return;
        }

        formFeedback.className = "feedback success";
        formFeedback.innerText = `🎉 Èxit! Consentiment registrat jurídicament. Màrqueting directe: ${acceptMarketing ? 'SÍ' : 'NO'}.`;
        lopdForm.reset();
    });
});
