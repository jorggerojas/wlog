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
  margin: 0;
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

const TextChange = styled.p`
  color: ${({ theme }) => theme.textColorPrimary};
`;

const SalmonParagraph = styled.p`
  color: ${({ theme }) => theme.primaryColor};
`;

const SpanLight = styled.span`
  color: ${({ theme }) => theme.textColorPrimary};
`;

const Input = styled.input`
  border-top: none;
  border-left: none;
  border-right: 2px solid;
  border-bottom: 2px solid;
  border-radius: 1px;
  border-top-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 35px;
  height: 55px;
  max-width: 450px;
  color: ${({ theme }) => theme.primaryColor};
  &:focus {
    outline: none !important;
    color: ${({ theme }) => theme.primaryColor};
    border-color: ${({ theme }) => theme.primaryColor} !important;
  }
`;

const ParagraphShort = styled.p`
  font-size: 1rem;
`;

const Form = styled.form`
  min-height: 1rem !important;
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
  SpanLight,
  TextChange,
  Input,
  SalmonParagraph,
  ParagraphShort,
  Form,
};
