function getBook() {
  return localStorage.getItem("bookEdition") ?? "Neue Reclam-Ausgabe"
}

function changeBook(event: Event) {
  localStorage.setItem(
    "bookEdition",
    (event.target as HTMLSelectElement).options[(event.target as HTMLSelectElement).selectedIndex]
      .text,
  )

  const resultsList = document.getElementById("character-search-results")
  if (resultsList) {
    resultsList.innerHTML = ""
    if (!resultsList.classList.contains("hidden")) {
      resultsList.classList.add("hidden")
    }
  }
}

// function setSelect() {
//   const select = document.getElementById("character-search-results")
// }

document.addEventListener("nav", () => {
  const editionNames = [
    "Neue Reclam-Ausgabe",
    "Alte Reclam-Ausgabe",
    "Deutsch-Englisch Reclam-Ausgabe",
  ]

  let bookSelect = document.getElementById("book-select") as HTMLSelectElement
  if (bookSelect) {
    bookSelect.value = editionNames.indexOf(getBook()).toString()
    bookSelect.addEventListener("change", changeBook)
  }
})
