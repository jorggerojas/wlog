import styled from "styled-components";

const Container = styled.div`
  background: ${({ theme }) => theme.background};
  padding: 0;
`;

const Nav = styled.nav`
  background: ${({ theme }) => theme.primaryColor} !important;
`;

const LoadingContainer = styled.div`
  height: 77vh;
  background: none;
`;

export { Container, Nav, LoadingContainer };
