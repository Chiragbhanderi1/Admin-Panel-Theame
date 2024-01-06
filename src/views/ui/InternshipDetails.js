import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,Input,Label,FormGroup} from 'reactstrap';
const InternshipDetails = () => {
  const [internships, setInternships] = useState([]);
  const [student,setStudent] = useState([])
  const [perks,setPerks] = useState([])
  const [detailsData,setdetailsData] = useState({ 
    location:"",
    exp:"",
    duration:"",
    know:"", 
    mode:"",
    stippend:""
  })
  const [faqData ,setFaqData] = useState({
    answer:"",
    question:""
  });
  const [showaddFaqModal, setShowaddFaqModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [faqs,setFaqs] = useState([])
  const { internshipslug } = useParams(); 
  const Navigate =useNavigate();
  const handleFaqClick = (faq) => {
    setFaqData(faq);
    setShowFaqModal(!showFaqModal);
  };
  const deleteFaq =(id)=>{
    fetch(`https://api-cnn5jio2q-chiragbhanderi1.vercel.app/deleteinternshipdata/${internships.title}/faqs/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      setFaqs(faqs.filter((faq) => faq.id !== id));
    })
    .catch((err) => console.log(err));
  };
  const updateFaq =(e)=>{
    setFaqData({
      ...faqData,
      [e.target.name] : e.target.value
    })
  }
  const editFaq =()=>{
    try{        
      // Send a PUT request to the API to update the internship with the given ID
      fetch(`https://api-cnn5jio2q-chiragbhanderi1.vercel.app/updateinternshipdata/${internships.title}/faqs/${faqData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(faqData),
      })
        .then((res) =>{ 
          if(Response.status ===200){
            res.json()
          }
        })
        .then((data) => {
          setShowFaqModal(!showFaqModal);
          setFaqData({
            question:"",
            answer:""
          })
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        })
        .catch((err) => console.log(err));
      }catch(error){alert(error)}
    }
  const addfaqs =(e)=>{
    // Add the course to the database with the download URLs of the files
    fetch(`https://api-cnn5jio2q-chiragbhanderi1.vercel.app/addinternshipdata/${internships.title}/faqs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(faqData),
    })
      .then((res) => {res.json()})
      .then((data) => {
        setShowaddFaqModal(!showaddFaqModal);
        faqs.push(faqData);
        setFaqData({
          question:"",
          answer:""
        })
        // eslint-disable-next-line no-restricted-globals
        // location.reload();
      })
      .catch((err) => console.log(err));
    };
  useEffect(()=>{
    if(!localStorage.getItem('name')){
      Navigate("/login")
    }
    // Fetch all internships from the API
    fetch(`https://api-cnn5jio2q-chiragbhanderi1.vercel.app/getinternship/${internshipslug}`)
    .then((res) => res.json())
    .then((data) =>{
      setInternships(data)
      setStudent(data.students)
      setFaqs(data.faqs);
      setPerks((data.perks || "").split("*"))
      setdetailsData({
        location:data.details.location,
        duration:data.details.duration,
        exp:data.details.exp,
        mode:data.details.mode,
        stippend:data.details.stippend ,
        know:data.details.know,
      })
    })
    .catch((err) => console.log(err));
    // eslint-disable-next-line
  },[])
  return (
    <div>
        <div className="container bg-white p-5">
            <h2 className="text-center border-bottom mb-3">{internships.title}</h2>
            <div className="row">
              <div className="col-md">
                <h5 className="text-center">{internships.subtitle}</h5>
                <h5 className="mt-3">Details :</h5>
                <ul className="list-group">
                    <li className="list-group-item"><b>Duration :</b>{detailsData.duration}</li>
                    <li className="list-group-item"><b>Location :</b>{detailsData.location}</li>
                    <li className="list-group-item"><b>Experience Req. :</b>{detailsData.exp}</li>
                    <li className="list-group-item"><b>Mode : </b>{detailsData.mode}</li>
                    <li className="list-group-item"><b>Stippend :</b> {detailsData.stippend}</li>
                  </ul>
                <h5 className="mt-3">Perks :</h5>
                <div >
                        <p dangerouslySetInnerHTML={{__html:perks}}></p>               
                </div>
              </div>
              <div className="col-md" >
                <img
                  src={`${internships.img}`}
                  alt="Blog "
                  className="img-fluid mx-auto d-block"
                />
              </div>
            </div>
            <h1 className="text-center mt-4"> FAQs</h1>
            <div style={{backgroundColor:"#fff"}} >
            <Button className="float-end p-2 mb-3" style={{width:"max-content"}}  onClick={()=>{setShowaddFaqModal(!showaddFaqModal)}}>
              <i className="bi bi-plus me-2"> </i>
              Add Questions
            </Button>
            </div>
            <div className="rounded mt-2" style={{backgroundColor:"#ededed"}}>
          {(!Array.isArray(faqs) || faqs.length ===0 )&& <div> No Questions to show</div>}
         <div className="accordion" id="accordionExample">
          {Array.isArray(faqs) && faqs.map((faq,index)=>{
             return  <div className="accordion-item" key={index}>
               <h2 className="accordion-header" id={`heading${index}`}>
                 <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                  Question {index+1}: {faq.question}
                  <i onClick={()=>{deleteFaq(faq.id)}}  className="bi bi-trash bg-dark text-white p-2 ms-4  rounded " role="button" > </i>
                  <i className="bi bi-pencil-square bg-dark text-white p-2 m-1 rounded " onClick={()=>{handleFaqClick(faq)}} role="button" > </i>
                 </button>
               </h2>
               <div id={`collapse${index}`} className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                 <div className="accordion-body">
                  Answer : {faq.answer}
                 </div>
               </div>
             </div>
          })}  
           </div>
           </div>

          <Modal isOpen={showFaqModal} toggle={handleFaqClick}>
            <ModalHeader toggle={handleFaqClick}>Update Question</ModalHeader>
            <ModalBody>
              <FormGroup className="mt-2">
                <Label for="question">Question</Label>
                <Input id="question" name="question" type="text" value={faqData.question} onChange={updateFaq}/>
              </FormGroup>
              <FormGroup className="mt-2">
                <Label for="answer">Answer</Label>
                <Input id="answer" name="answer" type="text" value={faqData.answer} onChange={updateFaq}/>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="dark" onClick={()=>{editFaq()}}>
                Update
              </Button>
              <Button color="secondary" onClick={handleFaqClick}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={showaddFaqModal} toggle={()=>{setShowaddFaqModal(!showaddFaqModal);}}>
            <ModalHeader toggle={()=>{setShowaddFaqModal(!showaddFaqModal);}}>Add Question</ModalHeader>
            <ModalBody>
              <FormGroup className="mt-2">
                <Label for="question">Question</Label>
                <Input id="question" name="question"  type="text" onChange={updateFaq} />
              </FormGroup>
              <FormGroup className="mt-2">
                <Label for="answer">Answer</Label>
                <Input id="answer" name="answer"  type="text" onChange={updateFaq} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="dark"  onClick={()=>{addfaqs()}}>
                Add
              </Button>{' '}
              <Button color="secondary" onClick={()=>{setShowaddFaqModal(!showaddFaqModal);}}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        <div className="row">
          <div className="col-md justify-content-center">
            <h1 className="text-center"> Students Enrolled</h1>
            {student.length===0 && <div className="text-center">No Students Have Enrolled Yet.</div>}
            <h5>Total No. of Students Enrolled :{student.length}</h5>
            {student.map((item)=>(
              <div>
              <ul class="list-group">
                <li class="list-group-item">{item}</li>
              </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InternshipDetails
