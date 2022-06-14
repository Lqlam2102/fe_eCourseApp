import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { useEffect } from 'react';
import { gsap } from "gsap";

export default function MyInfo(){
    useEffect(() => {
        let typingElement = document.querySelector('.typing');
        typingElement.onclick = (e) =>{
            console.log(e.target.value);
            console.log(2);
            typingElement.classList.remove('animate') ;
            setTimeout(() => typingElement.classList.add('animate'), 1);
        }
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.9
          };
          
          let revealCallback = (entries, self) => {
            entries.forEach((entry) => {
              let container = entry.target;
              let img = entry.target.querySelector("img");
              const easeInOut = "power3.out";
              const revealAnim = gsap.timeline({ ease: easeInOut });
          
              if (entry.isIntersecting) {
                revealAnim.set(container, {
                  visibility: "visible"
                });
                revealAnim.fromTo(
                  container,
                  {
                    clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
                    webkitClipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)"
                  },
                  {
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    webkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    duration: 1,
                    ease: easeInOut
                  }
                );
                revealAnim.from(img, 4, {
                  scale: 1.4,
                  ease: easeInOut,
                  delay: -1
                });
                self.unobserve(entry.target);
              }
            });
          };
          
          let revealObserver = new IntersectionObserver(revealCallback, options);
          
          document.querySelectorAll(".reveal").forEach((reveal) => {
            revealObserver.observe(reveal);
          });
    },[])
    return (
        <>
            <Container mb={4}>
                <Row className="justify-content-md-center"><div className="typing animate"></div></Row>
                <hr style = {{margin:"1rem"}}/>
                <Row>
                    <Col className="mt-lg-5 mb-lg-0 mb-5 col-lg-5 col-md-10 mx-auto col-12">
                    <h6 className = "reveal" style={{opacity:"70%"}}>infomation</h6>
                    <h1 className="mb-4 reveal" style={{fontWeight: 'bold'}}>This website was built by:</h1>
                        <div className = "badge-dark info-web reveal">
                            <strong className="d-block" data-aos="fade-up" data-aos-delay="600">Back-end: Django</strong>
                            <strong className="d-block" data-aos="fade-up" data-aos-delay="600">Front-end: ReactJS + Bootstrap5 + HTML/CSS/JS</strong>
                            <strong className="d-block" data-aos="fade-up" data-aos-delay="600">Using MySQL database to store and retrieve data</strong>
                            
                        </div>
                    </Col>
                    <Col xs={0} className="col-lg-3 col-md-6 col-sm-8 col-12">
                    <div className="team-thumb">
                                    <div className = "container-my-info">

                                        <img src="../img/lql2.jpg" className="img-fluid my-avatar" alt="My Avatar"/>

                                    <div className="info-avatar reveal">
                                        <h3 style={{fontWeight:'bold'}}>Lê Quý Lâm</h3>
                                        <span>Date: 21-02-2001</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <br/>
                <Row className="justify-content-md-center mt-5">
                    <Col xs={3}>
                    <a href="#courses" style ={{textDecoration: "none"}}><button className="button-custom fade-button">View courses</button></a>
                    </Col>
                </Row>
            </Container>
        </>
    )
}