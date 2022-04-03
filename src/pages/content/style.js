import styled from "styled-components";
export const ContentWrapper = styled.div`
.content{
    width: 50%;
    margin: 0 auto;
    margin-top: 30px;
    line-height:40px;
}
.article_head{
    display: flex;
    justify-content: center;
}
.article_title{
    width: ${(document.body.clientWidth-250)*0.45 + "px"};
    height: ${(document.body.clientWidth-250)*0.253+ "px"};
    padding: 50px;
    padding-left: ${(document.body.clientWidth-250)*0.45*0.3 + "px"};
}
.title_img{
    width: ${(document.body.clientWidth-250)*0.45 + "px"};
    height: ${(document.body.clientWidth-250)*0.253+ "px"};
    background-color: blue;
}
.description {
    display: flex;
    align-items: center;
    margin-top:50px;
  }
.comment{
    width: 50%;
    margin: 0 auto;
    margin-top: 30px;
    line-height:40px;
}
.text{
    margin-left: 40px;
}
.statement{
    color: grey;
}
`