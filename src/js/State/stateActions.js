const stateActions = (state, action, payload) => {
  const { router } = state;
  switch (action) {
    case 'router.set':
      return { ...state, router: payload };
  }
}

export default stateActions;
