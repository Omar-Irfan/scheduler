export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((dayInList) => dayInList.name === day);
  const filteredAppointments = [];
  if (filteredDays.length > 0) {
    for (let appointment of filteredDays[0].appointments) {
      filteredAppointments.push(state.appointments[appointment]);
    }
  }
  return filteredAppointments;
}

export function getInterview(state, interview) {
  return (
    interview && {
      ...interview,
      interviewer: state.interviewers[interview.interviewer],
    }
  );
}

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter((dayInList) => dayInList.name === day);
  const filteredInterviewers = [];
  if (filteredDays.length > 0) {
    for (let interviewer of filteredDays[0].interviewers) {
      filteredInterviewers.push(state.interviewers[interviewer]);
    }
  }
  return filteredInterviewers;
}
