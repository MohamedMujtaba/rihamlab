import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import axios from 'axios';
import { FcCheckmark, FcSearch } from 'react-icons/fc';
import './NewBill.css';
import { Cart, CloseBtn, Left, List, Right } from './NewBillStyle';
import { CgCloseO } from 'react-icons/cg';
import FloatButton from '../../components/FloatButton/FloatButton';
const NewBill = () => {
  const { userid } = useParams();
  const history = useHistory();
  const [user, setUser] = useState({});
  const [tests, setTests] = useState([]);
  const [insurance, setInsurance] = useState();
  const [insuranceNumber, setInsuranceNumber] = useState();
  const [theData, setTheData] = useState([]);
  const [bill, setBill] = useState([]);
  const [total, setTotal] = useState(0);
  const [have, setHave] = useState('');
  const search = (e) => {
    let searchWord = e.target.value.toLowerCase();
    if (searchWord === "") {
      setTests(theData);
    } else {
      let newF = tests.filter((i) => {
        return i.testName.toLowerCase().includes(searchWord);
      });
      setTests(newF);
    }
  };

  const getTests = async () => {
    try {
      const res = await fetch("https://reham-api-v1.herokuapp.com/api/v1/tests");
      const data = await res.json();
      setTests(data);
      setTheData(data);
    } catch (err) {
      console.log(err);
    }
  };
  const getUser = async () => {
    try {
      const res = await fetch(`https://reham-api-v1.herokuapp.com/api/v1/users/${userid}`);
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };
  const add = (test) => {
    if (!bill.map((i) => {
      return i._id;
    }).includes(test._id)) {
      setBill([...bill, { ...test, result: "" }]);
    }
  };
  const handeleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://reham-api-v1.herokuapp.com/api/v1/bills", {
        user: user,
        tests: bill,
        insurance,
        insuranceNumber,
        total
      });
      history.push(`/userdit/${userid}`);
    } catch (err) {
      console.log(err);
    }
  };
  const handeleDelete = (id) => {
    setBill(bill.filter((i) => {
      return i._id !== id;
    }));
  };
  useEffect(() => {
    getTests();
    getUser();
  }, []);
  useEffect(() => {
    const tv = bill.reduce((acc, curr) => {
      acc += curr.price;
      return acc;
    }, 0);
    setTotal(tv);
  }, [bill]);
  return (
    <div className="new-bill">
      <Left>
        {
          total > 0 &&
          <FloatButton
            icon={<FcCheckmark />}
            onClick={handeleSubmit}
            left={'10%'}
            content={'Done'}
          />
        }
        <Cart>
          {
            bill.map((i) => {
              return (
                <div key={i._id} className="line">
                  <p>{i.testName}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <p>{i.price}</p>
                    <CloseBtn onClick={() => { handeleDelete(i._id); }}>
                      <CgCloseO />
                    </CloseBtn>
                  </div>
                </div>
              );
            })
          }
          {
            total > 0 &&
            <div className="line" >
              <p><b>Total</b></p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <p> <b>{total}</b></p>
                <p><small>SDG</small></p>
              </div>
            </div>
          }
        </Cart>
        <input style={{ display: 'inline-block', padding: '.1rem' }}
          type="checkbox" name="have"
          // value="have"
          onClick={(e) => setHave(!have)}
        />
        <label htmlFor="have">Have insurance</label>
        {
          have === true &&
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="input-area">
              <label htmlFor="insName">Insurance Company Name</label>
              <input required type="text" name="number" onChange={(e) => setInsurance(e.target.value)} />
            </div>
            <div className="input-area">
              <label htmlFor="insName">Insurance Number</label>
              <input required type="text" name="number" onChange={(e) => setInsuranceNumber(e.target.value)} />
            </div>
          </div>
        }
      </Left>
      <Right>
        <div className="top" style={{ justifyContent: 'flex-end' }}>
          <div className="input-handler">
            <input className="input" type="text" onChange={search} />
            <FcSearch className="icon" />
          </div>
        </div>
        <List >
          {
            tests.map((test) => {
              return (
                <Test add={add} key={test._id} test={test} setBill={setBill} bill={bill} />
              );
            })
          }
        </List>
      </Right>
    </div>
  );
};



const Test = ({ test, setBill, bill, add }) => {
  return (
    <div className="test" onClick={() => add(test)} style={{ cursor: 'pointer' }}>
      <h4>{test.testName}</h4>
      <p className="price">{test.price}</p>
    </div>
  );
};

export default NewBill;
