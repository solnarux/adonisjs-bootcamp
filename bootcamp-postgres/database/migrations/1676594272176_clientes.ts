import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Clientes extends BaseSchema {
  protected tableName = 'clientes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('cedula').primary().unsigned()
      table.string('nombre', 100).notNullable()
      table.string('apellido', 100).notNullable()
      table.string('telefono', 15).notNullable()      
      table.string('correo', 100).notNullable()
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
