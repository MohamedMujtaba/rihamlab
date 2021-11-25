import styled from "styled-components";
import { Block } from "./TestResStyle";

const MainP = styled.p`
  text-align: left;
  width: 100%;
  /* min-width: 200px; */
  min-height: 1rem;
  padding: 0 1rem;
  /* padding: 3rem; */
  /* font-size: 15px; */
  break-inside: avoid-page;
  display: flex;
  justify-content: space-between;
  @media print {
    p {
      break-after: always;
    }
  }
`;
const Span = styled.span`
  width: 33%; //new update --Need to be cheacked
  /* max-width:30%; */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: solid 1px #f2f2f2;
  padding-top: 1px;
  padding-bottom: 1px;
  padding-left: 5px;
  break-after: page;
  padding: 2px 5px;
  &:last-child {
    border-left: solid 1px #f2f2f2;
    border-right: solid 1px #f2f2f2;
  }
  &:first-child {
    border-left: solid 1px #f2f2f2;
    border-right: solid 1px #f2f2f2;
  }
`;
const Span47 = styled.span`
  width: 49%;
  break-after: page;
`;

const DisplayText = ({ text }) => {
  return text.split("/n").map(
    (line) => {
      return (
        <MainP>
          {line.includes("~") ? (
            line.split("~").map((half) => {
              return (
                <Span47>
                  {half.includes("|")
                    ? half.split("|").map((d) => {
                        return <Span>{d}</Span>;
                      })
                    : half}
                </Span47>
              );
            })
          ) : line.includes("|") ? (
            <Span47>
              {line.split("|").map((a) => {
                return <Span>{a}</Span>;
              })}
            </Span47>
          ) : (
            line
          )}
        </MainP>
      );
    }
    // </Block>
  );
};

export default DisplayText;
