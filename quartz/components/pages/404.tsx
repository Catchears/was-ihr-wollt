import { QuartzComponentConstructor } from "../types"

function NotFound() {
  return (
    <article class="popover-hint">
      <h1>404</h1>
      <p>Diese Seite existiert noch nicht!</p>
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
