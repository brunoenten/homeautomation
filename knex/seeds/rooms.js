/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('rooms').del()
  await knex('rooms').insert([
    { id: 1, name: 'Living Room' },
    { id: 2, name: 'Bedroom' },
    { id: 3, name: 'Corridor' },
    { id: 4, name: 'Kitchen' },
    { id: 5, name: 'Cellar' },
    { id: 6, name: 'Front Porch' }
  ]);
};
