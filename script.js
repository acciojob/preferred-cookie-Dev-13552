// ✅ Set cookie with proper attributes (Cypress-compatible)
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  // "SameSite=None; Secure" ensures visibility under Cypress localhost
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; SameSite=None; Secure`;
}

// ✅ Get cookie value by name
function getCookie(name) {
  const cookieArr = document.cookie.split("; ");
  for (let c of cookieArr) {
    const [key, value] = c.split("=");
    if (key === name) return value;
  }
  return null;
}

// ✅ Apply preferences from cookies (if exist)
function applyPreferences() {
  const savedFontSize = getCookie("fontsize");
  const savedFontColor = getCookie("fontcolor");

  const root = document.documentElement;
  const fontSizeInput = document.getElementById("fontsize");
  const fontColorInput = document.getElementById("fontcolor");

  if (savedFontSize) {
    root.style.setProperty("--fontsize", savedFontSize + "px");
    fontSizeInput.value = savedFontSize;
  }

  if (savedFontColor) {
    root.style.setProperty("--fontcolor", savedFontColor);
    fontColorInput.value = savedFontColor;
  }
}

// ✅ Wait for DOM before using form
window.addEventListener("DOMContentLoaded", () => {
  applyPreferences();

  const form = document.getElementById("fontForm");
  if (!form) return; // Safety guard for Cypress timing

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fontSize = document.getElementById("fontsize").value;
    const fontColor = document.getElementById("fontcolor").value;

    // ✅ Save cookies for 7 days
    setCookie("fontsize", fontSize, 7);
    setCookie("fontcolor", fontColor, 7);

    // ✅ Apply immediately
    document.documentElement.style.setProperty("--fontsize", fontSize + "px");
    document.documentElement.style.setProperty("--fontcolor", fontColor);
  });
});
