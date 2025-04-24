// Espera que el contingut del DOM estigui completament carregat
document.addEventListener('DOMContentLoaded', function() {

    // Selecciona el formulari i els camps
    const form = document.getElementById('formulariCompra');
    const nomInput = document.getElementById('nom');
    const correuInput = document.getElementById('correu');
    const telefonInput = document.getElementById('telefon');
    const quantitatInput = document.getElementById('quantitat');

    // Selecciona els elements on es mostraran els missatges d'error
    const errorNom = document.getElementById('errorNom');
    const errorCorreu = document.getElementById('errorCorreu');
    const errorTelefon = document.getElementById('errorTelefon');
    const errorQuantitat = document.getElementById('errorQuantitat');

    // Funció per mostrar error
    function mostrarError(elementError, missatge) {
        elementError.textContent = missatge;
        elementError.style.visibility = 'visible'; // Mostra el missatge
    }

    // Funció per netejar errors
    function netejarErrors() {
        errorNom.textContent = '';
        errorNom.style.visibility = 'hidden';
        errorCorreu.textContent = '';
        errorCorreu.style.visibility = 'hidden';
        errorTelefon.textContent = '';
        errorTelefon.style.visibility = 'hidden';
        errorQuantitat.textContent = '';
        errorQuantitat.style.visibility = 'hidden';
    }

    // Funció per validar correu electrònic (format bàsic)
    function validarCorreu(correu) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(correu).toLowerCase());
    }

    // Funció per validar telèfon (segons el pattern HTML)
    function validarTelefon(telefon) {
        const pattern = new RegExp(telefonInput.pattern); // Agafa el pattern de l'HTML
        return pattern.test(telefon);
    }

    // Afegeix un listener per a l'esdeveniment 'submit' del formulari
    form.addEventListener('submit', function(event) {
        // Neteja errors anteriors
        netejarErrors();

        let esValid = true; // Assumim que és vàlid inicialment

        // Validació del nom
        if (nomInput.value.trim() === '') {
            mostrarError(errorNom, 'El nom és obligatori.');
            esValid = false;
        }

        // Validació del correu
        if (correuInput.value.trim() === '') {
            mostrarError(errorCorreu, 'El correu electrònic és obligatori.');
            esValid = false;
        } else if (!validarCorreu(correuInput.value)) {
            mostrarError(errorCorreu, 'El format del correu no és vàlid.');
            esValid = false;
        }

        // Validació del telèfon
        if (telefonInput.value.trim() === '') {
            mostrarError(errorTelefon, 'El telèfon mòbil és obligatori.');
            esValid = false;
        } else if (!validarTelefon(telefonInput.value.trim())) {
            mostrarError(errorTelefon, 'El format del telèfon no és vàlid (Ex: 600000000).');
            esValid = false;
        }

        // Validació de la quantitat
        const quantitat = parseInt(quantitatInput.value, 10);
        if (isNaN(quantitat) || quantitat < 1) {
             mostrarError(errorQuantitat, 'La quantitat ha de ser com a mínim 1.');
             esValid = false;
        }

        // Si alguna validació ha fallat, prevé l'enviament del formulari
        if (!esValid) {
            event.preventDefault();
        }
        // Si tot és vàlid, el formulari s'enviarà (no cal fer res més aquí)
    });

    // (Opcional) Validació en temps real mentre l'usuari escriu (exemple per al correu)
    correuInput.addEventListener('input', function() {
        if (correuInput.value.trim() !== '' && !validarCorreu(correuInput.value)) {
            mostrarError(errorCorreu, 'El format del correu no sembla correcte.');
        } else {
            errorCorreu.textContent = ''; // Neteja l'error si és vàlid o buit
             errorCorreu.style.visibility = 'hidden';
        }
    });
     // Pots afegir listeners similars per a altres camps si vols feedback instantani

});
