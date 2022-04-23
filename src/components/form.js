import { useState, useRef } from "react"
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import Information from "./information";

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

const Form = ({formbox}) => {

    const name = useRef()
    const addy = useRef()
    const loc = useRef()

    const [formInputs, setFormInputs] = useState([
        {
            placeholder: "firstname",
            type:'text'
        },
        {
            placeholder: "address",
            type:'text'
        },
        {
            placeholder:"location",
            type:'text'
        }
    ])

    const [fullname, setFullname] = useState('')
    const [address, setAddress] = useState('')
    const [location, setLocation] = useState('')
    const [error, setError] = useState(false)
    const [idCardInfo, setIdCardInfo] = useState(false)
    const [idNumber, setidNumber] = useState()
    const [info, setInfo] = useState(false)
    const [enterPlaceholder, setEnterPlaceholder] = useState('')
    const [enterType, setEnterType] = useState('')

    const closeForm = () => {
        setidNumber()
        setFullname('')
        setAddress('')
        setLocation('')
        formbox.current.classList.remove('is-visible')
    }


    const submitForm = async(e) => {
        e.preventDefault()
        //if(location || fullname || address){
            setInfo(true)
            const iD = uuidv4()
            await setDoc(doc(database, "formInputs", iD), {
                iD,
                formInputs
            });

            setTimeout(() => {
                setidNumber(iD)
                setInfo(false)
            }, 2000);
            
        //}else{
            // setError(true)
            // if(!location && !fullname && !address){
            //     addy.current.classList.add('border-red-500')
            //     loc.current.classList.add('border-red-500')
            //     name.current.classList.add('border-red-500')
            // }
            // else if(!location){
            //     loc.current.classList.add('border-red-500')
            // }else if(!fullname){
            //     name.current.classList.add('border-red-500')
            // }else if(!address){
            //     addy.current.classList.add('border-red-500')
            // }
        //}
            
    }

    const handleFormChange = (i, e) => {
        const data = [...formInputs]
        data[i][e.target.name] = e.target.value
        setFormInputs(data)
    }

    const addFields = () => {
        const data = [...formInputs]
        data.push({
            placeholder:enterPlaceholder,
            type:enterType
        })
        setFormInputs(data)
        setEnterPlaceholder('')
        setEnterType('')
    }

    return(
        <>
        {info ? <Information /> : ''}
            <div className="modal-dialog z-0">
                <form onSubmit={submitForm} className='w-96'>
                    <div className="flex justify-end font-bold text-4xl mb-5" >
                        <p onClick={closeForm} className="cursor-pointer">X</p>
                    </div>
                    {formInputs.map((inputs, index) => {
                        return(
                            <div>
                                <input name='name' placeholder={inputs.placeholder} type={inputs.type} value={inputs.value} onChange={(e) => handleFormChange(index, e)} ref={name} className='w-full border-2 border-gray-400 p-3 mb-5'/>
                            </div>
                        )
                    })}
                    {/* <div>
                        <input placeholder="Full Name" type='text' value={fullname} onChange={(e) => setFullname(e.target.value)} ref={name} className='w-full border-2 border-gray-400 p-3 mb-5'/>
                    </div>
                    <div>
                        <input placeholder="Address" type='text' value={address} onChange={(e) => setAddress(e.target.value)} ref={addy} className='w-full border-2 border-gray-400 p-3 mb-5'/>
                    </div>
                    <div>
                        <input placeholder="Location / City" type ='text' value={location} onChange={(e) => setLocation(e.target.value)} ref={loc} className='w-full border-2 border-gray-400 p-3 mb-5'/>
                    </div> */}
                    {error ? 

                        <div className="text-red-500 mb-5">
                            Fill the empty text fields
                        </div> 
                        : 
                        ''
                    }
                    <div>
                        <input type='submit' className="w-full bg-gray-700 text-white py-3 cursor-pointer"/>
                    </div>
                    {idNumber ? <div className="mt-3 text-red-700 font-bold">Copy your form ID below: <br></br><p className="font-semibold text-black">{idNumber}</p></div> : ''}
                </form>
                <div className="mt-5 border-t-2 border-black">
                    <p className="text-center mt-5 text-lg font-semibold">Fill the form below to add new fields</p>
                    <input className='mt-5 w-full border-2 border-gray-400 p-3 mb-5' value={enterPlaceholder} onChange={(e) => setEnterPlaceholder(e.target.value)} placeholder='enter value for placeholder'/><br></br>
                    <input className='w-full border-2 border-gray-400 p-3 mb-5' value={enterType} onChange={(e) => setEnterType(e.target.value)} placeholder='The type of form field'/>
                    <button className="w-full bg-gray-700 text-white py-3 cursor-pointer mt-5" onClick={addFields}>Add Field</button>
                </div>
            </div>
        </>
    )
}

export default Form