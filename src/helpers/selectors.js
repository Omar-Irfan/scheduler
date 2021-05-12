export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(dayInList=> dayInList.name === day);
  const filteredAppointments = []
  if(filteredDays.length > 0) {
  for (let appointment of filteredDays[0].appointments) { 
    filteredAppointments.push(state.appointments[appointment]) 
    
  }}
  return filteredAppointments;
}
// function selectUserByName(state, name) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }