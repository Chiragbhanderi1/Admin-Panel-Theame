import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";


const Feeds = (props) => {
  const users = props.users;
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Users</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          New Users
        </CardSubtitle>
        <ListGroup flush className="mt-4">
          {users.map((feed, index) =>  index < 6 &&(
            <ListGroupItem
              key={index}
              action
              href="/"
              tag="a"
              className="d-flex align-items-center p-3 border-0"
            >
              <Button
                className="rounded-circle me-3"
                size="sm"
                color="black"
              >
                <i className="bi bi-person"></i>
              </Button>
              {feed.email}
              <small className="ms-auto text-muted text-small">
                {feed.created_on}
              </small>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default Feeds;
