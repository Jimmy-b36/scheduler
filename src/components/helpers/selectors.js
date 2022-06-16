const getAppointmentsForDay = (state, day) => {
  const dayObj = state.days.find((d) => d.name === day);

  if (!dayObj) return [];

  return dayObj.appointments.map((id) => state.appointments[id]);
};

const getInterview = (state, appointment) => {
  if (!appointment) return null;

  if (appointment.interviewer in state.interviewers) {
    return {
      interviewer: { ...state.interviewers[appointment.interviewer] },
      student: appointment.student,
    };
  }
};

export { getAppointmentsForDay, getInterview };
