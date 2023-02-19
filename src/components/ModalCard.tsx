import React from 'react';

type ModalCardProps = {
  children?: JSX.Element;
};
const ModalCard = (props: ModalCardProps) => {
  return (
    <div className="fixed top-0 left-0 flex h-full w-screen items-center justify-around">
      <div className="fixed top-0 left-0 h-full w-screen bg-[#000] opacity-70"></div>
      <div className="relative w-[24rem] rounded-xl bg-white p-4 opacity-100 md:w-[32rem]">
        {props.children}
      </div>
    </div>
  );
};

export default ModalCard;
