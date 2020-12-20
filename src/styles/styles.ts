import styled from "styled-components";

const Container = styled.div`
  background: ${({ theme }) => theme.background};
  padding: 0;
`;

const Nav = styled.header`
  background: ${({ theme }) => theme.primaryColor} !important;
`;

export { Container, Nav };
