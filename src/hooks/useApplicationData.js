import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  const updateSpots = (state) => {
    const days = state.days.map((day) => {
      const spots = day.appointments.filter(
        (apptId) => state.appointments[apptId].interview === null
      ).length;
      return { ...day, spots };
    });

    return { ...state, days };
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState((state) => {
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };

        return { ...state, appointments };
      });
      setState(updateSpots);
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState((state) => {
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };

        return { ...state, appointments };
      });
      setState(updateSpots);
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
