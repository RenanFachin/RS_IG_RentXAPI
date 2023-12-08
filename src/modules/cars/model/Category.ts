import { v4 as uuidv4 } from 'uuid'

class Category {
  id?: string
  name: string
  description: string
  created_at: Date

  // Criando um construtor que vai ser chamado quando a classe for instânciada
  constructor() {
    // Se não tiver nenhum id, atribuir um id
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}

export { Category }
