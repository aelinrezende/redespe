import React, { useState, useCallback, useEffect, memo } from 'react';

import { useExpense } from '../../hooks/expense';
import { usePopup } from '../../hooks/popup';

import { nav } from './motion.variants';

import {
	NavContainer,
	Nav,
	NavAnchor,
	NavButton,
	OptionsContainer,
	Option,
	OptionsIcon,
} from './styles';

const Navbar: React.FC = () => {
	const { getMonthlyValue } = useExpense();
	const { addPopup } = usePopup();

	const [optionsVisible, setOptionsVisible] = useState(false);
	const [monthlyValue, setMonthlyValue] = useState(0);

	useEffect(() => {
		setMonthlyValue(getMonthlyValue());
	}, [setMonthlyValue, getMonthlyValue]);

	const toggleOptionsVisibility = useCallback(() => {
		setOptionsVisible(!optionsVisible);
	}, [optionsVisible]);

	const addMonthlyValuePopup = useCallback(() => {
		addPopup('Valor Mensal', 'R$' + monthlyValue.toFixed(2));
	}, [addPopup, monthlyValue]);

	return (
		<NavContainer>
			<Nav>
				<NavAnchor to="#" />
				<NavButton onClick={() => toggleOptionsVisibility()}>
					<OptionsIcon />
					<OptionsContainer
						initial={false}
						variants={nav.container}
						animate={optionsVisible ? 'visible' : 'hidden'}
					>
						<Option variants={nav.child} onClick={() => addMonthlyValuePopup()}>
							Valor desse mês
						</Option>
						<Option variants={nav.child}>Valor desse mês + comida + gás</Option>
						<Option variants={nav.child}>Criar</Option>
					</OptionsContainer>
				</NavButton>
				<NavAnchor to="#" />
			</Nav>
		</NavContainer>
	);
};

export default memo(Navbar);
