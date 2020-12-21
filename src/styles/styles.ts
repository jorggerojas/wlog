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

const HeaderLink = styled.span`
  color: ${({ theme }) => theme.headerLink} !important;
`;

const Title3 = styled.h3`
  color: ${({ theme }) => theme.textColorPrimary} !important;
  text-shadow: 1px 1px #fd7777;
`;

const Title3White = styled.h3`
  color: ${({ theme }) => theme.textColorPrimaryWhite} !important;
  text-shadow: 1px 1px #fd7777;
`;

const ContainerList = styled.ul`
  min-height: 76.1vh;
`;

const Image = styled.img`
  animation: move 2s linear infinite;
  color: ${({ theme }) => theme.primaryColor} !important;
  position: relative;
  width: 50%;
`;

const SignContainer = styled.div`
  background: ${({ theme }) => theme.primaryColor} no-repeat;
  height: 100vh;
`;

const Title1 = styled.h1`
  color: ${({ theme }) => theme.textColorPrimaryWhite};
  letter-spacing: 8px;
  text-shadow: -2px -2px ${({ theme }) => theme.textShadowRed};
`;

const LogoSignIn = styled.span`
  color: ${({ theme }) => theme.primaryColor};
  font-weight: 500;
  letter-spacing: 3px;
  text-decoration: "none";
`;

export {
  Container,
  Nav,
  LoadingContainer,
  HeaderLink,
  Title3,
  ContainerList,
  Image,
  SignContainer,
  Title3White,
  Title1,
  LogoSignIn,
};
