document.addEventListener("DOMContentLoaded", function () {
  // Pobieramy element wyświetlacza kalkulatora oraz wszystkie przyciski
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(
    ".number, .operator, .clear, .equal, .dot"
  );
  const backspaceButton = document.querySelector(".backspace");

  // Inicjalizujemy zmienne przechowujące aktualny stan kalkulatora
  let currentInput = "0";
  let hasDot = false; // Zmienna określająca, czy na wyświetlaczu znajduje się już kropka

  // Funkcje operacji kalkulatora
  function resetCalculator() {
    currentInput = "0";
    hasDot = false;
    display.textContent = currentInput;
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

  // Funkcja obsługująca wciśnięcie klawisza na klawiaturze
  function handleKeyPress(event) {
    const key = event.key;

    if (key >= "0" && key <= "9") {
      handleButtonPress(key);
    } else if (key === ".") {
      handleButtonPress(key);
    } else if (key.match(/[+\-*\/]/)) {
      handleButtonPress(key);
    } else if (key === "Enter") {
      handleButtonPress("=");
    } else if (key === "Backspace") {
      handleBackspace();
    } else if (key.toUpperCase() === "C") {
      resetCalculator();
    }
  }

  // Funkcja obsługująca naciśnięcie klawisza przycisku na klawiaturze
  function handleButtonPress(buttonText) {
    const lastCharIsOperator = LastOperator(currentInput);

    if (buttonText === "C") {
      resetCalculator();
    } else if (buttonText === "=") {
      // Wykonujemy obliczenia
      if (isExpressionSafe(currentInput)) {
        const result = eval(currentInput);
        currentInput = result.toString();
      } else {
        currentInput = "Error";
      }
    } else if (buttonText.match(/[+\-*\/]/)) {
      // Obsługa operatorów matematycznych
      if (currentInput === "0" && buttonText.match(/[+\-*\/]/)) {
      } else if (lastCharIsOperator && !hasDot) {
        // Lepsze działanie kropki
        currentInput = currentInput.slice(0, -1) + buttonText;
      } else if (hasDot && buttonText !== "." && !/\d$/.test(currentInput)) {
        alert(
          "Po chuj ci ta kropka jak nawet nie potrafisz w cyferke kliknąć po niej."
        );
      } else {
        currentInput += buttonText;
        hasDot = false;
      }
    } else if (buttonText === ".") {
      // Obsługa kropki
      if (!hasDot && /\d$/.test(currentInput)) {
        currentInput += buttonText;
        hasDot = true;
      }
    } else {
      // Obsługa cyfr
      if (currentInput === "0") {
        currentInput = buttonText;
      } else {
        currentInput += buttonText;
      }
    }

    // Aktualizacja wyświetlacza
    display.textContent = currentInput;
  }

  // Funkcja obsługująca przycisk cofania
  function handleBackspace() {
    if (currentInput.length === 1) {
      currentInput = "0";
    } else {
      currentInput = currentInput.slice(0, -1);
    }
    display.textContent = currentInput;
  }

  // Nasłuchujemy zdarzenia keydown na całym dokumencie
  document.addEventListener("keydown", handleKeyPress);

  // Obsługa kliknięcia na przyciski kalkulatora
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      handleButtonPress(button.textContent);
    });
  });

  // Obsługa kliknięcia na guzik cofający
  backspaceButton.addEventListener("click", function () {
    handleBackspace();
  });
});
