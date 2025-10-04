// Helper: Set cookie with name, value, and expiration days
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

// Helper: Get cookie by name
function getCookie(name) {
  const cookieArr = document.cookie.split("; ");
  for (let c of cookieArr) {
    const [key, value] = c.split("=");
    if (key === name) return value;
  }
  return null;
}

// Apply font preferences from cookies
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

// ✅ Wait for DOM before accessing form
window.addEventListener("DOMContentLoaded", () => {
  applyPreferences();

  const form = document.getElementById("fontForm");
  if (!form) return; // safety check

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fontSize = document.getElementById("fontsize").value;
    const fontColor = document.getElementById("fontcolor").value;

    // Save cookies for 7 days
    setCookie("fontsize", fontSize, 7);
    setCookie("fontcolor", fontColor, 7);

    // Apply immediately
    document.documentElement.style.setProperty("--fontsize", fontSize + "px");
    document.documentElement.style.setProperty("--fontcolor", fontColor);
  });
});
