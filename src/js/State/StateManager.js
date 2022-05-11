class StateManager {
  #appId;
  #state;
  #listeners;
  #stateActions;

  constructor(appId, stateActions, initialState) {
    this.#appId = appId;
    const savedState = JSON.parse(window.localStorage.getItem(`state-${this.#appId}`));
    this.#state = { ...savedState, ...initialState };
    this.#listeners = [];
    this.#stateActions = stateActions;
  }

  getState(field) {
    if (field) return this.#state[field];
    return this.#state;
  }

  dispatch(field, action, payload, save = false) {
    const oldState = this.#state[field];
    this.#state[field] = this.#stateActions[field](this.#state[field], action, payload);
    if (save) {
      const savedState = JSON.parse(window.localStorage.getItem(`state-${this.#appId}`));
      console.log(savedState);
      if (savedState) {
        savedState[field] = this.#state[field];
        window.localStorage.setItem(`state-${this.#appId}`, JSON.stringify(savedState));
      } else {
        const firstSave = {}
        Object.defineProperty(firstSave, field, { value: this.#state[field], enumerable: true });
        window.localStorage.setItem(`state-${this.#appId}`, JSON.stringify(firstSave));
      }
    }
    const updated = JSON.stringify(oldState) !== JSON.stringify(this.#state[field]);
    if (this.#listeners.length > 0 && updated) {
      this.#listeners.forEach(({field: listenField, listener}) => {
        if (listenField === field ) listener(oldState, this.#state[field])
      });
    }
  }

  /**
   * Function that will be excute when state change
   * @callback listener
   * @param {Object} oldState 
   * @param {Object} newState
   */
  /**
   * Subscribe to state changes and execute a listener
   * @param {string} field - The state's key that want listen 
   * @param {listener} listener - Function that will be excute when state change
   */
  subscribe(field, listener) {
    this.#listeners = [ ...this.#listeners, { field, listener }];
    return () => {
      this.#listeners = this.#listeners.filter((saved) => saved.field !== field && saved.listener !== listener);
    }
  }

  unsubscribe(field, listener) {
    this.#listeners = this.#listeners.filter((saved) => saved.field !== field && saved.listener !== listener);
  }
}

export default StateManager;
