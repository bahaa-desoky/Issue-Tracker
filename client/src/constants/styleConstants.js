export const DRAWERWIDTH = 240;
export const COLORHASH = (str) => {
  // not really a hash, just summing ascii values of the user's id
  const hash = [...str]
    .map((ch) => {
      return ch.charCodeAt(0);
    })
    .reduce((sum, i) => sum + i);
  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = hash & 0x0000ff;
  return [r, g, b];
};
