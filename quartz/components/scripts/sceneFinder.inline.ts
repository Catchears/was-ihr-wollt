try {
  var datapromise = fetch(
    "https://catchears.github.io/was-ihr-wollt/static/stage-presence.json",
  ).then(
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

type dataRow = { index: number; act: number; scene: number; data: number; oldData: string }
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

// @ts-expect-error
window.buttonPressedCallback = async function () {
  const data = formatData(await datapromise)
  const indices: (number | undefined)[] = []
  for (let i = 1; i < 4; i++) {
    indices.push(getIndexFromId(`char-select-${i}`))
  }

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

  let results: dataRow[] = []

  let attemptedResults: number[] = []

  for (let i = 0; i < 99; i++) {
    if ((key & ~data.data[i].data) === 0) {
      // uncomment below line to hide duplicate results
      // attemptedResults.push(data.data[i].index)
      if (!attemptedResults.includes(i - 1)) {
        results.push(data.data[i])
      }
    }
  }

  const target = document.getElementById("character-search-results")!

  target.innerHTML = ""

  results.forEach((value) => {
    let node = document.createElement("div")
    let h2 = document.createElement("h2")
    let p = document.createElement("p")
    let hr = document.createElement("hr")

    node.classList.add("scrollable-element")

    h2.innerHTML = `Akt ${value.act}, Szene ${value.scene}`
    p.innerHTML = sortNames(getNamesFromKey(data, value.data)).join(", ")
    node.appendChild(h2)
    node.appendChild(p)
    if (value !== results[results.length - 1]) {
      node.appendChild(hr)
    }
    target.appendChild(node)
  })

  if (results.length === 0) {
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
}
