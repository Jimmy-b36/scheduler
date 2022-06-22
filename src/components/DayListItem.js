import React from 'react';
import classNames from 'classnames';
import '../styles/DayListItem.scss';

export default function DayListItem(props) {
  const formatSpots = (spots) => {
    if (spots === 0) {
      return 'no spots remaining';
    }
    return spots === 1 ? '1 spot remaining' : `${spots} spots remaining`;
  };
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0,
  });

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
