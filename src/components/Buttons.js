import React from 'react';

const Buttons = props => {
  const { buttonType, shown, redirect, title, thumbnail, animation } = props.link;
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
    <a
      className={
        'user-button ' + buttonType + (animation !== 'none' ? 'animated ' + animation : null)
      }
      href={redirect}
    >
      {thumbnailDiv}
      <span className="user-button-text">{title}</span>
    </a>
  );
};

export default Buttons;
