const getAppointmentsForDay = (state, day) => {

const dayObj = state.days.find(d => d.name === day)

if(!dayObj) return []

return dayObj.appointments.map(id => state.appointments[id])

};

export { getAppointmentsForDay };
