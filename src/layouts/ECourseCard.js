import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export default function ECourseCard(props) {
    let path = `/courses/${props.obj.id}/lessons/`
    if (props.type === "lesson")
      path = `/lessons/${props.obj.id}`
    return (
      <Col md={5} xs={12} lg ={4}>
        <Link to={path}>
          <figure className="snip1369 green">
            <img src={props.obj.image} alt="pr-sample15" />
            <div className="image"><img src={props.obj.image} alt="pr-sample15" /></div>
            <figcaption>
              <h3>{props.obj.subject}</h3>
              <p>{props.obj.description}</p>
            </figcaption><span className="read-more">
              
              Read More <FontAwesomeIcon icon={faArrowAltCircleRight}/></span>

          </figure>
        </Link>
      </Col>

    )
}