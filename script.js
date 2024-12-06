let slideIndex = 0;
showSlides(); // Zeige die ersten Bilder an

// Funktion zum Wechseln der Bilder
function plusSlides(n) {
    slideIndex += n;
    showSlides();
}

// Funktion zum Anzeigen der Bilder
function showSlides() {
    const slides = document.getElementsByClassName("slide");

    // Schaltet den Bildindex
    if (slideIndex >= slides.length) slideIndex = 0; // Zurück zum ersten Bild
    if (slideIndex < 0) slideIndex = slides.length - 1; // Zurück zum letzten Bild

    // Alle Folien ausblenden
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slides[slideIndex].style.display = "block";  // Das aktuelle Bild anzeigen
}

// Event Listener für den Warenkorb-Button
document.getElementById("add-to-cart").addEventListener("click", function() {
    const cartCount = document.getElementById("cart-count");
    let count = parseInt(cartCount.textContent);
    const messageContainer = document.getElementById("message-container"); // Container für die Nachricht

    // Überprüfen, ob eine Größe ausgewählt wurde
    const selectedSize = document.querySelector(".size-box.selected");
    if (selectedSize) {
        count++; // Produkt zur Anzahl hinzufügen
        cartCount.textContent = count; // Warenkorb aktualisieren
        this.textContent = "Bereits im Warenkorb"; // Button-Text ändern
        this.disabled = true; // Button deaktivieren

        // Nachricht zurücksetzen, falls vorherige Nachricht angezeigt wurde
        if (messageContainer) {
            messageContainer.textContent = ""; // Inhalt leeren
        }
    } else {
        // Nachricht anzeigen, wenn keine Größe ausgewählt wurde
        if (!messageContainer) {
            const newMessage = document.createElement("p");
            newMessage.id = "message-container"; // ID für den Zugriff auf das Element
            newMessage.textContent = "Bitte wähle eine Größe";
            newMessage.style.color = "red"; // Farbe für die Nachricht
            newMessage.style.marginTop = "10px"; // Abstand oben
            newMessage.style.fontSize = "14px"; // Schriftgröße
            this.parentNode.insertBefore(newMessage, this.nextSibling); // Nachricht unter dem Button einfügen
        }
    }
});

// Größe-Boxen Event Listener hinzufügen
const sizeBoxes = document.querySelectorAll('.size-box');
sizeBoxes.forEach(box => {
    box.addEventListener('click', function() {
        // Entferne die Auswahl von allen anderen Größe-Boxen
        sizeBoxes.forEach(b => b.classList.remove('selected'));
        // Füge die Auswahl zur geklickten Größe-Box hinzu
        this.classList.add('selected');
    });
});
document.getElementById("return-to-study").addEventListener("click", function() {
    // Weiterleitung zur Studien-Website
    window.location.href = "https://ww2.unipark.de/uc/Praxisprojekte/ace7/";
});


