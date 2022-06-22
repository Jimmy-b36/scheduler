import { useReducer, useEffect } from 'react';
import axios from 'axios';

const useApplicationData = () => {
  const SET_DAY = 'SET_DAY';
  const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
  const SET_INTERVIEW = 'SET_INTERVIEW';

  const countSpots = (state, appointments) => {
    const daysObj = state.days.find((d) => d.name === state.day);

    let spots = 0;
    for (const id of daysObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }

    const newDay = { ...daysObj, spots };

    const days = state.days.map((d) => (d.name === state.day ? newDay : d));

    return days;
  };

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.value };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.value.days,
          appointments: action.value.appointments,
          interviewers: action.value.interviewers,
        };
      case SET_INTERVIEW: {
        const appointment = {
          ...state.appointments[action.id],
          interview: action.interview,
        };

        const appointments = {
          ...state.appointments,
          [action.id]: appointment,
        };

        const days = countSpots(state, appointments);

        return {
          ...state,
          appointments,
          days,
        };
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('api/interviewers'),
    ]).then((res) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        value: {
          days: res[0].data,
          appointments: res[1].data,
          interviewers: res[2].data,
        },
      });
    });
  }, []);

  const setDay = (day) => {
    dispatch({ type: SET_DAY, value: day });
  };

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview, countSpots });
    });
  };

  const cancelInterview = (id) => {
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() =>
        dispatch({ type: SET_INTERVIEW, id, interview: null, countSpots })
      );
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export { useApplicationData };
