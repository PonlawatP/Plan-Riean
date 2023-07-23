export const initWebReducerState = {
  webReady: false,
  viewSchedule: false,
  subjectViewType: "subject",
  swipedLocated: 0,
  scrollableIndex: 0,
  dataLoaded: false,
  filter: {
    popupToggle: false,
    popupNameToggle: false,
    popupTimeToggle: false,
    popupDelay: 0,
    popupNameHeader: "",
    popupNameDesc: "",
    data: {
      firstFilter: false,
      type: [],
      code: [],
      date: [],
      time: "total"
    }
  }
};

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
                        case 'SET_FILTERDATA_FIRST':
                          return {
                            ...state,
                            filter: {...state.filter, data: {...state.filter.data, firstFilter: action.payload}},
                          };
                          case 'SET_FILTERDATA_TYPE':
                            return {
                              ...state,
                              filter: {...state.filter, data: {...state.filter.data, type: action.payload}},
                            };
                            case 'SET_FILTERDATA_DODE':
                              return {
                                ...state,
                                filter: {...state.filter, data: {...state.filter.data, code: action.payload}},
                              };
                              case 'SET_FILTERDATA_DATE_TOGGLE':
                                let temp_date:Array<string> = state.filter.data.date;

                                if(action.payload.active){
                                  temp_date = temp_date.filter(idate => idate !== action.payload.date)
                                } else {
                                  temp_date.push(action.payload.date)
                                }

                                return {
                                  ...state,
                                  filter: {...state.filter, data: {...state.filter.data, date: temp_date}},
                                };
                                case 'SET_FILTERDATA_TIME':
                                  const r_time = action.payload.split(":").length > 1 ? action.payload.split(":")[0] : action.payload
                                  
                                  return {
                                    ...state,
                                    filter: {...state.filter, data: {...state.filter.data, time: r_time}},
                                  };
    default:
      return state;
  }
};

export const WebMainFunctions = (dispatch: (payload: any) => void) => {
  const setWebReady = (status:boolean) => {
    dispatch({
      type: 'SET_WEB_READY',
      payload: status,
    });
  };

  const toggleScheduleFilter = (status:boolean) => {
    dispatch({
      type: 'SET_FILTER_POPUP',
      payload: status,
    });
  };

  const toggleScheduleNameFilter = (status:boolean) => {
    dispatch({
      type: 'SET_FILTER_NAME_POPUP',
      payload: status,
    });
  };

  const toggleScheduleTimeFilter = (status:boolean) => {
    dispatch({
      type: 'SET_FILTER_TIME_POPUP',
      payload: status,
    });
  };

  const toggleScheduleSpectate = (status:boolean) => {
    if(!status){
      toggleScheduleFilter(false);
      toggleScheduleNameFilter(false)
      toggleScheduleTimeFilter(false)
    }
    dispatch({
      type: 'SET_SCHEDULE_TOGGLE',
      payload: status,
    });
  };

  const toggleDataLoaded = (status:boolean) => {
    dispatch({
      type: 'SET_DATA_LOADED',
      payload: status
    });
  };

  const setSwipeLocation = (locate:number) => {
    dispatch({
      type: 'SET_SWIPED_LOCATE',
      payload: locate*.08,
    });
  }
  
  //returns
  return {
    setWebReady,
    toggleScheduleFilter,
    toggleScheduleNameFilter,
    toggleScheduleTimeFilter,
    toggleScheduleSpectate,
    toggleDataLoaded,
    setSwipeLocation,
    ...WebFilterFunctions(dispatch)
  }
}

const WebFilterFunctions = (dispatch: (payload: any) => void) => {
  const filterChangeDate = (date: string, active = false) => {
    dispatch({
      type: 'SET_FILTERDATA_DATE_TOGGLE',
      payload: {
        active,
        date
      },
    });
  }

  const filterChangeTime = (time: string) => {
    dispatch({
      type: 'SET_FILTERDATA_TIME',
      payload: time,
    });
  }

  return {
    filterChangeDate,
    filterChangeTime
  }
}