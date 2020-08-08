const button = document.querySelector("#add-time");

button.addEventListener("click", () => {
    const newFieldContainer = document.querySelector(".schedule-item").cloneNode(true);
    const fields = newFieldContainer.querySelectorAll("input");
    const localFieldContainer = document.querySelector("#schedule");

    fields.forEach(valor => valor.value = "");

    localFieldContainer.appendChild(newFieldContainer);
})