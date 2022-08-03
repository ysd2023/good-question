// state
const initState = {
    tab: '', 
    tabIndex: 0,
    keyword: ''
}

// reducer
const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'change': {
      return { ...state, tab: action.data.tab, tabIndex: action.data.tabIndex }
    }
    case 'changeSearch': {
      return { ...state, keyword: action.data }
    }
    default:
      return state
  }
}

export default reducer