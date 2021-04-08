import React, { memo, useCallback } from 'react';

import { RiHandCoinFill as PayIcon } from 'react-icons/ri';

import { formatDate, sortArrayOfObjByDate } from '../../../../utils/date';
import { useExpense, BillsProps } from '../../../../hooks/expense';
import { bills as billsVariants } from '../../motion.variants';

import { Container } from './styles';

interface BillProps extends BillsProps {
	expenseIndex: number;
	removeBill(expenseIndex: number, billID: string): void;
}

const Bill: React.FC<BillProps> = ({
	installment,
	value,
	reference,
	expire,
	id,
	expenseIndex,
	removeBill,
}) => {
	const { account, removeExpense } = useExpense();

	const handleRemoveBill = useCallback(
		(expenseIndex: number, billID: string) => {
			removeBill(expenseIndex, billID);
		},
		[removeBill],
	);

	const formatNumberToCurrency = useCallback(number => {
		return number.toLocaleString(undefined, { minimumFractionDigits: 2 });
	}, []);

	const setDate = useCallback((date: string): string => formatDate(date), []);

	return (
		<Container
			variants={billsVariants.child}
			transition={{ duration: 0.3 }}
			whileHover={billsVariants.child.hover}
			exit={billsVariants.child.exit}
			key={reference + value + expire}
		>
			<div>
				<span>
					{setDate(reference)}{' '}
					{installment.status && ' | Parcela ' + installment.reference}
				</span>
				<p>R${formatNumberToCurrency(value)}</p>
			</div>
			<button onClick={() => handleRemoveBill(expenseIndex, id)}>
				<PayIcon />
			</button>
		</Container>
	);
};

export default memo(Bill);
