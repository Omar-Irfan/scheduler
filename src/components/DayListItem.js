import React from "react";
import "components/DayListItem.scss"
import classnames from 'classnames/bind';

export default function DayListItem(props) {
  const formatSpots = function (spots) {
    if (props.spots === 0) {
      return 'no spots remaining'
    }
    else if (props.spots === 1) {
      return '1 spot remaining'
    }
    else {
      return `${props.spots} spots remaining`
    }
  }


  const DayListItemClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });


  return (
    <li className = {DayListItemClass} onClick={() => props.setDay(props.name)}>
    <h2 className="text--regular">{props.name}</h2>
    <h3 className="text--light">{formatSpots(props.spots)}</h3>
  </li>
  );
}