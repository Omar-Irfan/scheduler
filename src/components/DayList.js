//Side bar that displays days

import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const { days } = props;

  const parsedDays = days.map((day) => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
    />
  ));

  return <ul>{parsedDays}</ul>;
}
