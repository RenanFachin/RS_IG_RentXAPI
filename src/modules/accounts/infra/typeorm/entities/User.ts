import { v4 as uuidv4 } from 'uuid'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('users')
class User {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  driver_license: string

  @Column()
  isAdmin: boolean

  @Column()
  avatar: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    // Caso o id não esteja preenchido, ou seja, seja um novo usuário
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}

export { User }
