import React from 'react';
import { Row, Col, CardTitle, Button, CardSubtitle } from 'reactstrap';
import ComponentCard from '../components/ComponentCard';


const About = () => {
  const features = [
    {
      title: 'Create a Perfect Envirment Our Coding and Other Development',
      desc: 'Create React App is a tool that gives you a massive head start when building React apps.',
      icon: 'bi-vinyl',
    },
    {
      title: 'Internships',
      desc: 'Hooks are functions that let you “hook into” React state and lifecycle features from function components.',
      icon: 'bi-umbrella',
    },
    {
      title: 'Courses at low cost',
      desc: 'It is isomorphic authorization JavaScript library which restricts what resources a given client is allowed to access.',
      icon: 'bi-book',
    },
    {
      title: 'Hackathon Preprations',
      desc: 'This theme comes with built-in light & dark layouts, select as per your preference.',
      icon: 'bi-brush',
    },
    {
      title: 'Managing Websites',
      desc: 'Beautifully crafted, clean & modern designed admin theme with 5 different demos & light - dark versions.',
      icon: 'bi-gear',
    },
    {
      title: 'Co-Cirular Activities',
      desc: 'Carefully crafted, clean, smart & easy theme navigation with collapsible option.',
      icon: 'bi-bar-chart',
    },
    {
      title: 'Creativity',
      desc: 'Unlimited color options allows you to set your application color as per your branding.',
      icon: 'bi-droplet-half',
    },
    {
      title: 'Team Work',
      desc: 'To avoid winding up with a large bundle, it’s good to get ahead of the problem and use "Code Splitting".',
      icon: 'bi-file-code',
    },
    {
      title: 'Continuous Updates',
      desc: 'Regular updates with new demos and features is guaranteed',
      icon: 'bi-bag-check',
    },
    {
      title: 'Quality Code',
      desc: 'We follow the best industry code structure that all developers will be able to pick up easily and fall in love',
      icon: 'bi-stars',
    },
    {
      title: 'Support',
      desc: 'Premium customer support from the actual people who have created.',
      icon: 'bi-person-check',
    },
  ];
  return (
    <Row>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <ComponentCard
          title="Techno It Hub"
          subtitle={
            <p className='fs-5'>
             Our Aim is to associate students with industries.
             Make Students all rounder and industry material.
             Develop them strongly in terms of technical knowledge.
             <br/>
             Quality education at the most affordable rates.
             Opportunities in technical as well as non-technical fields. 
              Mentoring the young generation.
            </p>
          }
        >
          
          <Row>
            <Col lg="8">
              <div className="mt-3">
                <Button
                  color="primary"
                  href="https://www.wrappixel.com/templates/xtreme-react-redux-admin/?ref=33"
                  target="_blank"
                >
                 <a className='text-white text-decoration-none' href='https://technoithub.in/'> Visit Now</a>
                </Button>
              </div>
            </Col>
          </Row>
        </ComponentCard>
        <ComponentCard title="Features">
          <Row>
            {features.map((feature) => (
              <Col lg="4" className="mb-5 pb-3" key={feature.title}>
                <div>
                  <i className={`bi ${feature.icon} text-primary fs-2`} />

                  <CardTitle tag="h4" className="my-3">
                    {feature.title}
                  </CardTitle>
                  <CardSubtitle className="text-muted col-10">{feature.desc}</CardSubtitle>
                </div>
              </Col>
            ))}
          </Row>
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default About;
