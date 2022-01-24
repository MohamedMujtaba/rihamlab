import styled from 'styled-components';

const MainP = styled.p`
  text-align: left;
  width: 100%;
  /* min-width: 200px; */
  min-height: 1rem;
  padding: 0 1rem;
  /* padding: 3rem; */
  /* font-size: 15px; */
  display: flex;
  justify-content: space-between;
  @media print{
    p{
      break-after: always;
    }
  }
`;
const Span = styled.span`
  min-width: 25%; //new update --Need to be cheacked
  /* max-width:30%; */
  display: inline-flex;
  align-items:  center;
  justify-content: flex-start;
  border-top: solid 1px #f2f2f2;
  padding: 2px 5px;
  &:last-child{
    border-left: solid 1px #f2f2f2;
    border-right: solid 1px #f2f2f2;
  }
  &:first-child{
    border-left: solid 1px #f2f2f2;
    border-right: solid 1px #f2f2f2;
  }
`;
const Span47 = styled.span`
  width: 47%;
`;

const DisplayText = ({ text }) => {
  return (
    text.split("/n").map((line) => {
      return (
        <MainP>
          {
            line.includes("~") ?
              line.split("~").map((half) => {
                return (
                  <Span47>
                    {
                      half.includes("|") ?
                        half.split("|").map((d) => {
                          return (
                            <Span>{d}</Span>
                          );
                        })
                        :
                        half
                    }
                  </Span47>
                );
              })
              :
              line.includes("|") ?
                <Span47>
                  {
                    line.split("|").map((a) => {
                      return (
                        <Span>{a}</Span>
                      );
                    })
                  }
                </Span47>
                :
                line
          }
        </MainP>
      );
    })
  );
};

export default DisplayText;
