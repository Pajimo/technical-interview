import { useRef, useState } from "react"
import Information from "./information";


const ID_card = ({idCard}) => {

    const myId = useRef()
    const [info, setInfo] = useState(false)

    const printBtn = useRef()
    const closeBtn = useRef()

    const closeIdCardForm = () => {
        myId.current.classList.remove('is-visible')
    }

    const printIDCard = () => {
        closeBtn.current.classList.add('is-not-visible')
        printBtn.current.classList.add('is-not-visible')
        window.print()
        closeIdCardForm()
    }
     
    return(
        <>
        {info ? <Information /> : ''}
        <button onClick={printIDCard} className='absolute top-5 right-20 p-5 text-xl bg-white z-20 rounded-2xl font-semibold' ref={printBtn}>Print ID-Card</button>
            <div className="modal is-visible" id="modal1" ref={myId}>
                <div className="modal-dialog border-2 border-black">
                    <div className='w-96'>
                        <div className='mb-7 flex items-center justify-between'>
                            <img className="w-20 h-20 bg-black rounded-full" src='' alt=''/>
                            <p className='text-2xl text-center font-bold'>{idCard.fullname}ID Card</p>
                        </div>
                        <div className="mb-5">
                            {idCard.formInputs.map((idCard) => {
                                return(
                                <p className="mb-2 font-semibold text-lg" key={idCard.iD}>{idCard.placeholder}: {idCard.name}</p>
                            )})}
                        </div>
                        <button ref={closeBtn} onClick={closeIdCardForm} className='w-full bg-gray-700 text-white py-3 cursor-pointer'>Close ID</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ID_card