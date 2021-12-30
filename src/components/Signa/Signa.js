import React, { Component } from "react";
import SignaCreator from "../SignaCreator/SignaCreator";
import ElementToImg from "../ElementToImg/ElementToImg";
import Layout from "../Layout/Layout";
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

class Signa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // ...getStorageState(this.props.name),
      defaultTextData: { ...defaultTextData },
      selectTextData: {
        // выбранный текст
      },
      selectKey: 0,
      textList: [{ ...defaultTextData }],
      typeImg: "jpg",
      loadedImage: false,
      download: false, // если нажали на скачать
    };
    // setStorage("test", { get: 1 });
  }

  handleText = (e) => {
    const textList = [...this.state.textList];
    textList[this.state.selectKey].name = e.target.value;

    this.setState({
      textList: textList,
    });
  };

  selectFormat = (e) => {
    this.setState({
      typeImg: e.target.value,
    });
  };

  handleDragStop = (e, pos, k) => {
    const { x, y } = pos;
    let textList = [...this.state.textList];
    let prevPos = textList[k].pos;
    prevPos = { ...prevPos };

    prevPos.x = x;
    prevPos.y = y;

    textList[k].pos = prevPos;

    this.setState({
      textList: textList,
    });
  };

  handleFontSize = (e) => {
    const textList = [...this.state.textList];
    textList[this.state.selectKey].fontSize = e.target.value;

    this.setState({
      textList: textList,
    });
  };

  handleColor = (e) => {
    const textList = [...this.state.textList];
    textList[this.state.selectKey].color = e.target.value;

    this.setState({
      textList: textList,
    });
  };

  handleStrokeColor = (e) => {
    const textList = [...this.state.textList];
    textList[this.state.selectKey].strokeColor = e.target.value;

    this.setState({
      textList: textList,
    });
  };

  handleRotate = (e) => {
    const textList = [...this.state.textList];
    textList[this.state.selectKey].rotate = e.target.value;

    this.setState({
      textList: textList,
    });
  };

  handleGenerate = () => {
    const node = document.getElementById("content");
    const typeImg = this.state.typeImg;
    this.setState(
      {
        download: true,
      },
      () => {
        ElementToImg(node, typeImg);
      }
    );
    setTimeout(() => {
      this.setState({
        download: false,
      });
    }, 1000);
  };

  handleLoadImage = () => {
    console.log("loaded");
    this.setState({
      loadedImage: true,
    });
  };

  handleAppendText = () => {
    let defaultTextData = { ...this.state.defaultTextData };
    let textList = [...this.state.textList];

    let len = textList.length;
    defaultTextData.name = DEFAULT_TEXT + (len + 1);

    // Новая позиция элемента
    textList.push(defaultTextData);
    this.setState({
      textList: textList,
    });
  };

  handleSelectText = (key) => {
    this.setState({
      selectKey: key,
    });
  };

  render() {
    const {
      textList,
      typeImg,
      selectKey,
      selectTextData,
      loadedImage,
      download,
    } = this.state;

    let { rotate, fontSize, name, color, strokeColor } =
      this.state.textList[selectKey];
    console.log("ok");

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
              type={typeImg}
              selectKey={selectKey}
              selectTextData={selectTextData}
              handleText={this.handleText}
              handleSelectText={this.handleSelectText}
              handleLoadImage={this.handleLoadImage}
              handleDragStop={this.handleDragStop}
            />
          </div>
          <div className="signa__form">
            <p>Создайте свою картинку, скачайте и го работать!</p>
            <button className="btn btn-primary" onClick={this.handleAppendText}>
              Добавить строку
            </button>
            <hr />
            <div className="form-line form-line-between ">
              <label className="form-line form-line-full">
                <span>Tекст: </span>
                <textarea
                  type="text"
                  className="form-control signa__input"
                  onChange={this.handleText}
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
                    onChange={this.handleRotate}
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
                    onChange={this.handleFontSize}
                    value={fontSize}
                  />
                  <span>{fontSize}</span>
                </label>
              </div>
              <hr />

              <div className="form-line form-line-between">
                <label className="form-line">
                  <span>Цвет текста: </span>
                  <input
                    type="color"
                    onChange={this.handleColor}
                    value={color}
                  />
                </label>
              </div>

              <hr />

              <div className="form-line form-line-between">
                <label className="form-line">
                  <span>Цвет обводки: </span>
                  <input
                    type="color"
                    onChange={this.handleStrokeColor}
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
                  value={typeImg}
                  onChange={this.selectFormat}
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
              <button className="btn btn-success" onClick={this.handleGenerate}>
                Скачать
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Signa;
