import React from 'react';

const Button = props => {
  const { id, onClick, classes, children, disabled } = props;
  return (
    <button id={id} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
};

const DieButton = props => {
  const { onClick, children } = props;
  return (
    <Button id={`${children}Button`} onClick={() => onClick(children)}>
      {children}
    </Button>
  );
};

export { DieButton, Button };
