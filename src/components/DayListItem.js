import React from 'react';
import classNames from 'classnames';
import './DayListItem.scss';

export default function DayListItem(prop) {
  const formatSpots = (spots) => {
    if (spots === 0) {
      return 'no spots remaining';
    }
    return spots === 1 ? '1 spot remaining' : `${spots} spots remaining`;
  };
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': prop.selected,
    'day-list__item--full': prop.spots === 0,
  });
  return (
    <li onClick={() => prop.setDay(prop.name)} className={dayClass}>
      <h2 className="text--regular">{prop.name}</h2>
      <h3 className="text--light">{formatSpots(prop.spots)}</h3>
    </li>
  );
}
