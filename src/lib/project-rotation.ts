export function shouldRotateProject(state: {
  playing: boolean; hovered: boolean; focused: boolean;
  inView: boolean; pageVisible: boolean; reducedMotion: boolean | null;
}) {
  return state.playing && !state.hovered && !state.focused && state.inView && state.pageVisible && state.reducedMotion === false;
}
