const STORAGE_KEY = 'gps-store-key';

/* Use an IIFE to export the persisted state in a variable */
export const persistedState = (() => {
  try {
    const rawState = sessionStorage.getItem(STORAGE_KEY);
    if (rawState === null) return undefined;
    const state = JSON.parse(rawState);
    return state;
  } catch (err) {
    return undefined;
  }
})();

/* Export a method to save state on each store update */
export const saveState = (state) => {
  try {
    const stateFilter = JSON.parse(JSON.stringify(state)); // deep clone
    const rawState = JSON.stringify(stateFilter);
    sessionStorage.setItem(STORAGE_KEY, rawState);
  } catch (err) {
    // Ignore write errors.
  }
};
