/**
 * @title notes.js
 * @description Handlers for the notes command line interface
 * which utilizes the db.js API to interact with the database.
 */

import { insertDB, saveDB, getDB } from "./db.js";

/**
 * Creates a new note and inserts it into the database.
 * @param {string} note the content of the note.
 * @param {string[]} tags tags for the note.
 * @returns the note added to the database, else null.
 */
export const newNote = async (note, tags) => {
  const newNote = {
    tags,
    id: Date.now(),
    content: note,
  };

  await insertDB(newNote);
  return newNote;
};

/**
 * Gets all the notes currentlty within the database.
 * @returns an array of the notes in the database.
 */
export const getAllNotes = async () => {
  const { notes } = await getDB();
  return notes;
};

/**
 * Gets all the notes which include a specific string filter.
 * @param {string} filter a word to search for.
 * @returns an array of notes which contain the filter.
 */
export const findNotes = async (filter) => {
  const { notes } = await getDB();
  return notes.filter((note) =>
    note.content.toLowerCase().includes(filter.toLowerCase()),
  );
};

export const removeNote = async (id) => {
  const { notes } = await getDB();
  const match = notes.find((note) => note.id === id);

  if (match) {
    const newNotes = notes.filter((note) => note.id !== id);
    await saveDB({ notes: newNotes });
    return id;
  }
};

/**
 * Removes all notes within the database.
 */
export const removeAllNotes = async () => {
  await saveDB({ notes: [] });
};
