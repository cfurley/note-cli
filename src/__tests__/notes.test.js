/**
 * @title notes.test.js
 * @description Testing for the notes.js handlers.
 */

import { beforeEach, jest } from "@jest/globals";

jest.unstable_mockModule("../../data/db.json", () => ({
  insertDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { insertDB, getDB, saveDB } = await import("../../data/db.js");
const { newNote, getAllNotes, removeNote } = await import("../../data/db.json");

beforeEach(() => {
  insertDB.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
});

test("newNote inserts data and return it", async () => {
  const newNote = {
    content: "this is the new note",
    id: 1,
    tags: ["test"],
  };
  insertDB.mockResolvedValue(newNote);
  const result = await newNote(newNote.content, newNote.tags);
  expect(result).toEqual(newNote);
});
