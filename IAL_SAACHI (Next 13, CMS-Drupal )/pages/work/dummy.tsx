import { drupal } from "lib/drupal";
export default function Page({ node }) {
  return (
    <article>
      <h1>workinhg</h1>
      // ...
    </article>
  )
}

export async function getStaticPaths(context) {
  // Build paths for all `node--work_page`.
  return {
    paths: await drupal.getStaticPathsFromContext("node--work_page", context),
    fallback: false,
  }
}

export async function getStaticProps(context) {


//   const workPageCard = await drupal.getResourceCollectionFromContext<
//   DrupalNode[]
// >("node--work_page", context, {
//   params: {
//     // "filter[status]": 1,
//     "fields[node_type--node_type]": "title,",
//     "filter[tf][condition][path]":"title",
//     "filter[tf][condition][value]":titles,
//     sort: "-created",
//   },
// });

  const path = await drupal.translatePathFromContext(context)
  const node = await drupal.getResourceFromContext(path, context)
  return {
    props: {
      node,
    },
  }
}