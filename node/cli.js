import { readdir, stat } from "node:fs/promises"
import { join } from "node:path"

const dir = process.argv[2] ?? "."

const formatBytes = (size) => {
  if (size < 1024) return `${size} B`
  return `${(size / 1024).toFixed(2)} KB`
}

const files = await readdir(dir)

const entries = await Promise.all(
    files.map( async(name) => {
        const fullPath = join(dir, name)
        const info = await stat(fullPath)

        return {
            name,
            isDir: info.isDirectory(),
            size: formatBytes(info.size)
        }
    })
)

for(const entry of entries) {
    const icon = entry.isDir ? '📁' : '📄'
    const size = entry.isDir ? '-' : ` ${entry.size}`
    console.log(`${icon} ${entry.name.padEnd(25)}    ${size}`)
}