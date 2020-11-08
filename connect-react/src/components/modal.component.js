import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import "./events.css";
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default function ModalComponent(props){
  const [textValue, setTextValue] = React.useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
 
  function afterOpenModal() {

  }
 
 async function closeModal(){
    await props.submitfunc(textValue);
    setIsOpen(false);
    
  }

  function   handleChange(event) {
      console.log(props);
    setTextValue( event.target.value);
  }
 
    return (
       
        <>
        <button className="button" onClick={openModal}>{props.titleName}</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
       
         <form onSubmit={closeModal}>
                <label>
                Provide a Name
                <input type="text" value={props.textvalue} onChange={handleChange}  />
                </label>
                <input className="button" type="submit" value="Submit" />
          </form>
           
      
        </Modal>
     </>
    );
}