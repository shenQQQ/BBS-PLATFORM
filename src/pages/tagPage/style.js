import styled from "styled-components";
export const TagWrapper = styled.div`
.circle{
    height: 200px;
    overflow:hidden;
}
  .circle-shadow {
    margin: auto;
    width: ${(document.documentElement.clientWidth - 250) * 0.9 + "px"};
    height: ${(document.documentElement.clientWidth - 250) * 0.9 + "px"};
    margin-top: ${-(document.documentElement.clientWidth - 250) * 0.4 + "px"};
    border-radius: 50%;
    border: 200px solid;
    /*background-clip: padding-box;*/
  }
  .tagName{
      z-index:999;
  }
  .container{
    text-align:center;
    height:200px;
    line-height:200px;
    font-size:50px;
    font-weight:900;
    color:white;
  }
`