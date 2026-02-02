/**
 * @title db.js
 * @description The API which interacts with the application's file based database.
 */

import fs from "fs/promises";
const DB_PATH = new URL("../data/db.json", import.meta.url).pathname;

/**
 * Gets the existing database.
 * @returns a database
 */
export const getDB = async () => {
  const db = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(db);
};

/**
 * Saves a new database.
 * @param {*} db the database
 */
export const saveDB = async (db) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
};

/**
 * Inserts a new note into the existing database.
 * @param {*} note note object to insert.
 */
export const insertDB = async (note) => {
  const db = await getDB();
  db.notes.push(note);
  await saveDB(db);
  return note;
};

/**
 * Gets all notes from the existing database.
 * @returns array of notes.
 */
export const getAllNotes = async () => {
  const db = await getDB();
  return db.notes;
};

/**
 * Finds notes which include a specific word within its content.
 * @param {string} filter word in the content.
 * @returns array of notes.
 */
export const findNotes = async (filter) => {
  const notes = getAllNotes();
  return notes.filter((note) =>
    notes.content.toLowerCase().includes(filter.toLowerCase()),
  );
};

/**
 * Remove a specifc note from the database.
 * @param {*} id the identifier of the specific note.
 * @returns the id of the note which was removed.
 */
export const removeNote = async (id) => {
  const notes = await getAllNotes();
  const match = notes.find((note) => note.id === id);

  if (match) {
    const newNotes = notes.filter((note) => note.id !== id);
    await saveDB({ notes: newNotes });
    return id;
  }
};

/**
 * Removes all notes from the database.
 */
export const removeAllNotes = async () => {
  await saveDB({ notes: [] });
};
