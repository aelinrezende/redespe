import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CgOptions } from 'react-icons/cg';
import { motion } from 'framer-motion';

export const NavContainer = styled.nav`
	position: absolute;
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

export const NavButton = styled.button`
	position: relative;

	width: 5rem;
	height: 5rem;
	border: 2px solid #000;
	border-radius: 50%;
`;

export const OptionsContainer = styled(motion.ul)`
	position: absolute;
	bottom: 100%;
	transform: translateX(50%);
	right: 50%;

	width: 20rem;
	margin-bottom: 1rem;
`;

export const Option = styled(motion.li)`
	border: 2px solid #dedede;
	border-radius: 5px;
	padding: 1rem;

	& + & {
		margin-top: 1rem;
	}
`;

export const NavAnchor = styled(Link)``;

export const OptionsIcon = styled(CgOptions)``;
