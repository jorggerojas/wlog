import styled from "styled-components";

const Container = styled.div`
  background: ${({ theme }) => theme.background};
  padding: 0;
  height: 100vh;
`;

const ContainerPost = styled.div`
  background: ${({ theme }) => theme.background};
  height: auto;
`;

const ContainerNoMatch = styled.div`
  background: ${({ theme }) => theme.background};
  padding-top: 5rem;
  margin: 0;
  text-align: center;
  height: 83.3vh;
`;

const Nav = styled.nav`
  background: ${({ theme }) => theme.primaryColor} !important;
`;

const DivSalmon = styled.div`
  background: ${({ theme }) => theme.background} !important;
`;

const LoadingContainer = styled.div`
  height: 77vh;
  background: ${({ theme }) => theme.background} !important;
  margin: 0;
`;

const DivBadge = styled.div`
  background: ${({ theme }) => theme.badge} !important;
`;

const Article = styled.article`
  background: ${({ theme }) => theme.article} !important;
`;

const ArticleBox = styled.article`
  background: ${({ theme }) => theme.background} !important;
`;

const SignContainer = styled.div`
  background: ${({ theme }) => theme.primaryColor} no-repeat;
  height: 100vh;
`;

const ContainerSign = styled.div`
  background: ${({ theme }) => theme.backgroundTextArea};
`;

const Form = styled.form`
  min-height: 1rem !important;
  background: ${({ theme }) => theme.article} !important;
`;

const CommentContainer = styled.div`
  background: ${({ theme }) => theme.article} !important;
`;

const CardBody = styled.div`
  background: ${({ theme }) => theme.cardBody};
  &:hover {
    background: ${({ theme }) => theme.cardBodyHover} !important;
  }
`;

export {
  Container,
  CardBody,
  CommentContainer,
  Nav,
  LoadingContainer,
  SignContainer,
  Form,
  DivSalmon,
  Article,
  ArticleBox,
  DivBadge,
  ContainerSign,
  ContainerNoMatch,
  ContainerPost,
};
