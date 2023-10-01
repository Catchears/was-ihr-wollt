import { QuartzComponentProps, QuartzComponentConstructor } from "./types"

export default (() => {
    function RedirectToIndex({ fileData }: QuartzComponentProps) {
        const results = fileData.slug?.match(/^act-(\d)/)
        if (results === undefined || results === null) {
            return <></>
        }
        return <meta http-equiv="Refresh" content={`0; url='act-${results[1]}-index'`} />
    }

    return RedirectToIndex
}) satisfies QuartzComponentConstructor