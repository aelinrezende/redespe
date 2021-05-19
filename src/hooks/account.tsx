import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  SetStateAction,
  useEffect,
} from 'react';

import staticData from '../data.json';

import { ExpensesProps } from './expense';

interface IAccount {
  account: AccountsProps;
  toggleAccount(): void;
  setAccount(value: SetStateAction<AccountsProps>): void;
}

export interface AccountsProps {
  id: string;
  label: string;
  data: Array<ExpensesProps>;
}

const AccountContext = createContext<IAccount>({} as IAccount);

const AccountProvider: React.FC = ({ children }) => {
  const accounts: AccountsProps[] = staticData;
  const [account, setAccount] = useState<AccountsProps>(accounts[0]);

  const toggleAccount = useCallback(() => {
    setAccount([...accounts].reverse()[0]);
  }, [accounts]);

  useEffect(() => {
    console.log('MUDOU');
  }, [account]);

  return (
    <AccountContext.Provider
      value={{
        toggleAccount,
        account,
        setAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

function useAccount(): IAccount {
  const context = useContext(AccountContext);

  if (!context) {
    throw new Error('useAccount must be within a AccountContext');
  }

  return context;
}

export { AccountProvider, useAccount };
