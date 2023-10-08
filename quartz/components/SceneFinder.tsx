// @ts-ignore
import sceneFinderScript from "./scripts/sceneFinder.inline"
import style from "./styles/sceneFinder.scss"

import { QuartzComponentProps, QuartzComponentConstructor } from "./types"


export default (() => {
    function SceneFinder({ }: QuartzComponentProps) {
        return <></>
    }
    SceneFinder.afterDOMLoaded = sceneFinderScript
    SceneFinder.css = style
    return SceneFinder
}) satisfies QuartzComponentConstructor