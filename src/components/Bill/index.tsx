import React, { memo, useCallback } from 'react';
import { MotionProps } from 'framer-motion';

import { RiHandCoinFill as PayIcon } from 'react-icons/ri';

import { formatDate } from '../../utils/date';
import { BillsProps } from '../../hooks/expense';

import { Container } from './styles';

interface BillProps extends BillsProps {
	removeBill(expenseIndex: number, billID: string): void;
	expenseIndex: number;
}

const Bill: React.FC<BillProps & MotionProps> = ({
	installment,
	value,
	reference,
	expire,
	id,
	removeBill,
	expenseIndex,
	...rest
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
		<Container {...rest}>
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
