export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('linkefy.tk/state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('linkefy.tk/state', serializedState);
  } catch (err) {
    console.log(err);
  }
};
