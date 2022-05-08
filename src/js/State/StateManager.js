class StateManager {
  #state;
  #listener;
  #reducer;

  constructor(reducer, initialState) {
    this.#state = initialState;
    this.#listener = () => {};
    this.#reducer = reducer;
  }

  getState() {
    return this.#state;
  }

  dispatch(action, payload) {
    const oldState = this.#state;
    this.#state = this.#reducer(this.#state, action, payload);
    this.#listener(oldState, this.#state);
  }

  /**
   * Function that will be excute when state change
   * @callback listener
   * @param {Object} oldState 
   * @param {Object} newState
   */
  /**
   * Subscribe to state changes and execute a listener
   * @param {listener} listener - Function that will be excute when state change
   */
  subscribe(listener) {
    this.#listener = listener;
  }
}

export default StateManager;
