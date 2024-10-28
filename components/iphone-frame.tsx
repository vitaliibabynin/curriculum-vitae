import React from 'react';

interface IPhoneFrameProps {
  children: React.ReactNode;
}

const IPhoneFrame: React.FC<IPhoneFrameProps> = ({ children }) => {
  return (
    <div className="relative mx-auto border-[10px] border-gray-800 dark:border-gray-900 rounded-[2rem] h-[450px] w-[225px] shadow-xl dark:ring-2 dark:ring-white/20">
      {/* iPhone Notch */}
      <div className="absolute top-0 inset-x-0">
        <div className="h-[18px] w-[111px] bg-gray-800 dark:bg-gray-900 mx-auto rounded-b-[0.75rem]" />
      </div>
      {/* Content */}
      <div className="w-full h-full rounded-[1.2rem] overflow-hidden bg-white">
        {children}
      </div>
    </div>
  );
};

export default IPhoneFrame;
