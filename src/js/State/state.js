import stateActions from "./stateActions/stateActions";
import StateManager from "./StateManager";

const state = new StateManager(stateActions, {})

export default state;