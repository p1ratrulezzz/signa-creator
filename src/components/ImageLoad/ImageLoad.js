import React, { useState } from 'react';
import './ImageLoad.scss';

export const ImageLoad = ({ handleLoadImage }) => {
  const [file, setFile] = useState('');

  const loadFile = (file) => {
    console.log('f', file);
    if (
      file &&
      file.type !== 'image/png' &&
      file.type !== 'image/jpeg' &&
      file.type !== 'image/svg+xml'
    ) {
      alert('Не верный формат файла!');
      return;
    }
    // получение ссылки на файл
    let reader = new FileReader();
    reader.onload = (e) => {
      setFile(e.target.result);
      handleLoadImage();
    };
    reader.readAsDataURL(file);
  };

  const handleFileLoad = (e) => {
    const file = e.target.files[0];
    if (file !== undefined) return loadFile(file);
    console.log('Не удалось загрузить файл!');
  };

  const handleDelete = () => {
    setFile('');
  };

  return (
    <form className={`imageLoad ${file === '' ? 'noload' : 'load'}`}>
      <div className="imageLoad__content">
        <div className="imageLoad__image">
          <span>Загрузить изображение</span>
          <img src={file} />
        </div>
        <div className="imageLoad__inputGroup">
          <div className="imageLoad__label">
            <label htmlFor="file" className="imageLoad__add">
              +
            </label>
            <input type="file" id="file" onChange={handleFileLoad} />
          </div>
          <button onClick={handleDelete} className="imageLoad__delete"></button>
        </div>
      </div>
    </form>
  );
};
