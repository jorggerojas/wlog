import { createGlobalStyle } from "styled-components";
import { normalize } from "polished";

export const GlobalStyle = createGlobalStyle`
  ${normalize()}
  html {
    font-size: 1rem;
    height: 100vh;
  }

  body {
    margin: 0;
    height: 100vh;
    -webkit-font-smoothing: antialiased; 
    -moz-osx-font-smoothing: grayscale;
  }

  .white{
    color: white !important;
  }

  .uk-pagination > * > * > *:focus {
    border: none !important;
  }

  .active {
    color: #fd7777 !important;
    font-weight: 500;
  }

  textarea{
    resize: none;
    padding: 10px !important;
  }

  .red{
    color: red !important;
  }

  .blue{
    color: #0F7AE5 !important;
  }

  .uk-active>a{
    background: #fd7777 !important;
    color: white !important;
  }

  .divSalmon{
    color: #fd7777 !important;
  }

  .blur{
    filter:blur(15px);
    -webkit-filter:blur(15px);
  }

  .backLoad{
    background: rgba(253,119,119,.3) !important;
  }

  .pointer{
    cursor: pointer !important;
  }

  .transparent{
    background :transparent;
  }

  .uk-pagination>*>*{
    color: #666;
  }

  img {
    animation: move 2s linear infinite;
    color: #fd7777 !important;
  }


  .swal-title {
    color: black;
  }

  .key {
    cursor: pointer !important;
  }

  .key:hover {
    background: red !important;
  }

  .salmonSpan{
    color: #fd7777 !important;
  }

  .salmonSpanBold{
    color: #fd7777 !important;
    font-weight:500;
  }

  .fontSizeLarge{
    font-size: 2.5rem;
  }

  .fontSizeShort{
    font-size: 1.9rem
  }

  @keyframes move {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  .mid {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rocker {
    display: inline-block;
    position: relative;
    font-size: 2em;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    color: #888;
    width: 7em;
    height: 4em;
    overflow: hidden;
    border-bottom: 0.5em solid #eee;
  }

  .rocker-small {
    font-size: 0.75em; /* Sizes the switch */
    margin: 1em;
  }

  .rocker::before {
    content: "";
    position: absolute;
    top: 0.5em;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #999;
    border: 0.5em solid #eee;
    border-bottom: 0;
  }

  .rocker input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .switch-left,
  .switch-right {
    cursor: pointer;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5em;
    width: 3em;
    transition: 0.2s;
  }

  .switch-left {
    user-select:none;
    height: 2.4em;
    width: 2.75em;
    left: 0.85em;
    bottom: 0.4em;
    background-color: #ddd;
    transform: rotate(15deg) skewX(15deg);
  }

  .switch-right {
    user-select:none;
    right: 0.5em;
    bottom: 0;
    background-color: #fd7777;
    color: #fff;
  }

  .switch-left::before,
  .switch-right::before {
    content: "";
    position: absolute;
    width: 0.4em;
    height: 2.45em;
    bottom: -0.45em;
    background-color: #ccc;
    transform: skewY(-65deg);
  }

  .switch-left::before {
    left: -0.4em;
  }

  .switch-right::before {
    right: -0.375em;
    background-color: transparent;
    transform: skewY(65deg);
  }

  input:checked + .switch-left {
    background-color: #18181B;
    color: #fff;
    bottom: 0px;
    left: 0.5em;
    height: 2.5em;
    width: 3em;
    transform: rotate(0deg) skewX(0deg);
  }

  input:checked + .switch-left::before {
    background-color: transparent;
    width: 3.0833em;
  }

  input:checked + .switch-left + .switch-right {
    background-color: #ddd;
    color: #888;
    bottom: 0.4em;
    right: 0.8em;
    height: 2.4em;
    width: 2.75em;
    transform: rotate(-15deg) skewX(-15deg);
  }

  input:checked + .switch-left + .switch-right::before {
    background-color: #ccc;
  }

  input:focus + .switch-left {
    color: #333;
  }

  input:checked:focus + .switch-left {
    color: #fff;
  }

  input:focus + .switch-left + .switch-right {
    color: #fff;
  }

  input:checked:focus + .switch-left + .switch-right {
    color: #333;
  }

  @media screen and (max-width: 375px){
    .rocker-small {
    font-size: 0.50em;
    margin-top:1.3rem
  }
  }
`;
