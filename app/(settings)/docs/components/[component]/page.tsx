import { DEMOS } from "@/components/demos/registry"
import { ComponentDocs } from "./component-docs"

// Static export (GitHub Pages): every component page is generated at build time.
export const dynamicParams = false
export function generateStaticParams() {
  return DEMOS.map(d => ({ component: d.name }))
}

export default async function Page({ params }: { params: Promise<{ component: string }> }) {
  const { component } = await params
  return <ComponentDocs name={component} />
}
