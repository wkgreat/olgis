import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  padding: 0px;
`;

export const TitleDiv = styled.div`
  position: absolute;
  float: left;
  top: 0px;
  left: 0px;
  z-index: 9;
  
  width: 100%;
  height: 48px;
  
  padding-left: 10px;
  //background-color: rgba(85,255,236,0.2);
  //border-bottom: 2px solid rgba(85,255,236,0.9);
  
  color: rgba(255,52,231,0.9);
  font: bold 30px sans-serif;
  text-align: left;
  
  img {
  display: inline;
  }
  
  span {
    position: absolute;
    top: 18px;
    color: rgba(81,139,125,0.9);
    font: bold 15px sans-serif;
  }
  
`;

export const TOCWrapper = styled.div`
`;