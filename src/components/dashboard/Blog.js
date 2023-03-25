import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";

const Blog = (props) => {
  return (
    <Card>
      <CardImg alt="Card image cap" src={props.image} />
      <CardBody className="p-4">
        <CardTitle tag="h5">{props.title}</CardTitle>
        <CardSubtitle>{props.subtitle}</CardSubtitle>
        <CardText className="mt-3">{props.text1}</CardText>
        <CardText className="mt-3">{props.text2}</CardText>
        <CardText className="mt-3">{props.text3}</CardText>
        <CardText className="mt-3">{props.text4}</CardText>
        <Button onClick={props.editbtn} color={props.color}>Edit</Button>
        <Button onClick={props.deletebtn} color={props.color} className="ms-2">Delete</Button>
        <Button onClick={props.morebtn} color={props.color} className="ms-2">More</Button>
      </CardBody>
    </Card>
  );
};

export default Blog;