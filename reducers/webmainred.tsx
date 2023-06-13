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
      default:
        return state;
    }
  };