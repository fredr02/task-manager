import React from 'react';

type ModalCardProps = {
  children?: JSX.Element;
};
const ModalCard = (props: ModalCardProps) => {
  return (
    <div className="tex-white absolute top-0 left-0 flex h-full w-full items-center justify-around">
      <div className="relative rounded-xl bg-white p-4">{props.children}</div>
    </div>
  );
};

export default ModalCard;
