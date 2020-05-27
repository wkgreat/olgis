import styled from 'styled-components';

export const TOCWrapper = styled.div`

  position: absolute;
  float:left;
  top: 48px;
  left: 0px;
  z-index: 9;
  width: 200px;
  overflow: auto;
  background-color: rgba(0,0,0,0.8);
  box-sizing: border-box;
  margin: 0px 0px;
  
`;

export const TOCTitle = styled.div`
  box-sizing: border-box;
  min-height: 30px;
  padding-left: 10px;
  //border: 1px solid white;
  //overflow: auto;
  background-color: rgba(50,50,50,0.8);
  text-align: center;
  span {
    color: blanchedalmond;
    font-size: 18px;
    line-height: 30px;
  }
`;

export const LayerItemWrapper = styled.div`
  
  box-sizing: border-box;
  min-height: 30px;
  padding-left: 10px;
  border: 1px solid darkblue;
  overflow: auto;
  
  span {
    color: blanchedalmond;
    font-size: 18px;
    line-height: 30px;
  }
  
  .layerNameSpan {
    font-size: 10px;
  }
  
  .iconfont {
    cursor: pointer;
  }
  
`;

export const LayerToolDiv = styled.div`
  float: right;
  
  &.hide {
    display: none;
  }
`;