export const WebMainReducer = (state:any, action:any) => {
  switch (action.type) {
    case 'SET_WEB_READY':
      return {
        ...state,
        webReady: action.payload,
      };
      case 'SET_SCHEDULE_TOGGLE':
        return {
          ...state,
          viewSchedule: action.payload,
        };
        case 'SET_SUBJECT_VIEW_TYPE':
          return {
            ...state,
            subjectViewType: action.payload,
          };
          case 'SET_SWIPED_LOCATE':
            return {
              ...state,
              swipedLocated: action.payload,
            };
            case 'SET_SWIPED_BLOCKED':
              return {
                ...state,
                swipedBlocked: action.payload,
              };
              case 'ADD_SCROLL_ELEM':
                return {
                  ...state,
                  scrollableIndex: action.payload,
                };
                case 'SET_FILTER_POPUP':
                  return {
                    ...state,
                    filter: {...state, popupToggle: action.payload},
                  };
    default:
      return state;
  }
};

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