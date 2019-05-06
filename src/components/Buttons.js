import React from 'react';

const Buttons = props => {
  const { buttonType, link } = props;
  const { shown, redirect, title, thumbnail, animation } = link;
  if (!shown) return null;
  return (
    <a className={'user-button ' + buttonType + ' animated ' + animation} href={redirect}>
      {thumbnail !== '' ? <img src={thumbnail} alt="thumbnail" /> : null}
      <span className="user-button-text">{title}</span>
    </a>
  );
};

export default Buttons;
