// state
const initState = {
    tab: '', 
    keyword: ''
}

// reducer
const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'change': {
      return { ...state, tab: action.data }
    }
    case 'changeSearch': {
      return { ...state, keyword: action.data }
    }
    default:
      return state
  }
}

export default reducer