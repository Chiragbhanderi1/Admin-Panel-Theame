import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  CardImg,
  Button,
} from "reactstrap";

const Blog = (props) => {
  return (
    <Card>
      <CardImg alt="Card image cap" src={props.image} />
      <CardBody className="p-4">
        <CardTitle tag="h5">{props.title}</CardTitle>
        <CardSubtitle>{props.subtitle}</CardSubtitle>
        <CardText className="mt-3" dangerouslySetInnerHTML={{__html:props.text1}}></CardText>
        <CardText className="mt-3" dangerouslySetInnerHTML={{__html:props.text2}}></CardText>
        <CardText className="mt-3">{props.text3}</CardText>
        <CardText className="mt-3">{props.text4}</CardText>
        <div className="text-center">
        {props.button !=="true" &&<Button onClick={props.editbtn}  color={props.color} className="mt-1">Edit</Button>}
        {props.button !=="true" &&<Button onClick={props.deletebtn} color={props.color} className="ms-2 mt-1">Delete</Button>}
        {props.button !=="true" &&<Button onClick={props.morebtn} color={props.color} className="ms-2  mt-1">More</Button>}</div>
      </CardBody>
    </Card>
  );
};

export default Blog;
