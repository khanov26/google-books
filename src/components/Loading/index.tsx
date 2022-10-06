import React, { FC } from 'react';
import Image from '../../assets/icons/loading.gif';
import './styles.scss';

const Loading: FC = () => {
  return (
    <div className="loading">
      <img src={Image} alt="loading icon" />
    </div>
  );
};

export default Loading;
