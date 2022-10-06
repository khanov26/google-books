import React, { FC } from 'react';
import './styles.scss';

interface Props {
  onClick: () => void;
  disabled: boolean;
}

const LoadButton: FC<Props> = ({disabled, onClick}) => {
  return (
    <div className="loadMore">
      <button
        className="loadMore__button"
        disabled={disabled}
        onClick={onClick}
      >
        Load more
      </button>
    </div>
  );
};

export default LoadButton;
