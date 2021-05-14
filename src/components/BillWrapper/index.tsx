import React, { useCallback, memo } from 'react';

import Bill from '../Bill/';

import { BillsProps } from '../../hooks/expense';

interface BillProps extends BillsProps {
  expenseID: string;
  removeBill(expenseID: string, billID: string): void;
}

const BillWrapper: React.FC<BillProps> = ({
  expenseID,
  id: billID,
  expire,
  installment,
  reference,
  value,
  removeBill,
}) => {
  const handleRemoveBill = useCallback(() => {
    removeBill(expenseID, billID);
  }, [expenseID, billID, removeBill]);

  return (
    <Bill
      id={billID}
      expire={expire}
      installment={installment}
      reference={reference}
      value={value}
      expenseID={expenseID}
      removeBill={handleRemoveBill}
    />
  );
};

export default memo(BillWrapper);
