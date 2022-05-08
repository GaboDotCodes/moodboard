const stateActions = (state, action, payload) => {
  switch (action) {
    case 'router.set':
      return { ...state, router: payload };
    case 'query.set':
      return { ...state, query: payload };
  }
}

export default stateActions;
