import React, { useEffect, useState } from "react";
import axios from "axios"

import "components/Application.scss";

import DayList from 'components/DayList'

import 'components/Appointment'
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
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

  const appointments = getAppointmentsForDay(state, state.day);
  
  const setDay = day => setState(prev => ( { ...prev, day }));

  
  
  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });

   return axios.put(`/api/appointments/${id}`, {interview})
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id], interview: null
    };
    const appointments = {
      ...state.appointments, [id]:appointment
    };
    setState({
      ...state, appointments
    });
    return axios.delete(`/api/appointments/${id}`)
  }
  
  const schedule = appointments.map((appointment) => {
    const interviewers = getInterviewersForDay(state, state.day)
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  })
  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>

<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  days={state.days}
  day={state.day}
  setDay={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
    

  );
}

