import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";
// import { element } from "prop-types";

const SalesChart = (props) => {
  const {events,internships,courses}=props
  let eventStudents = 0;
  events.forEach(element => {
   eventStudents += element.students.length
  });
  let courseStudents =0;
  courses.forEach(element =>{
    courseStudents+= element.students.length
  })
  let internshipsStudents =0;
  internships.forEach(element =>{
    internshipsStudents+= element.students.length
  })
  const chartoptions = {
    series: [
      {
        name: "No. of Students",
        data: [courseStudents, eventStudents, internshipsStudents],
      },  
      {
        name: "No. of Courses/Events/Internship",
        data: [courses.length, events.length, internships.length],
      },
    ],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: true,
      },
      grid: {
        strokeDashArray: 3,
      },

      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        categories: [
          "Courses",
          "Events",
          "Internships"
        ], 
      },
    },
  };
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Sales Summary</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          Yearly Sales Report
        </CardSubtitle>
        <Chart
          type="bar"
          width="100%"
          height="390"
          options={chartoptions.options}
          series={chartoptions.series}
        ></Chart>
      </CardBody>
    </Card>
  );
};

export default SalesChart;
