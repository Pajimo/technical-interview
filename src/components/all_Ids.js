import { useState, useRef, useEffect } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import Information from "./information";


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


const All_Ids = ({allIdBox, allData, setAllData}) => {

    const [info, setInfo] = useState(false)

    const closeForm = () => {
        allIdBox.current.classList.remove('is-visible')
    }


    return(
        <>
            {info ? <Information /> : ''}
            <div className="modal-dialog w-96">
                <p onClick={closeForm} className="cursor-pointer p-3 bg-gray-500 text-white font-bold text-4xl flex justify-en">X</p>
                <p className='text-center text-2xl font-bold my-3'>All ID cards users</p>
                <table className="table-auto mx-20 border-separate border border-slate-400 overflow-x-scroll w-full">
                    <thead className='h-20 text-lg bg-gray-500'>
                    <tr className=''>
                        <th className='border border-slate-300'>ID</th>
                        <th className='border border-slate-300'>Field topic</th>
                        <th className='border border-slate-300'>Value</th>
                    </tr>
                    </thead>
                    {allData.map((data) => {
                        const {fullname, location, iD, address, formInputs} = data

                            return(

                                <tbody key={iD}>
                                    <tr>
                                        <td className='border border-slate-300 p-3'>{iD}</td>
                                        <div >{formInputs.map((inputInform) => {
                                            return(
                                                <div>
                                                    <td className='border border-slate-300 p-3'>{inputInform.placeholder}</td>
                                                    <td className='border border-slate-300 p-3'> {inputInform.name}</td>
                                                </div>
                                            )
                                        })}</div>
                                    </tr>
                                </tbody>
                            )
                    })}
                </table>
            </div>
        </>
    )
}

export default All_Ids