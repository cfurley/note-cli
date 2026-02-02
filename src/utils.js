/**
 * @title utils.js
 * @description Utility functions for various modules.
 */

export const listNotes = (notes) => {
  notes.forEach(({ id, content, tags }) => {
    console.log("id: ", id);
    console.log("tags: ", tags);
    console.log("content: ", content);
    console.log("\n");
  });
};
