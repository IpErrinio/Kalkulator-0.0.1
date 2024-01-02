document.addEventListener("DOMContentLoaded", function () {
    
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll("button");

    // Zmienna przechowująca
    let currentInput = "";

    // Funkcja sprawdzająca, czy ostatni znak to operator
    function LastOperator(input) {
        const operators = ["+", "-", "*", "/"];
        const lastChar = input.charAt(input.length - 1);
        return operators.includes(lastChar);
    }

    // Funkcja dodająca obsługę dla przycisków numerycznych i operatorów
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            const buttonText = button.textContent;

            if (buttonText === "C") {
                // Jeśli naciśnięty przycisk to "C", czyścimy
                currentInput = "";
            } else if (buttonText === "=") {
                // Jeśli naciśnięty przycisk to "=", wykonujemy obliczenia
                try {
                    currentInput = eval(currentInput).toString();
                } catch (error) {
                    currentInput = "Błąd";
                }
            } else if (LastOperator(currentInput) && buttonText.match(/[\+\-\*\/]/)) {
                // Jeśli ostatni znak to operator, a naciśnięty przycisk to też operator, zastępujemy go nowym
                currentInput = currentInput.slice(0, -1) + buttonText;
            } else {
                // W przeciwnym razie dodajemy naciśnięty przycisk do aktualnych danych
                currentInput += buttonText;
            }

            // Aktualizacja widoku na ekranie
            display.textContent = currentInput;

            // Jeśli naciśnięty przycisk to "=", czyścimy dane, aby rozpocząć nowe obliczenia
            if (buttonText === "=") {
                currentInput = "";
            }
        });
    });
});
