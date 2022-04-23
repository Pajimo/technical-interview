import './App.css';
import Form from './components/form';
import ID_card from './components/id_card';
import { useState, useRef, useEffect } from 'react';
import { doc, setDoc, getDoc } from "firebase/firestore";
import Information from './components/information';
import All_Ids from './components/all_Ids';
import { collection, query, where, getDocs } from "firebase/firestore";



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDk32baLOZD2aebPSdPwyx3MqkC5TCPPmw",
  authDomain: "interview-test-6e0bd.firebaseapp.com",
  projectId: "interview-test-6e0bd",
  storageBucket: "interview-test-6e0bd.appspot.com",
  messagingSenderId: "459233182406",
  appId: "1:459233182406:web:9065a0afe301cbd1fb8dc7",
  measurementId: "G-GXWQDQZFL0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getFirestore(app)

function App() {

  const [idValue, setIdValue] = useState()
  const [idCard, setIdCard] = useState()
  const [errorId, setErrorId] = useState(false)
  const [info, setInfo] = useState(false)
  const [allData, setAllData] = useState([])
  

  const formbox = useRef()
  const idbox = useRef()
  const allIdBox = useRef()

  const getFormbox = () => {
    formbox.current.classList.add('is-visible')
  }

  const getIdbox = () => {
    idbox.current.classList.add('is-visible')
  }

  const generateId = async() => {
    if(idValue){
      setInfo(true)
      const docRef = doc(database, "formInputs", idValue);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setIdCard(docSnap.data());
        closeIdCardForm()
        setInfo(false)
      } else {
        // doc.data() will be undefined in this case
        setErrorId(true);
        setInfo(false)
        setTimeout(() => {
          setErrorId(false)
        }, 5000)
  
      }
    }else{
      setErrorId(true);
      setTimeout(() => {
        setErrorId(false)
      }, 5000)
    }
  }

  const closeIdCardForm = () => {
     idbox.current.classList.remove('is-visible')
  }

  const viewids = () => {
    allIdBox.current.classList.add('is-visible')
    getAllData()
  }

  const getAllData = async() => {
    setInfo(true)
    const querySnapshot = await getDocs(collection(database, "formInputs"));
    setAllData(querySnapshot.docs.map((doc) =>{
      return { ...doc.data()}
}))
    setInfo(false)
}

// useEffect=(() => {
//     console.log('ok')
//     getAllData()
// }, [])

  return (
    <div className="App">
      {info ? <Information /> : ''}
      <div className='main'>
        <div className='text-center'>
          <p className='text-4xl font-bold text-blue-700 mb-7'>Welcome to this form builder</p>
          <button className='mb-7 px-10 bg-gray-700 text-white py-3 cursor-pointer' onClick={getFormbox}>Add / Create Form</button><br></br>
          <button className='mb-7 px-10 bg-gray-700 text-white py-3 cursor-pointer' onClick={getIdbox}>Generate ID Card</button><br></br>
          <button className='px-10 bg-gray-700 text-white py-3 cursor-pointer' onClick={viewids}>View all ID Cards</button>
        </div>
      </div>

      <div className="modal" id="modal1" ref={idbox}>
        <div className="modal-dialog">
          <div className='w-96'>
            <div className='flex flex-row items-center justify-between  mb-7 '>
              <p className=' text-2xl font-bold'>Input your ID</p>
              <p onClick={closeIdCardForm} className='text-2xl font-bold cursor-pointer'>X</p>
            </div>
            <input className='w-full border-2 border-gray-400 p-3 mb-5' type='text' value={idValue} onChange={(e) => setIdValue(e.target.value)}/>
            <button onClick={generateId} className='mb-3 w-full bg-gray-700 text-white py-3 cursor-pointer'>Generate ID</button>
            {errorId ? <div className='text-red-500 text-lg'>Id does not exist </div> : ''}
          </div>
        </div>
      </div>

      {idCard ? <ID_card idCard={idCard}/> : ''}

      <div className="modal" id="modal1" ref={formbox}>
        <div className="">
          <Form formbox={formbox}/>
        </div>
      </div>

      <div className="modal" id="modal1" ref={allIdBox}>
        <div className="">
          <All_Ids allIdBox={allIdBox} allData={allData} setAllData={setAllData}/>
        </div>
      </div>

    </div>
  );
}

export default App;
