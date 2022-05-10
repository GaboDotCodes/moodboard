const favoritesActions = (state, action, payload) => {
  switch (action) {
    case 'add':
      let exists = false;
      if (state) {
        exists = (state
          .filter(({id}) => id === payload.id)
          .length) >= 1;
        }
      return exists? state : [ ...(state?? []), payload ];
    case 'remove':
      const favorites = state.filter(favorite => JSON.stringify(payload) !== JSON.stringify(favorite))
      return favorites;
  }
}

export default favoritesActions;
