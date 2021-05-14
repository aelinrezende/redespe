import React, { useState, useCallback, useEffect, memo } from 'react';

import { useExpense } from '../../hooks/expense';
import { usePopup } from '../../hooks/popup';

import { nav, button } from './motion.variants';

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
	const { getMonthlyValue, toggleAccount, account } = useExpense();
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

	const addMonthlyAndExtraValuePopup = useCallback(() => {
		addPopup(
			'Valor das Contas + Gás + Comida',
			'R$' + (monthlyValue + 100 + 550).toFixed(2),
		);
	}, [addPopup, monthlyValue]);

	return (
		<NavContainer>
			<Nav>
				<NavAnchor to="#" />
				<NavButton
					whileHover={button.hover}
					onClick={() => toggleOptionsVisibility()}
					transition={{ duration: 0.3 }}
				>
					<OptionsIcon />
					<OptionsContainer
						initial={false}
						variants={nav.container}
						animate={optionsVisible ? 'visible' : 'hidden'}
					>
						<Option
							whileHover={nav.child.hover}
							transition={{ duration: 0.2 }}
							variants={nav.child}
						>
							Criar
						</Option>
						<Option
							whileHover={nav.child.hover}
							transition={{ duration: 0.2 }}
							variants={nav.child}
							onClick={() => toggleAccount()}
						>
							Alternar conta | Atual: {account.label}
						</Option>
						<Option
							whileHover={nav.child.hover}
							transition={{ duration: 0.2 }}
							variants={nav.child}
							onClick={() => addMonthlyValuePopup()}
						>
							Valor desse mês
						</Option>
						<Option
							whileHover={nav.child.hover}
							transition={{ duration: 0.3 }}
							variants={nav.child}
							onClick={() => addMonthlyAndExtraValuePopup()}
						>
							Contas deste mês + comida + gás
						</Option>
					</OptionsContainer>
				</NavButton>
				<NavAnchor to="#" />
			</Nav>
		</NavContainer>
	);
};

export default memo(Navbar);
