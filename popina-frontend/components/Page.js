import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Nav from './Nav';
import Meta from './Meta';

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Porton';
  src: url('/static/FontsFree-Net-Porton-Regular.woff2')format('woff2');
  font-weight: normal;
  font-style: normal;
}
  html{
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body{
    background:#D2FDFF;
    padding:0;
    margin:0;
    font-size:1.5rem;
    line-height:2;
    font-family:'Porton';
  }
  a{
    text-decoration:none;
    color: black;
  }
`;

class Page extends Component {
  render() {
    return (
      <div>
        <GlobalStyle />
        <Meta />
        <Nav />
        {this.props.children}
      </div>
    );
  }
}

export default Page;
