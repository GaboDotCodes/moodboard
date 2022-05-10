import stateActions from "./stateActions/stateActions";
import StateManager from "./StateManager";

const state = new StateManager('moodboard', stateActions, {})

export default state;