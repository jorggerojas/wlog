import styled from "styled-components";

const Select = styled.select`
  background: ${({ theme }) => theme.backgroundInput};
  color: ${({ theme }) => theme.colorInput};
  width: 100%;
  height: 35px;
  border-color: ${({ theme }) => theme.primaryColor} !important;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2224%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23666%22%20points%3D%2212%201%209%206%2015%206%22%20%2F%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23666%22%20points%3D%2212%2013%209%208%2015%208%22%20%2F%3E%0A%3C%2Fsvg%3E%0A")
    no-repeat;
  &:focus {
    outline: none !important;
    color: ${({ theme }) => theme.colorInput};
    border-color: ${({ theme }) => theme.primaryColor} !important;
    background: ${({ theme }) => theme.backgroundInput};
  }
`;

const Option = styled.option`
  background: ${({ theme }) => theme.primaryColor} !important;
  color: ${({ theme }) => theme.textColorPrimaryWhite};
  padding: 100px !important;
`;

const LinkUser = styled.a`
  color: ${({ theme }) => theme.linkUser} !important;
`;

const LinkUserComment = styled.a`
  color: ${({ theme }) => theme.linkUser} !important;
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
  color: #fd7777;
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
  max-width: 350px;
  background: ${({ theme }) => theme.backgroundInput};
  color: ${({ theme }) => theme.colorInput};
  &:focus {
    outline: none !important;
    color: ${({ theme }) => theme.colorInput};
    border-color: ${({ theme }) => theme.primaryColor} !important;
    background: ${({ theme }) => theme.backgroundInput};
  }
`;

const ParagraphShort = styled.p`
  font-size: 1rem;
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

export {
  Submit,
  Title4,
  TextArea,
  HeaderLink,
  Title3,
  Title2,
  ContainerList,
  TitleLoading,
  Image,
  Title3White,
  Title1,
  LogoSignIn,
  SpanLight,
  TextChange,
  Input,
  SalmonParagraph,
  ParagraphShort,
  TitlePost,
  LinkUser,
  AccordionTitle,
  SpanBadge,
  Select,
  LinkUserComment,
  Date,
  CommentParagraph,
  InputPost,
  TextAreaPost,
  Option,
};
