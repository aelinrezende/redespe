import React, { memo, useCallback } from 'react';

import { RiHandCoinFill as PayIcon } from 'react-icons/ri';

import { formatDate } from '../../utils/date';
import { BillsProps } from '../../hooks/expense';

import { Container } from './styles';

interface BillProps extends BillsProps {
	expenseID: string;
	removeBill(): void;
}

const Bill: React.FC<BillProps> = ({
	expenseID,
	id: billID,
	expire,
	installment,
	reference,
	value,
	removeBill,
}) => {
	const handleRemoveBill = useCallback(() => {
		removeBill();
	}, [removeBill]);

	const formatNumberToCurrency = useCallback(number => {
		return number.toLocaleString(undefined, { minimumFractionDigits: 2 });
	}, []);

	const setDate = useCallback((date: string): string => formatDate(date), []);

	return (
		<Container>
			<div>
				<span>
					{setDate(reference)}{' '}
					{installment.status && ' | Parcela ' + installment.reference}
				</span>
				<p>R${formatNumberToCurrency(value)}</p>
			</div>
			<button onClick={() => handleRemoveBill()}>
				<PayIcon />
			</button>
		</Container>
	);
};

export default memo(Bill);
