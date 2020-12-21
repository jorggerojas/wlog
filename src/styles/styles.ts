import styled from "styled-components";

const Container = styled.div`
  background: ${({ theme }) => theme.background};
  padding: 0;
`;

const Nav = styled.nav`
  background: ${({ theme }) => theme.primaryColor} !important;
`;

const DivSalmon = styled.div`
  background: ${({ theme }) => theme.background} !important;
`;

const LoadingContainer = styled.div`
  height: 77vh;
  background: none;
  margin: 0;
`;

const LinkUser = styled.a`
  color: ${({ theme }) => theme.linkUser} !important;
`;

const LinkUserComment = styled.a`
  color: ${({ theme }) => theme.linkUserComment} !important;
`;

const AccordionTitle = styled.legend`
  color: ${({ theme }) => theme.accordionTitle} !important;
  font-size: 1.5rem;
`;

const HeaderLink = styled.span`
  color: ${({ theme }) => theme.headerLink} !important;
`;

const SpanBadge = styled.span`
  background: ${({ theme }) => theme.badge} !important;
`;

const DivBadge = styled.div`
  background: ${({ theme }) => theme.badge} !important;
`;

const Title3 = styled.h3`
  color: ${({ theme }) => theme.textColorPrimary} !important;
  text-shadow: 1px 1px #fd7777;
  text-decoration: none !important;
  &:hover {
    text-decoration: none !important;
  }
`;

const TitleLoading = styled.h3`
  color: ${({ theme }) => theme.loading} !important;
  text-shadow: 1px 1px #fd7777;
  text-decoration: none !important;
  &:hover {
    text-decoration: none !important;
  }
`;

const Article = styled.article`
  background: ${({ theme }) => theme.article} !important;
`;

const ArticleBox = styled.article`
  background: ${({ theme }) => theme.background} !important;
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

const TitlePost = styled.h1`
  color: ${({ theme }) => theme.textColorPrimary};
  letter-spacing: 2px;
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

const TextArea = styled.textarea`
  background: ${({ theme }) => theme.backgroundInput};
  color: ${({ theme }) => theme.accordionTitle};
  border: 0.5px solid ${({ theme }) => theme.backgroundInput} !important;
  &:focus {
    background: ${({ theme }) => theme.backgroundTextArea};
    border: 0.5px solid ${({ theme }) => theme.borderTextArea} !important;
    color: ${({ theme }) => theme.accordionTitle};
  }
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
  background: ${({ theme }) => theme.article} !important;
`;

const Title4 = styled.h4`
  color: ${({ theme }) => theme.textColorPrimary};
  font-weight: 500;
`;

const Title2 = styled.h2`
  color: ${({ theme }) => theme.textColorPrimary};
  font-weight: 500;
`;

const Submit = styled.input.attrs({ type: "submit" })`
  background: ${({ theme }) => theme.badge} !important;
`;

const CommentContainer = styled.div`
  background: ${({ theme }) => theme.article} !important;
`;

const Date = styled.li`
  color: ${({ theme }) => theme.textDate} !important;
`;

const CommentParagraph = styled.p`
  color: ${({ theme }) => theme.textDate} !important;
`;

const InputPost = styled.input.attrs({ type: "text" })`
  background: ${({ theme }) => theme.backgroundInput};
  color: ${({ theme }) => theme.accordionTitle};
  border: 2px solid ${({ theme }) => theme.primaryColor} !important;
  &:focus {
    background: ${({ theme }) => theme.backgroundTextArea};
    border: 2px solid ${({ theme }) => theme.borderTextArea} !important;
    color: ${({ theme }) => theme.accordionTitle};
  }
`;

const TextAreaPost = styled.textarea`
  background: ${({ theme }) => theme.backgroundInput};
  color: ${({ theme }) => theme.accordionTitle};
  border: 2px solid ${({ theme }) => theme.primaryColor} !important;
  &:focus {
    background: ${({ theme }) => theme.backgroundTextArea};
    border: 2px solid ${({ theme }) => theme.borderTextArea} !important;
    color: ${({ theme }) => theme.accordionTitle};
  }
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
  Submit,
  CommentContainer,
  Title4,
  TextArea,
  Nav,
  LoadingContainer,
  HeaderLink,
  Title3,
  Title2,
  ContainerList,
  TitleLoading,
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
  DivSalmon,
  TitlePost,
  LinkUser,
  AccordionTitle,
  SpanBadge,
  Article,
  ArticleBox,
  LinkUserComment,
  DivBadge,
  Date,
  CommentParagraph,
  InputPost,
  TextAreaPost,
};
