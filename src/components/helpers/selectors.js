const getAppointmentsForDay = (state, day) => {
  const dayObj = state.days.find((d) => d.name === day);

  if (!dayObj) return [];

  return dayObj.appointments.map((id) => state.appointments[id]);
};

const getInterview = (state, appointment) => {
  if (!appointment) return null;

  if (state.interviewers[appointment.interviewer]) {
    return {
      interviewer: { ...state.interviewers[appointment.interviewer] },
      student: appointment.student,
    };
  }
};

const getInterviewersForDay = (state, day) => {
  const dayObj = state.days.find((d) => d.name === day);

  if (!dayObj) return [];

  return dayObj.interviewers.map((id) => state.interviewers[id]);
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
