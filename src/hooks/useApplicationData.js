import { useState, useEffect } from 'react';
import axios from 'axios';

const useApplicationData = () => {
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('api/interviewers'),
    ]).then((res) => {
      setState((prev) => ({
        ...prev,
        days: res[0].data,
        appointments: res[1].data,
        interviewers: res[2].data,
      }));
    });
  }, []);

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    state.days.find((d) => d.name === state.day).spots--;

    setState({ ...state, appointments });
    return axios.put(`/api/appointments/${id}`, appointment);
  };

  const cancelInterview = (id) => {
    const deleteAppointment = {
      ...state.appointments[id],
      interview: null,
    };
    state.days.find((d) => d.name === state.day).spots++;

    setState({ ...state, deleteAppointment });
    return axios.delete(`/api/appointments/${id}`, deleteAppointment);
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export { useApplicationData };
