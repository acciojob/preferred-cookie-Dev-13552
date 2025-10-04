// --- Helper functions ---
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  // Cypress-friendly cookie (no Secure flag)
  document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/`;
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, val] = cookie.split("=");
    if (key === name) return val;
  }
  return null;
}

// --- Apply preferences from cookies ---
function applyPreferences() {
  const fontSize = getCookie("fontsize");
  const fontColor = getCookie("fontcolor");
  const root = document.documentElement;

  if (fontSize) {
    root.style.setProperty("--fontsize", fontSize + "px");
    document.getElementById("fontsize").value = fontSize;
  }
  if (fontColor) {
    root.style.setProperty("--fontcolor", fontColor);
    document.getElementById("fontcolor").value = fontColor;
  }
}

// --- Wait until DOM ready ---
window.addEventListener("DOMContentLoaded", () => {
  applyPreferences();

  const form = document.getElementById("fontForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fontSize = document.getElementById("fontsize").value;
    const fontColor = document.getElementById("fontcolor").value;

    // ✅ Set cookies visible to Cypress
    setCookie("fontsize", fontSize, 7);
    setCookie("fontcolor", fontColor, 7);

    // ✅ Apply styles immediately
    document.documentElement.style.setProperty("--fontsize", fontSize + "px");
    document.documentElement.style.setProperty("--fontcolor", fontColor);
  });
});
