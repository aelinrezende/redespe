import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { CgOptions } from 'react-icons/cg';

export const NavContainer = styled.nav`
	position: fixed;
	bottom: 0;

	height: 5rem;
	width: 100%;

	display: flex;
	justify-content: center;
`;

export const Nav = styled.div`
	position: absolute;
	transform: translateY(25%);
	bottom: 75%;
`;

export const NavButton = styled(motion.button)`
	position: relative;

	width: 5rem;
	height: 5rem;
	border: 0;
	border-radius: 50%;
	color: #dedede;
	background: #1c1f27;
	box-shadow: 0 15px 15px -10px rgb(0 0 0 / 85%);
	font-size: 1.6rem;

	display: flex;
	align-items: center;
	justify-content: center;
`;

export const OptionsContainer = styled(motion.ul)`
	position: absolute;
	bottom: 100%;
	transform: translateX(50%);
	right: 50%;

	width: 20rem;
	margin-bottom: 2rem;
`;

export const Option = styled(motion.li)`
	display: inline-block;
	border-radius: 10px;
	margin: 0 auto;
	padding: 1rem 2rem;
	color: #dedede;
	background: #1c1f27;
	box-shadow: 0 15px 11px -10px rgb(17 29 70);
	cursor: pointer;

	& + & {
		margin-top: 1rem;
	}
`;

export const NavAnchor = styled(Link)``;

export const OptionsIcon = styled(CgOptions)`
	font-size: 2.2rem;
`;
