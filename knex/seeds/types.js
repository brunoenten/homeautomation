/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('types').del()
  await knex('types').insert([
    { id: 1, name: 'Switch', settings: JSON.stringify([
      { type: 'toggle', name: 'auto-off', label: 'Auto off'},
      { type: 'text',   name: 'auto-off-delay', label: 'Auto off delay in seconds', help: "Please enter a value in seconds"},
    ]) },
    { id: 2, name: 'Cover', settings: JSON.stringify([
      { type: 'toggle', name: 'close-at-sunset', label: 'Auto close at sunset'},
      { type: 'toggle', name: 'open-at-sunrise', label: 'Auto open at sunrise'},
      { type: 'text',   name: 'speed', label: 'Motor speed in %', help: "Please enter a value in %"},
    ]) },
    { id: 3, name: 'Thermostat', settings: JSON.stringify([
      { type: 'toggle', name: 'use-outdoor-temp', label: 'Change target temp according to outdoor temp'},
      { type: 'text',   name: 'hysterisis', label: 'Hysterisis for temp control curve', help: "Please enter a value in %"},
    ]) },
    { id: 4, name: 'Sensor', settings: JSON.stringify([
      { type: 'toggle', name: 'enabled', label: 'Enable sensor'},
      { type: 'text',   name: 'unit', label: 'Unit of value returned by sensor', help: "Please enter a text value"},
    ]) },
    { id: 5, name: 'Multimedia', settings: JSON.stringify([
      { type: 'toggle', name: 'auto-off', label: 'Auto power off when no signal'},
      { type: 'text',   name: 'auto-off-delay', label: 'Auto off delay in seconds', help: "Please enter a value in seconds"},
      { type: 'text',   name: 'max-volume', label: 'Enforce maximum volume level in %', help: "Please enter a value in %"},
    ]) },
    { id: 6, name: 'Lock', settings: JSON.stringify([
      { type: 'toggle', name: 'auto-close', label: 'Auto close lock if left open'},
      { type: 'text',   name: 'auto-close-delay', label: 'Auto close delay in seconds', help: "Please enter a value in seconds"},
    ]) }
  ]);
};
