import fs from 'node:fs'

// stat -> verifica se existe
// unlink -> deleta o arquivo

export const deleteFile = async (filename: string) => {
  try {
    await fs.promises.stat(filename)
  } catch (error) {
    return console.log(error)
  }

  await fs.promises.unlink(filename)
}
