import fs from 'node:fs'
import { parse } from 'csv-parse'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IImportCategory {
  name: string
  description: string
}
class ImportCategoryUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      // Fazendo a leitura do arquivo "por partes"
      const stream = fs.createReadStream(file.path)

      // array para armazenar as categorias
      const categories: IImportCategory[] = []

      // Definindo o "delimitador" de leitura do arquivo
      const parseFile = parse({
        delimiter: ',',
      })

      // pipe faz com que cada chunk lido, seja enviado para outro local
      stream.pipe(parseFile)

      // lendo linha a linha (assíncrono, promise)
      parseFile
        .on('data', async (line) => {
          // console.log(line)
          // retorno de cada line: ["name", "description"]
          const [name, description] = line // desestruturando

          categories.push({
            name,
            description,
          })
        })
        .on('end', () => {
          resolve(categories)
        })
        .on('error', (e) => {
          reject(e)
        })
    })
  }

  // Como o retorno do loadCategories é uma promise, precisamos definicar o método execute como async
  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)
    console.log(categories)
  }
}

export { ImportCategoryUseCase }
