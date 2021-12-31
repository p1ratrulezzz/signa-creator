import React, { useState } from "react";
import SignaCreator from "../SignaCreator/SignaCreator";
import ElementToImg from "../ElementToImg/ElementToImg";
import { Layout } from "../Layout/Layout";
import { DEFAULT_TEXT } from "./constants";
import "./Signa.scss";

const defaultTextData = {
  name: DEFAULT_TEXT,
  pos: {
    x: 170,
    y: -140,
  },
  fontSize: 20,
  color: "#000000",
  strokeColor: "#ffffff",
  rotate: 0,
};

const Signa = () => {
  const [selectTextData, setSelectTextData] = useState({});
  const [selectKey, setSelectKey] = useState(0);
  const [textList, setTextList] = useState([{ ...defaultTextData }]);
  const [typeImage, setTypeImage] = useState("jpg");
  const [loadedImage, setLoadedImage] = useState(false);
  const [download, setDownload] = useState(false);

  const handleText = (e) => {
    const thisTextList = [...textList];
    thisTextList[selectKey].name = e.target.value;

    setTextList(thisTextList);
  };

  const selectFormat = (e) => {
    setTypeImage(e.target.value);
  };

  const handleDragStop = (e, pos, k) => {
    const x = pos.x;
    const y = pos.y;
    let thisTextList = [...textList];

    let prevPos = thisTextList[k].pos;
    prevPos = { ...prevPos };

    prevPos.x = x;
    prevPos.y = y;

    thisTextList[k].pos = prevPos;
    setTextList(thisTextList);
  };

  const handleFontSize = (e) => {
    const thisTextList = [...textList];
    thisTextList[selectKey].fontSize = e.target.value;
    setTextList(thisTextList);
  };

  const handleColor = (e) => {
    const thisTextList = [...textList];
    thisTextList[selectKey].color = e.target.value;
    setTextList(thisTextList);
  };

  const handleStrokeColor = (e) => {
    const thisTextList = [...textList];
    thisTextList[selectKey].strokeColor = e.target.value;
    setTextList(thisTextList);
  };

  const handleRotate = (e) => {
    const thisTextList = [...textList];
    thisTextList[selectKey].rotate = e.target.value;
    setTextList(thisTextList);
  };

  const handleGenerate = () => {
    const node = document.getElementById("content");
    setDownload(true);
    ElementToImg(node, typeImage);
    setTimeout(() => {
      setDownload(false);
    }, 1000);
  };

  const handleLoadImage = () => setLoadedImage(true);

  const handleAppendText = () => {
    let thisDefaultTextData = { ...defaultTextData };
    let thisTextList = [...textList];

    let len = thisTextList.length;
    thisDefaultTextData.name = DEFAULT_TEXT + (len + 1);

    // Новая позиция элемента
    thisTextList.push(thisDefaultTextData);
    setTextList(thisTextList);
  };

  const handleSelectText = (key) => setSelectKey(key);

  let { rotate, fontSize, name, color, strokeColor } = textList[selectKey];

  return (
    <Layout>
      <div
        className={
          "container signa " +
          (loadedImage ? "show" : "hidden") +
          (download ? " singa-download" : "")
        }
      >
        <div className="signa__content">
          <SignaCreator
            textList={textList}
            type={typeImage}
            selectKey={selectKey}
            selectTextData={selectTextData}
            handleText={handleText}
            handleSelectText={handleSelectText}
            handleLoadImage={handleLoadImage}
            handleDragStop={handleDragStop}
          />
        </div>
        <div className="signa__form">
          <p>Создайте свою картинку, скачайте и го работать!</p>
          <button className="btn btn-primary" onClick={handleAppendText}>
            Добавить строку
          </button>
          <hr />
          <div className="form-line form-line-between ">
            <label className="form-line form-line-full">
              <span>Tекст: </span>
              <textarea
                type="text"
                className="form-control signa__input"
                onChange={handleText}
                value={name}
              ></textarea>
            </label>
          </div>
          <hr />

          <div className="signa__picture-control">
            <div className="form-line form-line-between ">
              <label className="form-line">
                <span>Поворот текста: </span>
                <input
                  type="range"
                  className="form-control"
                  min="-180"
                  max="180"
                  onChange={handleRotate}
                  value={rotate}
                />
                <span>{rotate}</span>
              </label>
            </div>

            <hr />
            <div className="form-line form-line-between ">
              <label className="form-line">
                <span>Размер шрифта: </span>
                <input
                  type="range"
                  className="form-control"
                  min="10"
                  max="60"
                  onChange={handleFontSize}
                  value={fontSize}
                />
                <span>{fontSize}</span>
              </label>
            </div>
            <hr />

            <div className="form-line form-line-between">
              <label className="form-line">
                <span>Цвет текста: </span>
                <input type="color" onChange={handleColor} value={color} />
              </label>
            </div>

            <hr />

            <div className="form-line form-line-between">
              <label className="form-line">
                <span>Цвет обводки: </span>
                <input
                  type="color"
                  onChange={handleStrokeColor}
                  value={strokeColor}
                />
              </label>
            </div>

            <hr />
          </div>

          <div className="form-line form-line-between">
            <label className="form-line">
              <span>Тип файла: </span>
              <select
                value={typeImage}
                onChange={selectFormat}
                className="form-control"
              >
                <option value="jpg">jpg</option>
                <option value="png">png</option>
              </select>
            </label>
          </div>
          <hr />
          <div className="form-line  form-line-between">
            <span />
            <button className="btn btn-success" onClick={handleGenerate}>
              Скачать
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signa;
