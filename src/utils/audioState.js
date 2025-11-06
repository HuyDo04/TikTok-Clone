// This variable holds the global audio mute state.
// It is initialized to true (muted) when the application starts.
// It does NOT persist across page refreshes.
let globalAudioMutedState = true;

// Custom event name for notifying components about audio state changes.
const GLOBAL_AUDIO_MUTE_EVENT = 'global-audio-mute-change';

/**
 * Gets the current global audio mute state.
 * @returns {boolean} True if audio is globally muted, false otherwise.
 */
export const getGlobalAudioMuteState = () => globalAudioMutedState;

/**
 * Updates the global audio mute state and dispatches a custom event
 * to notify all listening components.
 * @param {boolean} newMutedState - The new global mute state.
 */
export const updateGlobalAudioMuteState = (newMutedState) => {
  globalAudioMutedState = newMutedState;
  const event = new CustomEvent(GLOBAL_AUDIO_MUTE_EVENT, { detail: newMutedState });
  window.dispatchEvent(event);
};

/**
 * Adds an event listener for global audio mute state changes.
 * @param {function(boolean): void} callback - The function to call when the state changes.
 *                                            It receives the new muted state as an argument.
 * @returns {function(): void} A cleanup function to remove the event listener.
 */
export const addGlobalAudioMuteListener = (callback) => {
  const handler = (event) => callback(event.detail);
  window.addEventListener(GLOBAL_AUDIO_MUTE_EVENT, handler);
  return () => window.removeEventListener(GLOBAL_AUDIO_MUTE_EVENT, handler);
};