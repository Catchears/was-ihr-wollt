import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      Quelle: "https://github.com/Catchears/was-ihr-wollt",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.NearbyScenes()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(
      Component.Explorer({
        title: "Übersicht",
        mapFn: (node) => {
          node.displayName = node.displayName
            .replace("act", "Akt")
            .replace("-", " ")
            .replace("figuren", "Figuren")
        },
      }),
    ),
  ],
  right: [
    Component.DesktopOnly(
      Component.Graph({
        localGraph: {
          drag: true, // whether to allow panning the view around
          zoom: true, // whether to allow zooming in and out
          depth: 1, // how many hops of notes to display
          scale: 1.2, // default view scale
          repelForce: 0.7, // how much nodes should repel each other
          centerForce: 0.3, // how much force to use when trying to center the nodes
          linkDistance: 40, // how long should the links be by default?
          fontSize: 0.5, // what size should the node labels be?
          opacityScale: 4, // how quickly do we fade out the labels when zooming out?
        },
        globalGraph: {
          drag: true,
          zoom: true,
          depth: -1,
          scale: 0.9,
          repelForce: 0.7,
          centerForce: 0.3,
          linkDistance: 45,
          fontSize: 0.6,
          opacityScale: 1,
        },
      }),
    ),
    Component.DesktopOnly(
      Component.Breadcrumbs({
        rootName: "Was Ihr Wollt",
        resolveFrontmatterTitle: true,
        hideOnRoot: false,
      }),
    ),
    Component.MobileOnly(
      Component.Explorer({
        title: "Übersicht",
        mapFn: (node) => {
          node.displayName = node.displayName
            .replace("act", "Akt")
            .replace("-", " ")
            .replace("figuren", "Figuren")
        },
      }),
    ),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.DesktopOnly(Component.Backlinks()),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.RedirectToIndex()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(
      Component.Explorer({
        title: "Übersicht",
        mapFn: (node) => {
          node.displayName = node.displayName
            .replace("act", "Akt")
            .replace("-", " ")
            .replace("figuren", "Figuren")
        },
      }),
    ),
  ],
  right: [
    Component.MobileOnly(
      Component.Explorer({
        title: "Übersicht",
        mapFn: (node) => {
          node.displayName = node.displayName
            .replace("act", "Akt")
            .replace("-", " ")
            .replace("figuren", "Figuren")
        },
      }),
    ),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.DesktopOnly(Component.Backlinks()),
    Component.SceneFinder(),
    Component.BookSelection(),
  ],
}
