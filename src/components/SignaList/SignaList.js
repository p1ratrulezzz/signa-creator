import React from 'react';
import { Link } from 'react-router-dom';
import './SignaList.scss';

export const SignaList = () => {
  return (
    <div className="signaList">
      <h1>Select Signa Create</h1>
      <div className="signaList__list">
        <Link to="/ImageLoad" className="signaList__item">
          <img
            src="./images/add.svg"
            className="signaList__img"
            alt="Добавить новую"
          />
          <h2 className="signaList__text">Создать свою</h2>
        </Link>
        <Link to="/vika" className="signaList__item">
          <img src="./images/vika.png" className="signaList__img" alt="Вика" />
          <h2 className="signaList__text">Вика</h2>
        </Link>
        <Link to="/nasty" className="signaList__item">
          <img
            src="./images/nasty.png"
            className="signaList__img"
            alt="Настя"
          />
          <h2 className="signaList__text">Настя</h2>
        </Link>
      </div>
    </div>
  );
};
