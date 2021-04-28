import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.li)`
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
