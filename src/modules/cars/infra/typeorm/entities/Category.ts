import { v4 as uuidv4 } from 'uuid'

// referênciando para a tabela
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('categories')
class Category {
  // Mapeando
  @PrimaryColumn()
  id?: string

  @Column()
  name: string

  @Column()
  description: string

  @CreateDateColumn()
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
