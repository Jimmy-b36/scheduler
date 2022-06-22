// retrieve the appointments for the given day
const getAppointmentsForDay = (state, day) => {
  const dayObj = state.days.find((d) => d.name === day);

  if (!dayObj) return [];

  return dayObj.appointments.map((id) => state.appointments[id]);
};

// retrieve the interview for the given appointment
const getInterview = (state, appointment) => {
  if (!appointment) return null;

  if (state.interviewers[appointment.interviewer]) {
    return {
      interviewer: { ...state.interviewers[appointment.interviewer] },
      student: appointment.student,
    };
  }
};

// retrieve the interviewers for the given day
const getInterviewersForDay = (state, day) => {
  const dayObj = state.days.find((d) => d.name === day);

  if (!dayObj) return [];

  return dayObj.interviewers.map((id) => state.interviewers[id]);
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
