import stateActions from "./stateActions";
import StateManager from "./StateManager";

const initialState = {
  valor: 0
};

const state = new StateManager(stateActions, initialState)

export default state;