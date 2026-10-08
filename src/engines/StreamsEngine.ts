import type { File } from '../types/adapterTypes'
import type { Fragmenter, FragmentOptions } from '../types/fragmenterTypes'

export type StreamsEngineConfig = { adapter: Fragmenter }

export class StreamsEngine {
  private readonly fragmenter: Fragmenter

  constructor (config: StreamsEngineConfig) {
    this.fragmenter = config.adapter
  }

  async fragment (files: File[], outputDir: string, options?: FragmentOptions) {
    const result = this.fragmenter.fragment(files, outputDir, options)
    return result
  }
}
