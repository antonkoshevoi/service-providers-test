import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
      .createTable("inspectors", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.string("phone_number").notNullable();
        table.text("address").notNullable();
        table.timestamps(true, true);
      })
      .createTable("licenses", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.uuid("inspector_id").notNullable().references("id").inTable("inspectors").onDelete("CASCADE");
        table.string("license_type").notNullable();
        table.string("license_number").notNullable();
        table.date("expiration_date").notNullable();
        table.timestamps(true, true);
      });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
      .dropTableIfExists("licenses")
      .dropTableIfExists("inspectors");
}

