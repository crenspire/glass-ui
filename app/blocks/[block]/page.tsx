import { BLOCKS } from "@/lib/blocks"
import { BlockDetail } from "./block-detail"

// Static export (GitHub Pages): every block page is generated at build time.
export const dynamicParams = false
export function generateStaticParams() {
  return BLOCKS.map(b => ({ block: b.name }))
}

export default async function Page({ params }: { params: Promise<{ block: string }> }) {
  const { block } = await params
  return <BlockDetail name={block} />
}
