import React, { createContext, useCallback, useContext, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { v4 } from 'uuid';

import Popup from '../components/Popup/';

interface PopupContextProps {
  addPopup(title: string, body: string | number): void;
  removePopup(): void;
}

export interface PopupProps {
  title: string;
  body: string | number;
}

const PopupContext = createContext<PopupContextProps>({} as PopupContextProps);

const PopupProvider: React.FC = ({ children }) => {
  const [popup, setPopup] = useState<PopupProps[]>([]);

  const addPopup = useCallback((title, body) => {
    setPopup([{ title, body }]);
  }, []);

  const removePopup = useCallback(() => {
    setPopup([]);
  }, []);

  return (
    <PopupContext.Provider
      value={{
        addPopup,
        removePopup,
      }}
    >
      {children}

      <AnimatePresence>
        {popup.map(props => (
          <Popup key={v4()} {...props} />
        ))}
      </AnimatePresence>
    </PopupContext.Provider>
  );
};

function usePopup(): PopupContextProps {
  const context = useContext(PopupContext);

  if (!context) {
    throw new Error('usePopup must be within a PopupContext');
  }

  return context;
}

export { PopupProvider, usePopup };
