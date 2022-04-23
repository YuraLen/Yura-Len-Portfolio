document.addEventListener("DOMContentLoaded", () => {
  const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  const INPUT = document.querySelector('._email');
  function validateEmail(value) {
    return EMAIL_REGEXP.test(value);
  }
  function updateInput() {
    if (validateEmail(INPUT.value)) INPUT.style.borderColor = 'green';
    else INPUT.style.borderColor = 'red';
  }

  INPUT.addEventListener('input', updateInput);

  const form = document.getElementById("form")
  form.addEventListener("submit", formSend)

  async function formSend(e) {
    e.preventDefault()

    form.classList.add("_sending")
    let response = await fetch("sendmail.php", {
      method: "POST",
      body: formData
    })
    if (response.ok) {
      let result = await response.json();
      alert(result.message);
      formPreview.innerHTML = "";
      form.reset()
    } else {
      alert("Ошибка отправки")
    }
  }
})

