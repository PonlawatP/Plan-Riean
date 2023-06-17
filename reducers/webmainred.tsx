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
                    filter: {...state.filter, popupToggle: action.payload},
                  };
                  case 'SET_FILTER_DELAY':
                    return {
                      ...state,
                      filter: {...state.filter, popupDelay: action.payload},
                    };
                    case 'SET_FILTER_NAME_POPUP':
                      return {
                        ...state,
                        filter: {...state.filter, popupNameToggle: action.payload},
                      };
                      case 'SET_FILTER_NAME_HEADER':
                        return {
                          ...state,
                          filter: {...state.filter, popupNameHeader: action.payload},
                        };
                        case 'SET_FILTER_NAME_DESC':
                          return {
                            ...state,
                            filter: {...state.filter, popupNameDesc: action.payload},
                          };
                      case 'SET_FILTER_TIME_POPUP':
                        return {
                          ...state,
                          filter: {...state.filter, popupTimeToggle: action.payload},
                        };
                    case 'ADD_FILTER_DELAY':
                      return {
                        ...state,
                        filter: {...state.filter, popupDelay: state.filter.popupDelay + action.payload},
                      };
                    case 'SET_DATA_LOADED':
                      return {
                        ...state,
                        dataLoaded: action.payload,
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