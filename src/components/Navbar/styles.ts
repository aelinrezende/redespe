import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const optionsVisibleAnimation = keyframes`
	to {
		transform: translate(50%, 0);
		height: auto;
		overflow: visible;
		opacity: 1;
	}
`;

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

export const OptionsContainer = styled.form`
	position: absolute;
	bottom: 100%;
	right: 50%;

	width: 20rem;
	margin-bottom: 1rem;

	transform: translate(50%, 10px);
	height: 0;
	overflow: hidden;
	opacity: 0;

	${NavButton}:focus & {
		animation: ${optionsVisibleAnimation} 1s forwards;
	}
`;

export const Option = styled.button`
	border: 2px solid #dedede;
	border-radius: 5px;
	padding: 1rem;

	& + & {
		margin-top: 1rem;
	}
`;

export const NavAnchor = styled(Link)``;
