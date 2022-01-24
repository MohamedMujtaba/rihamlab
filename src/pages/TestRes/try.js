/* eslint-disable no-lone-blocks */
{
i.includes("|") ?
i.split("|").map((a) => {
  return (
    <span
      style={{
        width: '8%',
        display: "inline-flex",
        alignItems: 'center',
        justifyContent: 'flex-start',
        // borderLeft: '1px solid rgb(30,30,30)',

        // borderRight: '1px solid rgb(30,30,30)'
      }}
    >{a}</span>
  );
})
:
i
}
                         {
                          i.includes("***") ?
                            i.split().map((s) => {
                              if (s === "~") {
                                return (
                                  <span style={{ display: 'inline-block', margin: '0 1rem' }}></span>
                                );
                              }
                              return s;
                            })
                            :

                            i.includes("|") ?
                              i.split("|").map((a) => {
                                return (
                                  <span
                                    style={{
                                      minWidth: '8%',
                                      display: "inline-flex",
                                      alignItems: 'center',
                                      justifyContent: 'flex-start',
                                      // borderLeft: '1px solid rgb(30,30,30)',

                                      // borderRight: '1px solid rgb(30,30,30)'
                                    }}
                                  >{a}</span>
                                );
                              })
                              :
                              i
}
                        






<p style={{
                    textAlign: 'left',
                    width: '100%',
                    padding: '0 1rem',
                    fontSize: '15px'
                  }}>{test.comment.split("\\").map((i) => {
                    return (
                      <p>
                        {
                          i.includes("***") ?
                            i.split().map((s) => {
                              if (s === "~") {
                                return (
                                  <span style={{ display: 'inline-block', margin: '0 1rem' }}></span>
                                );
                              }
                              return s;
                            })
                            :

                            i.includes("|") ?
                              i.split("|").map((a) => {
                                return (
                                  <span
                                    style={{
                                      minWidth: '8%',
                                      display: "inline-flex",
                                      alignItems: 'center',
                                      justifyContent: 'flex-start',
                                      // borderLeft: '1px solid rgb(30,30,30)',

                                      // borderRight: '1px solid rgb(30,30,30)'
                                    }}
                                  >{a}</span>
                                );
                              })
                              :
                              i
                        }
                      </p>
                    );
                  })}
                  </p>