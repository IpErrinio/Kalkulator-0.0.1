document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".number, .operator, .clear, .equal");

    // Funkcja resetująca kalkulator do stanu początkowego
    function resetCalculator() {
        currentInput = "0";
    }

    // Zmienna przechowująca
    let currentInput = "0";

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
            const buttonText = button.textContent;

            // Sprawdź, czy ostatni znak to operator
            const lastCharIsOperator = LastOperator(currentInput);

            if (buttonText === "C") {
                // Jeśli naciśnięty przycisk to "C", resetujemy kalkulator
                resetCalculator();
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
            } else if (buttonText.match(/[+\-*/]/)) {
                // Jeśli naciśnięty przycisk to operator
                if (currentInput === "0" && buttonText.match(/[+\-*/]/)) {
                    // Jeśli currentInput to "0" i naciśnięty przycisk to operator, zignoruj
                } else if (lastCharIsOperator) {
                    // Jeśli ostatni znak to operator, zastąp go nowym operatorem
                    currentInput = currentInput.slice(0, -1) + buttonText;
                } else {
                    // W przeciwnym razie dodajemy naciśnięty przycisk do aktualnych danych
                    currentInput += buttonText;
                }
            } else {
                // W przeciwnym razie dodajemy naciśnięty przycisk do aktualnych danych
                if (currentInput === "0") {
                    currentInput = buttonText;
                } else {
                    currentInput += buttonText;
                }
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
