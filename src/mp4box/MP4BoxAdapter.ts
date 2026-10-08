import { asyncSubprocess } from '../lib/subprocess'
import type { File } from '../types/adapterTypes'
import type { Fragmenter, FragmentOptions, FragmentResult } from '../types/fragmenterTypes'

export class MP4BoxAdapter implements Fragmenter {
  private binaryPath: string

  constructor (binaryPath = 'MP4Box') {
    this.binaryPath = binaryPath
  }

  async fragment (files: File[], outputDir: string, options?: FragmentOptions): Promise<FragmentResult> {
    const args = ['-dash', '4000', '-frag', '4000', '-rap', '--stl', '-segment-name', '$RepresentationID$_', '-fps', '24']

    for (const { res, path } of files) {
      const isAudio = res === 'audio'
      const origin = `${path}#${isAudio ? 'audio' : 'video'}`
      const identificator = `:id=${res}/${res}`
      const role = isAudio ? ':role=main' : ''
      const destination = `:dst=${outputDir}/${res}`
      
      args.push(`${origin}${identificator}${role}${destination}`)
    }

    const outputManifest = `${outputDir}/manifest.mpd`
    args.push('-out', outputManifest)

    const result = await asyncSubprocess(this.binaryPath, args, options)
    
    if (result.type === 'error') {
      throw result.error
    }

    return { outputManifest }
  }
}
