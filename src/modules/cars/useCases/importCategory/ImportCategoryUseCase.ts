import fs from 'node:fs'
import { parse } from 'csv-parse'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'
import { inject, injectable } from 'tsyringe'

interface IImportCategory {
  name: string
  description: string
}

@injectable()
class ImportCategoryUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) { }

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
          fs.promises.unlink(file.path) // removendo o arquivo após a sua leitura
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
    // console.log(categories)

    // Inserindo no db
    // Percorrendo item a item do array
    categories.map(async (category) => {
      const { name, description } = category

      // Verificando se já é uma categoria existente
      const isCategoryExists = this.categoriesRepository.findByName(name)
      if (!isCategoryExists) {
        this.categoriesRepository.create({
          name,
          description,
        })
      }
    })
  }
}

export { ImportCategoryUseCase }
