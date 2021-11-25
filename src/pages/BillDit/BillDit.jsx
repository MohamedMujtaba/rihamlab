import { useState, useEffect } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { FcSurvey } from "react-icons/fc";
import { useParams } from "react-router";
import FloatButton from "../../components/FloatButton/FloatButton";
import { addComma } from "../../utils/addComma";
import { Dit, Top } from "../TestRes/TestResStyle";
import { BillList, InsCont, Item, Main } from "./BillDitStyle";
import Loading from "../../components/Loading/Loading";

const BillDit = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [bill, setBill] = useState({});
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBill = async () => {
    try {
      const res = await fetch(
        `https://reham-api-v1.herokuapp.com/api/v1/bills/${id}`
      );
      const data = await res.json();
      setBill(data);
      setUser(data.user);
      setTests(data.tests);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBill();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Main className="test-res" id="ts">
          <FloatButton
            onClick={() => window.print()}
            att={"button"}
            icon={<AiOutlinePrinter />}
            content={"Print"}
          />
          <Top>
            <div>
              <h4> معمل رهام الطبي</h4>
              <h4> عطبره شارع الدكاتره</h4>
              <h4> 0912345678</h4>
            </div>
            <div>
              <h1
                style={{
                  marginRight: "2rem",
                }}
              >
                Logo
              </h1>
            </div>
          </Top>
          <Dit>
            <p>{user.name}</p>
            <p>0{user.phone}</p>
          </Dit>
          <BillList>
            <Item>
              <p>Test Name</p>
              <p style={{ width: "8%", textAlign: "right" }}>Price</p>
            </Item>
            {tests.map((i) => {
              return (
                <Item>
                  <p>{i.testName}</p>
                  <p style={{ width: "8%", textAlign: "right" }}>
                    {addComma(i.price)}
                  </p>
                </Item>
              );
            })}
            <Item>
              <p style={{ fontWeight: "bolder" }}>Total</p>
              <p
                style={{
                  fontWeight: "bolder",
                  width: "8%",
                  textAlign: "right",
                }}
              >
                {addComma(bill.total)}
              </p>
            </Item>
          </BillList>
          {bill.insurance && (
            <InsCont>
              <b> :شركة التأمين</b>
              <p>{bill.insurance} </p>
              <b> :رقم بطاقة التأمين</b>
              <p>{bill.insuranceNumber}</p>
            </InsCont>
          )}
          {!bill.done && (
            <FloatButton
              att={"Link"}
              to={`/newres/${bill._id}`}
              left={"10%"}
              content={"Make Result"}
              icon={<FcSurvey />}
            />
          )}
        </Main>
      )}
    </>
  );
};

export default BillDit;
