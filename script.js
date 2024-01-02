document.addEventListener("DOMContentLoaded", function () {

    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".number, .operator, .clear, .equal");

    // Zmienna przechowująca
    let currentInput = "";

    // Funkcja sprawdzająca, czy ostatni znak to operator
    function LastOperator(input) {
        const operators = ["+", "-", "*", "/"];
        const lastChar = input.charAt(input.length - 1);
        return operators.includes(lastChar);
    }

    // Funkcja sprawdzająca, czy wyrażenie matematyczne jest bezpieczne
    function isExpressionSafe(expression) {
        const lastTwoChars = expression.slice(-2);
        return !lastTwoChars.includes("/0");
    }

    // Funkcja dodająca obsługę dla przycisków numerycznych i operatorów
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            const buttonText = button.textContent || button.dataset.value;

            if (buttonText === "C") {
                // Jeśli naciśnięty przycisk to "C", czyścimy
                currentInput = "";
            } else if (buttonText === "=") {
                // Jeśli naciśnięty przycisk to "=", wykonujemy obliczenia
                try {
                    if (isExpressionSafe(currentInput)) {
                        currentInput = eval(currentInput).toString();
                    } else {
                        currentInput = "Błąd";
                    }
                } catch (error) {
                    currentInput = "Błąd";
                }
            } else if (buttonText === "/" && currentInput === "") {
                // Jeśli pierwszy przycisk to "/", traktujemy to jako 0/
                currentInput = "0/";
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
