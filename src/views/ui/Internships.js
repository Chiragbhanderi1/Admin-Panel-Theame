import React, { useEffect,useState } from 'react'
import Blog from "../../components/dashboard/Blog";
import {
  Card,
  Row,
  Col, 
  CardTitle,
  CardBody,  
  Button,
  Form,
  FormGroup,
  Table,
  Label,
  Input,
  FormText
} from "reactstrap";
import { useNavigate } from 'react-router-dom';
const Internships = () => {
  const Navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [update,setUpdate] = useState(false)
  const [loading,setLoading]=useState(false)
  // eslint-disable-next-line
  const [faqArray,setFaqArray]=useState([]);
  const [detailsData,setdetailsData] = useState({
    location:"",
    exp:"",
    duration:"",
    know:"",
    mode:"",
    stippend:""
  })
  const [selectedImg, setSelectedImg] = useState(null);
  const [internshipData, setInternshipData] = useState({
    // id: "",
    title: "",
    subtitle:"",
    details:detailsData,
    perks:"",
    img:"",
    faq:{}
  });
  const [faqData, setFaqData] = useState({
    question:"",
    answer:""
  });
  const handleFaqData=(e)=>{
    setFaqData({
      ...faqData,
      [e.target.name]: e.target.value,
    });
  };
  const addFaqs=()=>{
    try{
      faqArray.push(faqData);
      setFaqData({
        answer:"",
        question:""
      }) 
      setInternshipData({...internshipData,faqs:faqArray});
    }catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    if(!localStorage.getItem('name')){
      Navigate("/login")
    }
    // Fetch all internships from the API
    fetch("https://api-cnn5jio2q-chiragbhanderi1.vercel.app/getinternships")
      .then((res) => res.json())
      .then((data) =>{setInternships(data)})
      .catch((err) => console.log(err));
      // eslint-disable-next-line
  }, []);
  const handleInputChange = (e) => {
    setInternshipData({
      ...internshipData,
      [e.target.name]: e.target.value,
    });
  };
  const handleDetailsChange = (e) => {
    setdetailsData({
      ...detailsData,
      [e.target.name]:e.target.value
    });
    setInternshipData({
      ...internshipData,
      details:detailsData
    })
  };
  const handleBlur = (e)=>{
    setdetailsData({
      ...detailsData,
      [e.target.name]:e.target.value
    });
    setInternshipData({
      ...internshipData,
      details:detailsData
    })
  };
  const handleImageUpload = (e)=>{
    setSelectedImg(e.target.files[0]);
  }
  const uploadImg = async()=>{
    setLoading(true)
    const formData = new FormData();
    formData.append("file", selectedImg);
    const res = await  fetch("https://api-cnn5jio2q-chiragbhanderi1.vercel.app/fileinternship",{
      method:"POST",
      body:formData
    })
     console.log(res);
      const json = await res.json()
      const downloadUrl = await json.downloadUrl;
      setInternshipData({
        ...internshipData,
        img:downloadUrl
      })
      console.log("done");
      setLoading(false)
  }
  const handleAddInternship = async (e) => {
    e.preventDefault();
    // Add the internship to the database with the download URLs of the files
    fetch("https://api-cnn5jio2q-chiragbhanderi1.vercel.app/internships", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(internshipData),
    })
      .then((res) => {res.json()})
      .then((data) => {
        setUpdate(false);
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch((err) => console.log(err));
  };
  const handleDeleteInternship = (id) => {
    // Send a DELETE request to the API to delete the internship with the given ID
    fetch(`https://api-cnn5jio2q-chiragbhanderi1.vercel.app/deleteinternship/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setInternships(internships.filter((internship) => internship.title !== id));
      })
      .catch((err) => console.log(err)); 
  };
  const handleMore =(id)=>{
    Navigate(`/internships/${id}`)
  }
  const handleUpdateInternship = (e) => {
   try{ 
     e.preventDefault();
     // Send a PUT request to the API to update the internship with the given ID
     fetch(`https://api-cnn5jio2q-chiragbhanderi1.vercel.app/updateinternship/${internshipData.title}`, {
       method: "PUT",
       headers: {
         "Content-Type": "application/json",
        },
        body: JSON.stringify(internshipData),
      })
      .then((res) =>{ 
        if(Response.status ===200){
          res.json()
          console.log("done")
        }
      })
      .then((data) => {
        setUpdate(false);
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch((err) => console.log(err));
    }catch(error){console.log(error)}
  };
  const handleEditInternship = (internship) => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    setdetailsData({
      duration:internship.details.duration,
      location:internship.details.location,
      exp:internship.details.exp,
      know:internship.details.know,
      mode:internship.details.mode,
      stippend:internship.details.stippend
    })
    setInternshipData({
      title: internship.title,
      subtitle: internship.subtitle,
      perks: internship.perks,
      details:{
        duration:internship.details.duration,
        location:internship.details.location,
        exp:internship.details.exp,
        know:internship.details.know,
        mode:internship.details.mode,
        stippend:internship.details.stippend
      }
    });
    setUpdate(true);
  };
  return (
    <div>
     <Row>
      <Col>
        <Card>
          <CardTitle tag="h4" className="text-center border-bottom p-3 mb-0">
            <i className="bi bi-bullseye me-2"> </i>
            Internships
          </CardTitle>
          <CardTitle tag="h6" className=" p-3 mb-0">
            <i className="bi bi-plus me-2"> </i>
            Add Internships
          </CardTitle>
          <CardBody>
            <Form onSubmit={update ? handleUpdateInternship:handleAddInternship}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={internshipData.title}
                  readOnly={update}
                  onChange={handleInputChange}
                  placeholder="Title for a Internship"
                  // onFocus={this.placeholder=""}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="subtitle">SubTitle</Label>
                <Input
                  id="subtitle"
                  name="subtitle"
                  value={internshipData.subtitle}
                  onChange={handleInputChange}
                  placeholder="SubTitle"
                  type="text"
                />
              </FormGroup>
              <p className='border-top'>Details</p>
              <FormGroup className='border-bottom pb-3'>
                <FormGroup>
                  <Label for="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={detailsData.location}
                      onBlur={handleBlur}
                      onChange={handleDetailsChange}
                      placeholder="Location of Internship"
                      type="text"
                    />
                </FormGroup>
                <FormGroup>
                  <Label for="duration">Duration</Label>
                    <Input
                      id="duration"
                      name="duration"
                      value={detailsData.duration}
                      onBlur={handleBlur}
                      onChange={handleDetailsChange}
                      placeholder="Duration of Internship"
                      type="text"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="duration">Mode</Label>
                    <Input
                        id="mode"
                        name="mode"
                        value={detailsData.mode}
                        onBlur={handleBlur}
                        onChange={handleDetailsChange}
                        type="select"
                      >
                        <option defaultValue={this} value={"Online"}>Online</option>
                        <option value={"Offline"}>Offline</option>
                        <option value={"Hybrid"}>Hybrid</option>
                      </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="duration">Stippend</Label>
                    <Input
                      id="stippend"
                      name="stippend"
                      value={detailsData.stippend}
                      onBlur={handleBlur}
                      onChange={handleDetailsChange}
                      placeholder="Stippend of Internship"
                      type="text"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exp">Experience Required</Label>
                    <Input
                      id="exp"
                      name="exp"
                      value={detailsData.exp}
                      onBlur={handleBlur}
                      onChange={handleDetailsChange}
                      placeholder="Experience required Internship"
                      type="text"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="know">Prerequisite</Label>
                    <Input
                      id="know"
                      name="know"
                      value={detailsData.know}
                      onBlur={handleBlur}
                      onChange={handleDetailsChange}
                      placeholder="Prerequisite for Internship"
                      type="text"
                    />
                </FormGroup>
              </FormGroup>  
              <FormGroup>
                <Label for="perks">Perks</Label>
                <Input
                  id="perks"
                  name="perks"
                  value={internshipData.perks}
                  onChange={handleInputChange}
                  placeholder="Perks in form paragraph could contain html tags"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="img">Image</Label>
                <div className='d-flex'>
                <Input id="img" name="img" type="file" onChange={handleImageUpload}/>
                <Button onClick={uploadImg} className='ms-2'>Upload</Button>
                </div>
                <FormText>
                  {loading && <p className='text-danger'>Please Wait Image is Been Uploading</p>}
                  You Must Wait Unit Image is been Uploaded
                </FormText>
              </FormGroup>
              {!update &&<FormGroup style={{backgroundColor:"#ededed"}} className="rounded p-3">
                <h6>FAQs</h6>                
                <Label for="question">Question</Label>
                <Input id="question" name="question"  type="text" value={faqData.question} onChange={handleFaqData}/>               
                <Label for="answer">Answer</Label>
                <Input id="answer" name="answer"  type="text" value={faqData.answer} onChange={handleFaqData}/>               
                <Button onClick={addFaqs}  className="mt-2">Add</Button>
                { faqArray!=null && faqArray.map((faq,index)=>(
                            <CardBody style={{overflowX:"auto"}}  key={index} >
                            <Table bordered hover>
                              <tbody>                                   
                                <tr >
                                  <th scope="row">{index+1}</th>
                                  <td>{faq.question}</td>
                                  <td>{faq.answer}</td>
                                </tr>                                   
                              </tbody>
                            </Table>                           
                          </CardBody>
                   ))}
              </FormGroup>}
              <Button type='submit' disabled={loading} style={{width:"100%"}}>{update?"Update":"Add"} Internship</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
    <Row>
        {internships.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              image={blg.img}
              title={blg.title}
              subtitle={blg.subtitle}
              text1={blg.details.location}
              text2={blg.details.duration}
              text3={blg.details.stippend}
              text4={blg.details.mode}
              deletebtn ={()=>{handleDeleteInternship(blg.title)}}
              morebtn ={()=>{handleMore(blg.title)}}
              editbtn ={()=>{handleEditInternship(blg)}}
              color="dark"
            /> 
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Internships
