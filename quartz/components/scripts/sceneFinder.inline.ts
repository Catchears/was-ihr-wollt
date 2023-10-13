let targetUrl = ""

if (
  location.hostname === "localhost" ||
  location.hostname === "127.0.0.1" ||
  location.hostname === ""
) {
  targetUrl = "http://localhost:8080/static/stage-presence.json"
} else {
  targetUrl = "https://catchears.github.io/was-ihr-wollt/static/stage-presence.json"
}

try {
  var datapromise = fetch(targetUrl).then(
    (response) => {
      return response.json()
    },
    (response) => {
      console.warn("wasn't able to load stage presence data!")
      return undefined
    },
  )
} catch (e) {
  if (e instanceof SyntaxError) {
  } else {
    throw e
  }
}

type dataRow = {
  index: number
  act: number
  scene: number
  data: number
  oldData: string
  halePage: number
  titubaPage: number
  gilesPage: number
}
type stagePresenceData = {
  key: string[]
  data: dataRow[]
}

function formatData(data: any): stagePresenceData {
  const new_data: dataRow[] = []
  data.data.forEach((value: any) => {
    new_data.push({
      index: value.index,
      act: value.act,
      scene: value.scene,
      data: parseInt(value.data, 2),
      halePage: value.halePage,
      titubaPage: value.titubaPage,
      gilesPage: value.gilesPage,
      oldData: value.data,
    })
  })
  return {
    key: data.key,
    data: new_data,
  }
}

function getIndexFromId(id: string): number | undefined {
  const index = parseInt((document.getElementById(id) as HTMLInputElement).value)
  if (index < 2) {
    return undefined
  }
  return index
}

function getNamesFromKey(data: stagePresenceData, key: number): string[] {
  const stringKey = key.toString(2).padStart(data.key.length, "0")
  let names: string[] = []
  for (const [index, name] of data.key.entries()) {
    if (index >= 2) {
      if (stringKey[index] === "1") {
        names.push(name)
      }
    }
  }
  return names
}

function sortNames(names: string[]): string[] {
  return names
}

function getLink(act: number, scene: number): HTMLHeadingElement {
  let heading = document.createElement("h2")

  let link = document.createElement("a")

  link.innerText = `Akt ${act}, Szene ${scene}`

  link.classList.add("internal")
  const dataSlug = `act-${act}/act-${act}-scene-${scene}`
  link.setAttribute("data-slug", dataSlug)
  link.href = `./${dataSlug}`
  heading.appendChild(link)
  return heading
}

function getMapKey(row: dataRow): string {
  return `a${row.act}s${row.scene}`
}

// @ts-expect-error
window.buttonPressedCallback = async function () {
  const data = formatData(await datapromise)
  const indices: (number | undefined)[] = []
  for (let i = 1; i < 4; i++) {
    indices.push(getIndexFromId(`char-select-${i}`))
  }

  const chosenEdition = localStorage.getItem("bookEdition") ?? "hale"

  let chararray: string[] = []
  indices.forEach((value) => {
    if (value !== undefined) {
      chararray.push(data.key[value])
    }
  })
  const chars = [...new Set(chararray)]

  if (chars.length === 0) {
    return
  }

  let stringkey = ""

  data.key.forEach((value: string) => {
    if (chars.includes(value)) {
      stringkey = stringkey.concat("1")
    } else {
      stringkey = stringkey.concat("0")
    }
  })

  let key = parseInt(stringkey, 2)

  let results = new Map<string, dataRow[]>()

  let lastKeySet: string = ""

  for (let i = 0; i < data.data.length; i++) {
    if ((key & ~data.data[i].data) === 0) {
      let key = getMapKey(data.data[i])
      if (results.has(key)) {
        const pushTarget = results.get(key)!
        pushTarget.push(data.data[i])
        results.set(key, pushTarget)
      } else {
        results.set(key, [data.data[i]])
      }
      lastKeySet = key
    }
  }

  const target = document.getElementById("character-search-results")!

  target.innerHTML = ""

  for (const [key, values] of results.entries()) {
    let node = document.createElement("div")
    node.classList.add("scrollable-element")

    let h2 = getLink(values[0].act, values[0].scene)
    let ul = document.createElement("ol")
    ul.classList.add("char-list")

    values.forEach((value) => {
      let li = document.createElement("li")
      let pageNumber = 999
      switch (chosenEdition) {
        case "Neue Reclam-Ausgabe": {
          pageNumber = value.halePage
          break
        }
        case "Alte Reclam-Ausgabe": {
          pageNumber = value.gilesPage
          break
        }
        case "Deutsch-Englisch Reclam-Ausgabe": {
          pageNumber = value.titubaPage
          break
        }
      }
      li.setAttribute("value", (pageNumber ?? 999).toString())
      li.innerText = sortNames(getNamesFromKey(data, value.data)).join(", ")
      ul.appendChild(li)
    })
    node.appendChild(h2)
    node.appendChild(ul)
    if (!(key === lastKeySet)) {
      let hr = document.createElement("hr")
      node.appendChild(hr)
    }
    target.appendChild(node)
  }

  if (results.size === 0) {
    let node = document.createElement("div")
    let h2 = document.createElement("h2")
    node.classList.add("scrollable-element")
    h2.innerHTML = `Keine Szene gefunden!`
    node.appendChild(h2)
    target.appendChild(node)
  }

  if (target.classList.contains("hidden")) {
    target.classList.remove("hidden")
  }

  const reloadWarning = document.getElementById("reload-warning")!
  if (!reloadWarning.classList.contains("hidden")) {
    reloadWarning.classList.add("hidden")
  }
  // @ts-expect-error
  document.dispatchEvent(new CustomEvent("reload-links"))
}
