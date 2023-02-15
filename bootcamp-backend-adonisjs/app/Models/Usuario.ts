import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne, hasMany, HasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Perfil from './Perfil'
import Publicaciones from './Publicacione'
import Grupo from './Grupo'


export default class Usuario extends BaseModel {
  @column({ isPrimary: true }) public codigo_usuario: number
  @column() public nombre_usuario: string
  @column() public contrasena: string
  @column() public email: string
  @column() public telefono: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Perfil, {
    localKey: 'codigo_usuario',
    foreignKey: 'codigo_usuario',
  })
  public perfil: HasOne<typeof Perfil>

  @hasMany(() => Publicaciones, {
    localKey: 'codigo_usuario',
    foreignKey: 'codigo_usuario',
  })
  public publicaciones: HasMany<typeof Publicaciones>

  @manyToMany(() => Grupo, {
    localKey: 'codigo_usuario',
    pivotForeignKey: 'codigo_usuario',
    relatedKey: 'codigo_grupo',
    pivotRelatedForeignKey: 'codigo_grupo',
    pivotTable: 'usuario_grupos',
  })
  public usuario_grupos: ManyToMany<typeof Grupo>
}
