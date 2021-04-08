import React, { memo, useCallback } from 'react';

import { RiHandCoinFill as PayIcon } from 'react-icons/ri';

import { formatDate } from '../../../../utils/date';
import { BillsProps } from '../../../../hooks/expense';
import { bills as billsVariants } from '../../motion.variants';

import { Container } from './styles';

interface BillProps extends BillsProps {
	removeBill(expenseIndex: number, billID: string): void;
	expenseIndex: number;
}

const Bill: React.FC<BillProps> = ({
	installment,
	value,
	reference,
	expire,
	id,
	removeBill,
	expenseIndex,
}) => {
	const handleRemoveBill = useCallback(
		(expenseIndex: number, billID: string, value: number) => {
			removeBill(expenseIndex, id);
		},
		[removeBill, id],
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
			key={reference + value + expire}
		>
			<div>
				<span>
					{setDate(reference)}{' '}
					{installment.status && ' | Parcela ' + installment.reference}
				</span>
				<p>R${formatNumberToCurrency(value)}</p>
			</div>
			<button onClick={() => handleRemoveBill(expenseIndex, id, value)}>
				<PayIcon />
			</button>
		</Container>
	);
};

export default memo(Bill);
