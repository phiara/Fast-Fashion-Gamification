document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        var wheelContainer = document.getElementById('wheel-container');

        // Overlay erstellen
        var overlay = document.createElement('div');
        overlay.id = 'wheel-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '1000';

        // Popup erstellen
        var popup = document.createElement('div');
        popup.id = 'wheel-popup';
        popup.style.position = 'relative';
        popup.style.width = '400px';
        popup.style.height = '400px';
        popup.style.backgroundColor = 'transparent';
        popup.style.borderRadius = '10px';
        popup.style.padding = '20px';
        popup.style.boxSizing = 'border-box';
        popup.style.display = 'flex';
        popup.style.flexDirection = 'column';
        popup.style.justifyContent = 'center';
        popup.style.alignItems = 'center';

        // Rad erstellen
        var wheelDiv = document.createElement('div');
        wheelDiv.id = 'wheel-div';
        wheelDiv.style.position = 'relative';
        wheelDiv.style.width = '300px';
        wheelDiv.style.height = '300px';
        wheelDiv.style.transformOrigin = '50% 50%';
        wheelDiv.style.transition = 'transform 5s cubic-bezier(0.33, 1, 0.68, 1)';

        // Rad-Leinwand
        var wheelCanvas = document.createElement('canvas');
        wheelCanvas.id = 'wheel';
        wheelCanvas.width = 300;
        wheelCanvas.height = 300;
        wheelDiv.appendChild(wheelCanvas);
        popup.appendChild(wheelDiv);

        // Pfeil hinzufügen
        var arrow = document.createElement('div');
        arrow.id = 'wheel-arrow';
        arrow.style.position = 'absolute';
        arrow.style.top = '-10px';
        arrow.style.left = '50%';
        arrow.style.transform = 'translate(-50%, 0) rotate(180deg)';
        arrow.style.width = '0';
        arrow.style.height = '0';
        arrow.style.borderLeft = '20px solid transparent';
        arrow.style.borderRight = '20px solid transparent';
        arrow.style.borderBottom = '30px solid red';
        arrow.style.zIndex = '2';
        popup.appendChild(arrow);

        // Dreh-Button
        var spinButton = document.createElement('button');
        spinButton.id = 'spin-button';
        spinButton.innerText = 'Drehen';
        spinButton.style.marginTop = '20px';
        spinButton.style.padding = '10px 20px';
        spinButton.style.fontSize = '16px';
        popup.appendChild(spinButton);

        // Vorbereitungsbanner
        var preSpinBanner = document.createElement('div');
        preSpinBanner.id = 'pre-spin-banner';
        preSpinBanner.innerText = 'Drehe das Glücksrad!';
        preSpinBanner.style.position = 'absolute';
        preSpinBanner.style.top = '-60px';
        preSpinBanner.style.left = '0';
        preSpinBanner.style.width = '100%';
        preSpinBanner.style.height = '50px';
        preSpinBanner.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        preSpinBanner.style.display = 'flex';
        preSpinBanner.style.justifyContent = 'center';
        preSpinBanner.style.alignItems = 'center';
        preSpinBanner.style.color = '#fff';
        preSpinBanner.style.fontSize = '24px';
        preSpinBanner.style.textAlign = 'center';
        preSpinBanner.style.padding = '0 20px';
        preSpinBanner.style.zIndex = '3';
        preSpinBanner.style.pointerEvents = 'none';
        popup.appendChild(preSpinBanner);

        overlay.appendChild(popup);
        wheelContainer.appendChild(overlay);

        // Radabschnitte
        var sectors = [
            { label: '35%', color: '#f1c40f' },
            { label: '30%', color: '#e67e22' },
            { label: '25%', color: '#e74c3c' },
            { label: '20%', color: '#9b59b6' },
            { label: '15%', color: '#3498db' },
            { label: '10%', color: '#19e619' }
        ];

        // Rad zeichnen
        function drawWheel() {
            var ctx = wheelCanvas.getContext('2d');
            var centerX = wheelCanvas.width / 2;
            var centerY = wheelCanvas.height / 2;
            var radius = Math.min(centerX, centerY);
            var startAngle = 0;

            for (var i = 0; i < sectors.length; i++) {
                var sector = sectors[i];
                var endAngle = startAngle + (2 * Math.PI / sectors.length);

                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
                ctx.closePath();
                ctx.fillStyle = sector.color;
                ctx.fill();

                ctx.save();
                ctx.translate(centerX, centerY);
                ctx.rotate(startAngle + (endAngle - startAngle) / 2);
                ctx.textAlign = 'right';
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 20px sans-serif';
                ctx.fillText(sector.label, radius - 10, 0);
                ctx.restore();

                startAngle = endAngle;
            }
        }

        drawWheel();

        // Klick auf Dreh-Button
        spinButton.addEventListener('click', function() {
            spinButton.disabled = true;
            preSpinBanner.style.display = 'none';

            var sectorAngle = 360 / sectors.length;
            var stopAtSector = 1;
            var randomFullRotations = 5;
            var totalRotation = 360 * randomFullRotations + (270 - (sectorAngle * stopAtSector) - (sectorAngle / 2));

            wheelDiv.style.transform = 'rotate(' + totalRotation + 'deg)';

            setTimeout(function() {
                showResult();
            }, 5000);
        });

        // Ergebnisanzeige
        function showResult() {
            var resultBanner = document.createElement('div');
            resultBanner.id = 'result-banner';
            resultBanner.style.position = 'absolute';
            resultBanner.style.top = '0.5';
            resultBanner.style.left = '1';
            resultBanner.style.width = '85%';
            resultBanner.style.height = '40%';
            resultBanner.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
            resultBanner.style.display = 'flex';
            resultBanner.style.justifyContent = 'center';
            resultBanner.style.alignItems = 'center';
            resultBanner.style.flexDirection = 'column';
            resultBanner.style.zIndex = '3';

            var resultText = document.createElement('div');
            resultText.innerText = 'Herzlichen Glückwunsch, du hast 30% Rabatt erhalten!';
            resultText.style.color = '#fff';
            resultText.style.fontSize = '24px';
            resultText.style.marginBottom = '20px';
            resultText.style.textAlign = 'center';
            resultText.style.padding = '0 20px';

            var closeIcon = document.createElement('div');
            closeIcon.innerHTML = '&times;';
            closeIcon.style.position = 'absolute';
            closeIcon.style.top = '10px';
            closeIcon.style.right = '10px';
            closeIcon.style.fontSize = '30px';
            closeIcon.style.color = '#fff';
            closeIcon.style.cursor = 'pointer';

            closeIcon.addEventListener('click', function() {
                overlay.remove();
            
                // Rabatt-Hinweis anzeigen
                var discountMessage = document.getElementById('discount-message');
                if (discountMessage) {
                    discountMessage.style.display = 'block';
                }
            });

            resultBanner.appendChild(closeIcon);
            resultBanner.appendChild(resultText);
            popup.appendChild(resultBanner);

            // Konfetti starten
            confetti({
                particleCount: 200,
                spread: 160,
                origin: { x: 0.6, y: 0.6 },
                colors: ['#ff0', '#f60', '#f00', '#00f', '#0f0']
            });
        }
    }, 2000);
});
