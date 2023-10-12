// @ts-expect-error
import script from "./scripts/bookSelection.inline"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"


export default (() => {
    function BookSelection({ }: QuartzComponentProps) {
        return <></>
    }
    BookSelection.afterDOMLoaded = script
    return BookSelection
}) satisfies QuartzComponentConstructor