import React,{useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
const MyAccount = () => {
  // eslint-disable-next-line
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [admins, setAdmins] = useState([]);    
  const Navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem('name')){
      Navigate("/login")
    }
    // Fetch all internships from the API
    fetch("https://api-flu5fl4i5-chiragbhanderi1.vercel.app/getadmins")
      .then((res) => res.json())
      .then((data) =>{
        data.forEach(element => {
          console.log(element)
          if (element.username===localStorage.getItem('name')) {
            setAdmins(element);
          }
        });
      })
      .catch((err) => console.log(err));
      // eslint-disable-next-line
  }, []);
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (password===confirmpassword) {

      fetch(`https://api-flu5fl4i5-chiragbhanderi1.vercel.app/adminforget`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username:username,password:password}),
    })
      .then((res) =>{ 
        if(res.status ===200){
          alert('Password changed successfully!');
        }
        else if(res.status===404){
          alert('No user found')
        }
        else{
          alert('Internal server occured')
        }
      })
      setPassword('');
      setConfirmpassword('');
    } else {
      alert('Passwords do not match.');
    }
  };

  return (
    <div className="container ">      
      <h3 className='text-center'><i className="bi bi-person-fill-lock me-2"></i>Admin Details</h3>
      <div className="card mb-4">
        <div className="card-body">
          <h4 className="card-title">Name: {admins.name}</h4>
          <h4 className="card-text">Username: {admins.username}</h4>
          <h4 className="card-text">Contact: {admins.contact}</h4>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Change Password</h3>
          <Form onSubmit={handleChangePassword}>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" id="password" className="form-control form-control-lg" required value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password" />
              </FormGroup>
              <FormGroup>
                <Label for="cpassword">Confirm Password</Label>
                <Input type="password" id="cpassword" className="form-control form-control-lg" required value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)}
                  placeholder="Confirm password" />
              </FormGroup>
            <Button type="submit" className="btn btn-primary">Change Password</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default MyAccount
