import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

import { FiMoreHorizontal } from 'react-icons/fi';
import { FiEdit3 } from 'react-icons/fi';
import { IoMdRemove } from 'react-icons/io';

const expensesUp = keyframes`
  0% {
    top: 100px;
    opacity: 0.3;
  }
  100% {
    top: 0;
    opacity: 1;
  }
`;

export const Container = styled.main`
  position: relative;
  min-height: 100vh;
  height: 100%;
  max-width: 40rem;
  width: 100%;

  padding: 0 2rem 10rem;
`;

export const ExpensesList = styled(motion.ul)`
  position: relative;
  list-style: none;
  margin-top: 2rem;
  animation: ${expensesUp} 0.3s forwards;
`;

export const Expense = styled.li`
  & + & {
    margin-top: 5rem;
  }
`;

export const ExpenseContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  div:nth-of-type(1) {
    width: 5rem;
    height: 5rem;
    margin-right: 1rem;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #ffffff;
    background: linear-gradient(
      90deg,
      rgb(191 66 191) 0%,
      rgb(210 41 135) 100%
    );
    border-radius: 5px;
  }

  div:nth-child(2) {
    flex: 1;

    h2 {
      margin-bottom: -1rem;
    }

    span {
      color: #8a8685;
    }
  }

  p {
    font-weight: 600;
    font-size: 2.2rem;
    width: 100%;
    margin-top: 1rem;
  }
`;

export const ExpenseMain = styled.div`
  position: relative;
  padding: 3rem;
  border: 4px solid transparent;
  border-radius: 10px;
  background: #f0f3f9;
  box-shadow: 10px 10px 20px #cbced1, -10px -10px 20px #ffffff;

  transition: border 0.5s ease-in-out;

  &:hover {
    border: 4px solid #4d3645;
  }
`;

export const ExpenseButtonsTop = styled.div`
  position: absolute;
  transform: translateY(50%);
  bottom: 100%;
  right: 0.5rem;

  display: flex;

  a {
    margin-right: 0.5rem;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #ffffff;
    background: #1c1f27;
    box-shadow: 0 10px 15px -5px rgb(49 49 49 / 75%);
    transition: box-shadow 1s ease-out;

    &:hover {
      box-shadow: 0 10px 15px -5px rgb(49 49 49 / 100%);

      transition: all 1s ease-in;
    }
  }

  button {
    background: #d42020;
    box-shadow: 0 10px 15px -5px rgb(49 49 49 / 75%);

    transition: box-shadow 1s ease-out;

    &:hover {
      box-shadow: 0 10px 15px -5px rgb(49 49 49 / 100%);

      transition: all 1s ease-in;
    }
  }

  a,
  button {
    font-size: 2rem;
    border-radius: 50%;
    height: 4rem;
    width: 4rem;
    color: #fefeff;
    border: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const RemoveIcon = styled(IoMdRemove)``;

export const EditIcon = styled(FiEdit3)``;

export const MoreIcon = styled(FiMoreHorizontal)`
  position: absolute;
  bottom: 0;
  transform: translateY(50%);
  right: 0.5rem;
  background: #1c1f27;
  color: #fefeff;
  border-radius: 50%;
  height: 4rem;
  width: 4rem;
  padding: 0.7rem;
  box-shadow: 0 10px 15px -5px rgb(49 49 49 / 75%);
  cursor: pointer;
`;

export const Bills = styled(motion.ul)`
  list-style: none;
  margin-top: 4rem;
`;

export const Bill = styled(motion.li)`
  & + & {
    margin-top: 3rem;
  }

  padding: 2rem 3rem;
  background: #2f3238;
  border-radius: 10px;
  box-shadow: 0 10px 15px -10px rgb(36 38 39 / 48%);
  box-shadow: 10px 10px 20px #cbced1, -10px -10px 20px #ffffff;
  border: 4px solid #4d3645;

  display: flex;

  transition: border 0.5s;

  &:hover {
    border: 4px solid #eadb20;
  }

  div {
    flex: 1;

    span {
      color: #afaeae;
    }

    p {
      font-weight: 700;
      font-size: 2rem;
      color: #dedede;
    }
  }

  button {
    font-size: 2rem;
    background: #eadb20;
    border-radius: 50%;
    height: 5rem;
    width: 5rem;
    box-shadow: 13px 13px 20px #1f1f21, -13px -13px 20px #3b3c40;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
