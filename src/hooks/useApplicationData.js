import { useReducer, useEffect } from 'react';
import axios from 'axios';

const useApplicationData = () => {
  const SET_DAY = 'SET_DAY';
  const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
  const SET_INTERVIEW = 'SET_INTERVIEW';

  //function to count spots
  const countSpots = (state, appointments) => {
    //find the relevent day object
    const daysObj = state.days.find((d) => d.name === state.day);

    //set spot counter to 0
    let spots = 0;
    //loop through the day objects appointments and check to see if the inteview is null
    for (const id of daysObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }

    //assign a new day object and give it the new spots variable
    const newDay = { ...daysObj, spots };

    //map the new state to days variable
    const days = state.days.map((d) => (d.name === state.day ? newDay : d));

    return days;
  };

  //use reducer as it is a complex state
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

  //get requests
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

  //set the day state
  const setDay = (day) => {
    dispatch({ type: SET_DAY, value: day });
  };

  //set the interview state and call function to count spots
  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview, countSpots });
    });
  };

  //set the interview state when cancelling an interview
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
