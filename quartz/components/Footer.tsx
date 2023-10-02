import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  function Footer({ fileData, displayClass }: QuartzComponentProps) {
    let links = opts?.links ?? []

    const slug = /.\/index/.test(fileData.slug!) ? fileData.slug?.substring(0, fileData.slug.indexOf("/index")) : `${fileData.slug}.md`

    if (slug !== undefined) {
      links = {
        Quelltext: `https://github.com/Catchears/was-ihr-wollt/blob/main/content/${slug}`,
        ...links
      }
    }

    return (
      <footer class={`${displayClass ?? ""}`}>
        <hr />
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
