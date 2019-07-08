import { resolve } from 'path'
import { existsSync, readFileSync } from 'fs'

import { sourcePath } from './env'

export const getData = () => {
  const jsonFile = resolve(sourcePath, 'templates/data.json')
  const jsonExists = existsSync(jsonFile)

  if (jsonExists) {
    const rawdata = readFileSync(jsonFile)
    return JSON.parse(rawdata)
  }

  return {}
}
