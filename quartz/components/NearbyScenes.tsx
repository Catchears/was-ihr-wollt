import { FullSlug, SimpleSlug, resolveRelative } from "../util/path"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

const all_scenes = [
  "11",
  "12",
  "13",
  "14",
  "15",
  "21",
  "22",
  "23",
  "24",
  "25",
  "31",
  "32",
  "33",
  "34",
  "41",
  "42",
  "43",
  "51",
]

function getSimpleSlug(index: number) {
  return ("act-" + all_scenes[index][0] + "/act-" + all_scenes[index][0] + "-scene-" + all_scenes[index][1]) as SimpleSlug
}

function formatLink(display: string, baseSlug: FullSlug, goalSlug: SimpleSlug) {
  return <a href={resolveRelative(baseSlug, goalSlug)}>{display}</a>
}

export default (() => {
  function NearbyScenes({ cfg, fileData }: QuartzComponentProps) {
    if (!fileData.frontmatter!.title.startsWith("Akt")) {
      return <></>
    } else if (!fileData.frontmatter!.title.includes(" Szene ")) {
      return <></>
    }
    let previous_scene = <></>;
    let next_scene = <></>;
    const matches = fileData.frontmatter!.title.match(/Akt (\d), Szene (\d)/);
    if (matches === null) {
      console.log(fileData.frontmatter!.title);
      return <></>
    }
    const act = parseInt(matches[1])
    const scene = parseInt(matches[2])
    const index = all_scenes.indexOf(act.toString() + scene.toString())

    if (!(act === 1 && scene === 1)) {
      previous_scene = formatLink("Vorherige Szene", fileData.slug!, getSimpleSlug(index - 1))
    } else {
      previous_scene = <s class="scene-strikethrough">Vorherige Szene</s>
    }
    if (!(act === 5 && scene === 1)) {
      next_scene = formatLink("Nächste Szene", fileData.slug!, getSimpleSlug(index + 1))
    } else {
      next_scene = <s class="scene-strikethrough">Nächste Szene</s>
    }


    let links = [];
    links.push(previous_scene)
    links.push(" | ")
    links.push(next_scene)
    return <p class="nearby-scenes">{links}</p>
  }

  NearbyScenes.css = `
  .nearby-scenes {
    margin-top: 0;
    color: var(--gray);
  }
  .scene-strikethrough {
    font-weight: 600;
  }
  `
  return NearbyScenes
}) satisfies QuartzComponentConstructor
