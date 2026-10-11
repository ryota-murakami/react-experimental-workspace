// Named import: the package is CJS, and Vite 8 no longer unwraps its `exports.default` for a default import
import { classed } from 'classed-components'

export const Page = () => <></>

Page.Container = classed.div('container px-4 min-h-dvh mx-auto flex flex-col')
