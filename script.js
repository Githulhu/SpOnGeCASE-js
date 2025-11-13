// Funktion, um zu überprüfen, ob das Gerät ein Mobilgerät ist
function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

// Variable für das deferred install prompt
let deferredPrompt;

document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const convertButton = document.getElementById('convertButton');
    const copyButton = document.getElementById('copyButton');
    const clearButton = document.getElementById('clearButton');
    const spongeimage = document.getElementById('spongebob');
    const installButton = document.getElementById('installButton');

    function sponge(s) {
        let result = '';
        for (let i = 0; i < s.length; i++) {
            let c = s.charAt(i);
            if (/[a-zA-Z]/.test(c)) {
                result += (i % 2 === 0) ? c.toUpperCase() : c.toLowerCase();
            } else {
                result += c;
            }
        }
        return result;
    }

    function test_for_sponge(s){
        if(s.value && s.value.trim().length > 0) {
            return true;
        }
        return false;
    }

    convertButton.addEventListener('click', () => {
        //if (test_for_sponge):
        outputText.value = sponge(inputText.value);
        spongeimage.style.visibility = 'visible';
    });

    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(outputText.value).then(() => {
            alert('Text copied to clipboard');
        }).catch(err => {
            console.log('Failed to copy text', err);
            alert('Failed to copy text');
        });
    });

    clearButton.addEventListener('click', () => {
        inputText.value = '';
        outputText.value = '';
        spongeimage.style.visibility = 'hidden';
    });

    // Überprüfen, ob die App im Standalone-Modus läuft oder nicht auf einem Mobilgerät ist
    if (window.matchMedia('(display-mode: standalone)').matches || !isMobileDevice()) {
        installButton.style.display = 'none';
    } else {
        // Zeige den Install-Button an
        installButton.style.display = 'block';
    }

    // Event-Listener für beforeinstallprompt registrieren
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Speichere das Ereignis, um es später auszulösen
        deferredPrompt = e;
        // Zeige den Installationsbutton an
        installButton.style.display = 'block';
    });

    // Click-Handler für den Install-Button
    installButton.addEventListener('click', () => {
        // Prüfe ob deferredPrompt verfügbar ist
        if (!deferredPrompt) {
            console.log('Install prompt not available');
            return;
        }
        // Verstecke den Button
        installButton.style.display = 'none';
        // Zeige den Installationsprompt
        deferredPrompt.prompt();
        // Warte auf die Antwort des Nutzers
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
});

// Registrierung des Service Workers
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(function(error) {
            console.error('Service Worker registration failed:', error);
        });
}