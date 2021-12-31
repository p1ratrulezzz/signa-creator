import React from 'react';
import { ImageLoad } from '../ImageLoad/ImageLoad';
import { TextInDom } from './components';
import './SignaCreator.scss';

export const SignaCreator = ({
  textList,
  selectKey,
  handleDragStop,
  handleSelectText,
  handleLoadImage,
}) => {
  return (
    <div className={'SignaCreator SignaCreator--ogo'}>
      <div className="SignaCreator__content" id="content">
        <ImageLoad {...{ handleLoadImage }} />
        {textList.map((settings, key) => {
          return (
            <TextInDom
              {...{
                key,
                settings,
                index: key,
                handleDragStop,
                handleSelectText,
                selectKey,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
