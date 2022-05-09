class StateManager {
  #state;
  #listeners;
  #stateActions;

  constructor(stateActions, initialState) {
    this.#state = initialState;
    this.#listeners = [];
    this.#stateActions = stateActions;
  }

  getState() {
    return this.#state;
  }

  dispatch(action, payload) {
    const oldState = this.#state;
    this.#state = this.#stateActions(this.#state, action, payload);
    if (this.#listeners.length > 0) this.#listeners.forEach(listener => listener(oldState, this.#state));
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
    this.#listeners = [ ...this.#listeners, listener];
    return () => {
      this.#listeners = this.#listeners.filter((savedListener) => savedListener !== listener);
    }
  }

  unsubscribe(listener) {
    this.#listeners = this.#listeners.filter((savedListener) => savedListener !== listener);
  }
}

export default StateManager;
