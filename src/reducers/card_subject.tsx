export const CardReducer = (state:any, action:any) => {
  switch (action.type) {
    case 'SET_SLIDE_INDEX':
      return {
        ...state,
        index: action.payload,
      };
      case 'SET_SLIDE_SMOOTH':
        return {
          ...state,
          smooth: action.payload,
        };
        case 'SET_SLIDE_STATUS':
            return {
              ...state,
              status: action.payload,
            };
    default:
      return state;
  }
};