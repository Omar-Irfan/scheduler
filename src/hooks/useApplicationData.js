import { useEffect, useState } from 'react'
import axios from "axios"

export default function useApplicationData() {

const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {}
});

useEffect(()=>{
  Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers') 
  ]).then((all) => {
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
  })
},[])

const setDay = day => setState(prev => ({ ...prev, day }));

function getNbSpots() {
  const dayFound = state.days.find(eachDay => eachDay.name === state.day);

  let nbSpots = 5

  nbSpots = dayFound.appointments.filter(appointmentId => state.appointments[appointmentId].interview === null).length

  return nbSpots

}

function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  const remainingSpots = getNbSpots() - 1

  let days = state.days.map((eachDay) => {
    return eachDay.appointments.includes(id) ? { ...eachDay, spots: remainingSpots } : eachDay;
});

  return axios.put(`/api/appointments/${id}`, { interview })
  .then(()=>   setState({
    ...state,
    appointments, days
  }))
}

function cancelInterview(id) {
  const appointment = {
    ...state.appointments[id], interview: null
  };
  const appointments = {
    ...state.appointments, [id]: appointment
  };

  const remainingSpots = getNbSpots() + 1

  let days = state.days.map((eachDay) => {
    return eachDay.appointments.includes(id) ? { ...eachDay, spots: remainingSpots } : eachDay;
});

  return axios.delete(`/api/appointments/${id}`).then(() => setState({
    ...state, appointments, days
  }))
}

return { state, setDay, bookInterview, cancelInterview}
}