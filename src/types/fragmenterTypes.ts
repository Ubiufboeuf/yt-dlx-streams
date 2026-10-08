import type { File } from './adapterTypes'
import type { SubprocessOptions } from './subprocessTypes'

export interface FragmentOptions extends SubprocessOptions {
  overrideResult?: boolean
}

export interface FragmentResult {
  outputManifest: string
}

export interface Fragmenter {
  fragment (files: File[], outputDir: string, options?: FragmentOptions): Promise<FragmentResult>
}
