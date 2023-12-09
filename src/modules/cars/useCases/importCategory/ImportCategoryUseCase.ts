import fs from 'node:fs'
import { parse } from 'csv-parse'

class ImportCategoryUseCase {
  execute(file: Express.Multer.File): void {
    // Fazendo a leitura do arquivo "por partes"
    const stream = fs.createReadStream(file.path)

    // Definindo o "delimitador" de leitura do arquivo
    const parseFile = parse({
      delimiter: ',',
    })

    // pipe faz com que cada chunk lido, seja enviado para outro local
    stream.pipe(parseFile)

    // lendo linha a linha
    parseFile.on('data', async (line) => {
      console.log(line)
    })
  }
}

export { ImportCategoryUseCase }
