import React, { useState, useEffect } from 'react';
import Blog from "../../components/dashboard/Blog";
import { useNavigate } from 'react-router-dom';
import {
    Card,
    Row,
    Col,
    CardTitle,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText
  } from "reactstrap";
const Achievements = () => {
    const Navigate =useNavigate();
  const [achievements, setAchievements] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [update,setUpdate] =useState(false)
  const [loading,setLoading] =useState(false)
  const [achievementData, setAchievementData] = useState({
    id:"",
    title: "",
    subtitle: "",
    details: "",
    date: "",
    img:""
  });
    const handleInputChange = (e) => {
        setAchievementData({
          ...achievementData,
          [e.target.name]: e.target.value,
        });
      };
      useEffect(() => {
        if(!localStorage.getItem('name')){
          Navigate("/login")
        }
        // Fetch all achievements from the API
        fetch("https://api-cnn5jio2q-chiragbhanderi1.vercel.app/getachievements")
          .then((res) => res.json())
          .then((data) => {setAchievements(data);console.log(data)})
          .catch((err) => console.log(err));
          // eslint-disable-next-line
      }, []);
      const handleImageUpload = (e)=>{
        setSelectedImg(e.target.files[0]);
      }
      const uploadImg = async()=>{
        setLoading(true)
        const formData = new FormData();
        formData.append("file", selectedImg);
        const res = await  fetch("https://api-cnn5jio2q-chiragbhanderi1.vercel.app/fileevent",{
          method:"POST",
          body:formData
        })
         console.log(res);
          const json = await res.json()
          const downloadUrl = await json.downloadUrl;
          setAchievementData({
            ...achievementData,
            img:downloadUrl
          })
          setLoading(false)
      }
      const handleSubmit = async (e) => {
        e.preventDefault();
        // Add the achievement to the database with the download URLs of the files
        fetch("https://api-cnn5jio2q-chiragbhanderi1.vercel.app/achievements", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(achievementData),
        })
          .then((res) => res.json())
          .then((data) => {
            setUpdate(false);
            // eslint-disable-next-line no-restricted-globals
            location.reload();
          })
          .catch((err) => console.log(err));
      };
      const handleDeleteAchievement = (id) => {
        // Send a DELETE request to the API to delete the achievement with the given ID
        fetch(`https://api-cnn5jio2q-chiragbhanderi1.vercel.app/deleteachievement/${id}`, {
          method: "DELETE",
        })
          .then(() => {
            setAchievements(achievements.filter((achievement) => achievement.id !== id));
          })
          .catch((err) => console.log(err));
      };
      const handleUpdateAchievement = (e) => {
        e.preventDefault();
        // Send a PUT request to the API to update the achievement with the given ID
        fetch(`https://api-cnn5jio2q-chiragbhanderi1.vercel.app/updateachievement/${achievementData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(achievementData),
        })
          .then((res) =>{ 
            if(Response.status ===200){
              res.json()
            }
          })
          .then((data) => {
            setUpdate(false);
            // eslint-disable-next-line no-restricted-globals
            location.reload();
          })
          .catch((err) => console.log(err));
      };
      const handleEditAchievement = (achievement) => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        setAchievementData({
            id:achievement.id,
          title: achievement.title,
          subtitle: achievement.subtitle,
          details: achievement.details,
          date:achievement.date
        });
        setUpdate(true);
      };
  return (
    <div>
              <Row>
        <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bar-chart-fill me-2"> </i>
            Achievements
          </CardTitle>
          <CardTitle tag="h6" className=" p-3 mb-0">
            <i className="bi bi-plus me-2"> </i>
            Add Achievements
          </CardTitle>
          <CardBody>
            <Form onSubmit={update?handleUpdateAchievement:handleSubmit}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Title for a Achievement"
                  value={achievementData.title}
                  onChange={handleInputChange}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="subtitle">SubTitle</Label>
                <Input
                  id="subtitle"
                  name="subtitle"
                  value={achievementData.subtitle}
                  onChange={handleInputChange}
                  placeholder="SubTitle"
                  type="text"
                />
              </FormGroup> 
              <FormGroup>
                <Label for="details">Details</Label>
                <Input
                  id="details"
                  name="details"
                  value={achievementData.details}
                  onChange={handleInputChange}
                  placeholder="Details in form of paragraph"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={achievementData.date}
                  onChange={handleInputChange}
                  // min={new Date().toISOString().split('T')[0]}
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
              <Button type='submit' disabled={loading} style={{width:"100%"}}>{update?"Update":"Add"} Achievement</Button>
            </Form>
          </CardBody>
        </Card>
        </Col>
      </Row>
        <Row>
        {achievements.map((blg, index) => (
          <Col sm="12" lg="12" xl="6" key={index}>
            <Blog
              image={blg.img}
              title={blg.title}
              subtitle={blg.subtitle}
              text1={blg.date}
              text2={blg.details}
              deletebtn ={()=>{handleDeleteAchievement(blg.id)}}
              morebutton = "true"
              editbtn ={()=>{handleEditAchievement(blg)}}
              color="dark"
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Achievements
