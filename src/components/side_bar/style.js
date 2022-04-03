import styled from "styled-components";

export const SideBarWrapper = styled.div`
.side_bar{    
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 1032;
    top: 0;
    left: 0;
    width: 250px;
    height: 100vh;
    background: var(--gray-bg-pure);
    overflow:auto;
    background-color: #fff;
}
.side_bar_logo{
    color: red;
    font-size: 25px;
    padding: 5%;
    font-weight: 1000;
    font-family: sans-serif;
}
::-webkit-scrollbar {
    width: 1px;
    height: 6px;
    background-color: rgba(240, 240, 240, 1);
  }
   
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
    border-radius: 10px;
    background-color: rgba(240, 240, 240, .5);
  }
   
  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
    background-color: rgba(240, 240, 240, .5);
  }
`