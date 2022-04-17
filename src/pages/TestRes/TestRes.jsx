import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./TestRes.css";
import { AiOutlinePrinter } from "react-icons/ai";
import FloatButton from "../../components/FloatButton/FloatButton";
import DisplayText from "./DisplayText";
import { Top, Dit, Table, TableRow, Block, Footer } from "./TestResStyle";
import { FcEditImage } from "react-icons/fc";
import Loading from "../../components/Loading/Loading";
import logo from "../../img/logo.png";
import ResTable from "../../components/ResTable/ResTable";
import { HStack, VStack } from "@chakra-ui/react";
const TestRes = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [tests, setTests] = useState([]);
  const [resID, setResID] = useState("");
  const [resDate, setResDate] = useState("");
  const [loading, setLoading] = useState(true);

  const getRes = async () => {
    try {
      const res = await fetch(
        `https://reham-api-v1.herokuapp.com/api/v1/results/${id}`
      );
      const data = await res.json();
      setUser(data.user);
      setTests(data.tests);
      setResID(data._id);
      setResDate(data.createdAt.split("T")[0]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getRes();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="test-res" id="ts">
            <FloatButton
              onClick={() => window.print()}
              att={"button"}
              icon={<AiOutlinePrinter />}
              content={"Print"}
            />
            <FloatButton
              icon={<FcEditImage />}
              att={"Link"}
              to={`/updateres/${resID}`}
              left={"10%"}
              content={"Edit"}
            />
            <Top>
              <div>
                <h2> مختبر الرهام الطبي الحديث</h2>
                <h4> خلف مجمع طارق الطبي وجوار</h4>
                <h4> مركز الصدى للسمع </h4>
                <h4> 0912345678</h4>
              </div>
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <img
                  style={{
                    width: "70%",
                    height: "70%",
                  }}
                  src={logo}
                  alt="logo"
                />
              </div>
            </Top>
            <Dit>
              <p>
                <b>Name:</b> {user.name}
              </p>
              <p>
                <b>Number:</b> 0{user.phone}
              </p>
              <p>
                <b>Gender:</b> {user.gender}
              </p>
              <p>
                <b>age</b>: {user.age}
              </p>
            </Dit>
            <Table>
              <TableRow>
                <HStack justifyContent="space-between" width="100%" h="100%">
                  <VStack w="20%" alignItems="flex-start">
                    <p
                      style={{
                        width: "100%",
                        textAlign: "start",
                      }}
                    >
                      Test Name
                    </p>
                  </VStack>
                  {/* <VStack w="20%">
                    <p>Result</p>
                  </VStack>
                  <VStack w="20%">
                    <p>Normal</p>
                  </VStack>
                  <VStack w="20%">
                    <p>Unit</p>
                  </VStack> */}
                </HStack>
              </TableRow>
              <Block>
                {tests.map((test) => {
                  return (
                    <Block>
                      <TableRow>
                        <p style={{ textAlign: "start", width: "50%" }}>
                          {test.testName}
                        </p>
                      </TableRow>
                      <Block>
                        {test.comment && <DisplayText text={test.comment} />}
                        {test.subTest && (
                          <ResTable tests={test.wanted} gender={user.gender} />
                        )}
                      </Block>
                    </Block>
                  );
                })}
              </Block>
            </Table>
          </div>
          <Footer>
            <p style={{ fontSize: "14px" }}>
              <p>دقة التشخيص ... سرعةالأداء</p>
              <p>0901459802 - 0901459802</p>
            </p>
            <p style={{ fontSize: "14px" }}>
              <p>المكان خلف مجمع طارق الطبي </p>
              <p>وجوار مركز الصدى للسمع</p>
            </p>
            <p style={{ fontSize: "14px" }}>
              <p>مختبر الرهام الطبي الحديث </p>
              <p>نتمنى لكم دوام الصحة والعافية </p>
            </p>
          </Footer>
        </>
      )}
    </>
  );
};

export default TestRes;
