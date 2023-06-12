import React from 'react'
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    Row, 
    Col,
    Table,
    CardTitle,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText
  } from "reactstrap";

const Banner = () => {
    const [banners, setBanners] = useState([]);
    const [selectedImg, setSelectedImg] = useState(null);
    const [selectedImgMob, setSelectedImgMob] = useState(null);
    const [update,setUpdate] =useState(false)
    const [loading,setLoading] =useState(false)
    const [bannerData, setBannerData] = useState({
      title: "",
      subtitle: "",
      type:"",
      imgDesk:"",
      imgMob:""
    });
    const handleInputChange = (e) => {
      setBannerData({
        ...bannerData,
        [e.target.name]: e.target.value,
      });
    };
    const Navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem('name')){
          Navigate("/login")
        }
        // Fetch all internships from the API
        fetch("https://api-flu5fl4i5-chiragbhanderi1.vercel.app/getbanners")
          .then((res) => res.json())
          .then((data) =>{setBanners(data);console.log(banners) })
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
        const res = await  fetch("https://api-flu5fl4i5-chiragbhanderi1.vercel.app/fileevent",{
          method:"POST",
          body:formData
        })
          const json = await res.json()
          const downloadUrl = await json.downloadUrl;
          setBannerData({
            ...bannerData,
            imgDesk:downloadUrl
          })
          setLoading(false)
      }
      const handleImageMobileUpload = (e)=>{
        setSelectedImgMob(e.target.files[0]);
      }
      const uploadImgMobile = async()=>{
        setLoading(true)
        const formData = new FormData();
        formData.append("file", selectedImgMob);
        const res = await  fetch("https://api-flu5fl4i5-chiragbhanderi1.vercel.app/fileevent",{
          method:"POST",
          body:formData
        })
          const json = await res.json()
          const downloadUrl = await json.downloadUrl;
          setBannerData({
            ...bannerData,
            imgMob:downloadUrl
          })
          setLoading(false)
      }
      const handleSubmit = async (e) => {
        e.preventDefault();
        // Add the banner to the database with the download URLs of the files
        fetch("https://api-flu5fl4i5-chiragbhanderi1.vercel.app/banners", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bannerData),
        })
          .then((res) => res.json())
          .then((data) => {
            setUpdate(false);
            // eslint-disable-next-line no-restricted-globals
            location.reload();
          })
          .catch((err) => console.log(err));
      };
      const handleDeleteBanner = (id) => {
        // Send a DELETE request to the API to delete the banner with the given ID
        fetch(`https://api-flu5fl4i5-chiragbhanderi1.vercel.app/deletebanner/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            setBanners(banners.filter((banner) => banner.id !== id));
            console.log(res)
          })
          .catch((err) => console.log(err));
      };
      const handleUpdateBanner = (e) => {
        e.preventDefault();
        // Send a PUT request to the API to update the banner with the given ID
        fetch(`https://api-flu5fl4i5-chiragbhanderi1.vercel.app/updatebanner/${bannerData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bannerData),
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
      const handleEditBanner = (banner) => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        setBannerData({
          id:banner.id,
          title: banner.title,
          subtitle: banner.subtitle,
          type:banner.type
        });
        setUpdate(true);
      };
  return (
 <div>
    <Row>
      <Col lg="12">
      <Card className='container'>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-kanban me-2"> </i>
          Banners
        </CardTitle>
        <Form onSubmit={update?handleUpdateBanner:handleSubmit}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Title for a Banner"
                  value={bannerData.title}
                  onChange={handleInputChange}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="subtitle">SubTitle</Label>
                <Input
                  id="subtitle"
                  name="subtitle"
                  value={bannerData.subtitle}
                  onChange={handleInputChange}
                  placeholder="SubTitle"
                  type="text"
                />
              </FormGroup> 
              <FormGroup>
                <Label for="type">Type</Label>
                <Input
                  id="type"
                  name="type"
                  value={bannerData.type}
                  onChange={handleInputChange}
                  type="select"
                > 
                <option disabled>Select Banner Type</option>
                <option  value={"Courses"}>For Courses</option>
                <option value={"Events"}>For Events</option>
                </Input>
              </FormGroup> 
              <FormGroup>
                <Label for="imgDesk">Desktop Image</Label>
                <div className='d-flex'>
                <Input id="imgDesk" name="imgDesk" type="file" onChange={handleImageUpload}/>
                <Button onClick={uploadImg} className='ms-2'>Upload</Button>
                </div>
                <FormText>
                  You Must Wait Unit Image is been Uploaded
                </FormText>
              </FormGroup>
              <FormGroup>
                <Label for="imgMob">Mobile Image</Label>
                <div className='d-flex'>
                <Input id="imgMob" name="imgMob" type="file" onChange={handleImageMobileUpload}/>
                <Button onClick={uploadImgMobile} className='ms-2'>Upload</Button>
                </div>
                <FormText>
                  You Must Wait Unit Image is been Uploaded
                </FormText>
              </FormGroup>
              <Button type='submit' disabled={loading} style={{width:"100%"}}>{update?"Update":"Add"} Banner</Button>
            </Form>
        <CardBody style={{overflowX:"auto"}}>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Desk Image</th>
                <th>Mobile Image</th>
                <th>Title</th>
                <th>Subtitle</th>
                <th>Type</th>
                <th><i className="bi bi-pen me-2"> </i></th>
                <th><i className="bi bi-trash me-2"> </i></th>
              </tr>
            </thead>
            <tbody>
                  {banners.map((banner,index)=>(
              <tr key={index} onClick={() => {}}>
                <th scope="row">{index+1}</th>
                <td><a href={banner.imgDesk}><img src={banner.imgDesk} alt='banner' height={"100px"} width={"200px"} /></a></td>
                <td><a href={banner.imgMob}><img src={banner.imgMob} alt='banner' height={"100px"} width={"200px"} /></a></td>
                <td>{banner.title}</td>
                <td>{banner.subtitle}</td>
                <td>{banner.type}</td>
                <td ><Button onClick={()=>{handleEditBanner(banner)}}>Edit</Button></td>
                <td ><Button onClick={()=>{handleDeleteBanner(banner.id)}}>Delete</Button></td>
              </tr>
                   ))} 
            </tbody>
          </Table>
         
        </CardBody>
      </Card>
      </Col>
    </Row>
  </div>
  )
}

export default Banner
