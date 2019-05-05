import React from 'react';

const Buttons = props => {
  const { buttonType, link } = props;
  const { shown, redirect, title, thumbnail, animation } = link;
  let thumbnailDiv = '';
  if (thumbnail !== '') {
    thumbnailDiv = (
      <div className="user-button-thumbnail">
        <img src={thumbnail} alt="thumbnail" />
      </div>
    );
  }
  if (!shown) return null;
  return (
    <a className={'user-button ' + buttonType + ' animated ' + animation} href={redirect}>
      {thumbnailDiv}
      <span className="user-button-text">{title}</span>
    </a>
  );
};

export default Buttons;
