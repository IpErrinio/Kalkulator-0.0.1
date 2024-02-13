document.addEventListener("DOMContentLoaded", function () {
    // Pobieramy element wyświetlacza kalkulatora oraz wszystkie przyciski
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".number, .operator, .clear, .equal, .dot");
    const backspaceButton = document.querySelector(".backspace");

    // Inicjalizujemy zmienne przechowujące aktualny stan kalkulatora
    let currentInput = "0";
    let hasDot = false; // Zmienna określająca, czy na wyświetlaczu znajduje się już kropka

    // Funkcja resetująca kalkulator do stanu początkowego
    function resetCalculator() {
        currentInput = "0";
        hasDot = false;
    }

    // Funkcja sprawdzająca, czy ostatni znak to operator
    function LastOperator(input) {
        const operators = ["+", "-", "*", "/"];
        const lastChar = input.charAt(input.length - 1);
        return operators.includes(lastChar);
    }

    // Funkcja sprawdzająca, czy wyrażenie matematyczne jest bezpieczne
    function isExpressionSafe(expression) {
        return !expression.includes("/0");
    }

    // Obsługa kliknięcia na każdy przycisk
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            const buttonText = button.textContent; // Pobieramy tekst z przycisku

            const lastCharIsOperator = LastOperator(currentInput); // Sprawdzamy, czy ostatni znak to operator

            // Obsługa przycisku "C" - resetuje kalkulator
            if (buttonText === "C") {
                resetCalculator();
            }
            // Obsługa przycisku "=" - wykonuje obliczenia
            else if (buttonText === "=") {
                // Sprawdzamy, czy po kropce jest cyfra
                if (hasDot && currentInput.endsWith(".")) {
                    alert("Nieprawidłowe wyrażenie matematyczne. Brak cyfry po kropce.");
                } else {
                    try {
                        // Wykonujemy obliczenia
                        if (isExpressionSafe(currentInput)) {
                            const result = eval(currentInput);
                            currentInput = result.toString();
                        } else {
                            currentInput = "Error";
                        }
                    } catch (error) {
                        currentInput = "Error";
                    }
                }
            }
            // Obsługa operatorów matematycznych
            else if (buttonText.match(/[+\-*\/]/)) {
                // Sprawdzamy, czy po kropce jest cyfra
                if (currentInput === "0" && buttonText.match(/[+\-*\/]/)) {
                } else if (lastCharIsOperator && !hasDot) {
                    currentInput = currentInput.slice(0, -1) + buttonText;
                } else if (hasDot && buttonText !== "." && !/\d$/.test(currentInput)) {
                    alert("Nieprawidłowe wyrażenie matematyczne. Brak cyfry po kropce.");
                } else {
                    currentInput += buttonText;
                    hasDot = false;
                }
            }
            // Obsługa kropki
            else if (buttonText === ".") {
                if (!hasDot && /\d$/.test(currentInput)) {
                    currentInput += buttonText;
                    hasDot = true;
                }
            }
            // Obsługa guzika cofającego
            else if (button === backspaceButton) {
                if (currentInput.length === 1) {
                    currentInput = "0"; // Jeśli usuwamy ostatnią cyfrę, ustawiamy wartość domyślną na "0"
                } else {
                    currentInput = currentInput.slice(0, -1); // W przeciwnym razie usuwamy ostatnią cyfrę
                }
            }
            // Obsługa pozostałych przycisków - cyfr
            else {
                if (currentInput === "0") {
                    currentInput = buttonText;
                } else {
                    currentInput += buttonText;
                }
            }

            // Aktualizacja wyświetlacza
            display.textContent = currentInput;

            // Wykonujemy obliczenia po kliknięciu "=" | Sprawdzamy, czy po kropce jest cyfra
            if (buttonText === "=" && (hasDot && currentInput.endsWith("."))) {
                return;
            }

            if (buttonText === "=") {
                try {
                    const result = eval(currentInput);
                    currentInput = result.toString();
                } catch (error) {
                    currentInput = "Error";
                }
            }
        });
    });

    // Obsługa zdarzenia kliknięcia na guzik cofający
    backspaceButton.addEventListener("click", function () {
        if (currentInput.length === 1) {
            currentInput = "0"; // Jeśli usuwamy ostatnią cyfrę, ustawiamy wartość domyślną na "0"
        } else {
            currentInput = currentInput.slice(0, -1); // W przeciwnym razie usuwamy ostatnią cyfrę
        }
        display.textContent = currentInput;
    });
});
