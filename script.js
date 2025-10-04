//your JS code here. If required.
const form = document.querySelector("form")
form.addEventListener("submit", (e)=>{
	e.preventDefault()
	const size = Number(document.querySelector("#fontsize").value)
	const color = document.querySelector("#fontcolor").value
	console.log(color)
	document.cookie = `fontsize=${size}; fontcolor=${color}`
})
	const size = document.querySelector("#fontsize")
	const color = document.querySelector("#fontcolor")
	size.value =getCookie("fontsize")
	color.value = getCookie("fontcolor")
function getCookie(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; '); // Split into individual cookie strings

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const [cookieName, cookieValue] = cookie.split('='); // Split into name and value

    if (cookieName === name) {
      return decodeURIComponent(cookieValue); // Decode the value in case of special characters
    }
  }
  return null; // Return null if the cookie is not found
}


