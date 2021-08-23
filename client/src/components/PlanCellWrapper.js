import React from 'react';

export function PlanCellWrapper(props) {
  const { 
    classNames=[], hovered, selected, children, ...attr 
  } = props;
  return (
    <div className={`col 
        ${hovered ? 'hovered' : ''} 
        ${selected ? 'selected' : ''} 
        ${classNames.join(' ')}
      `}
      {...attr}
    >{children}</div>
  );
}