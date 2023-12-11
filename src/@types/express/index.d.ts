// adicionar nas tipagens já existentes o retorno necessário
declare namespace Express {
  export interface Request {
    user: {
      id: string
    }
  }
}
