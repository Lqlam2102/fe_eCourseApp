import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faGithub , faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'


library.add(faCheckCircle)


export default function Footer() {
    return (
        <>
         <footer className="site-footer" style={{padding: '6rem'}}>
            <div className="container">
                <div className="row">
                <div className="col-sm-12 col-md-6">
                    <h6>About</h6>
                    <p className="text-justify">Page <i>ECourseApp </i> is an initiative  to help the upcoming programmers with the code. EcourseApp is focuses on providing the most efficient code or snippets as the code wants to be simple. We will help programmers build up concepts in different programming languages that include C, C++, Java, HTML, CSS, Bootstrap, JavaScript, PHP, Android, SQL and MySQL.</p>
                </div>

                <div className="col-xs-6 col-md-3">
                    <h6>Categories</h6>
                    <ul className="footer-links">
                    <li><a href="https://www.python.org/">Python</a></li>
                    <li><a href="https://www.djangoproject.com/start/">Django</a></li>
                    <li><a href="https://reactjs.org/">ReactJs</a></li>
                    <li><a href="https://getbootstrap.com/">Bootstrap</a></li>
                    <li><a href="https://www.free-css.com/assets/files/free-css-templates/preview/page273/gymso-fitness/">Templates</a></li>
                    </ul>
                </div>

                <div className="col-xs-6 col-md-3">
                    <h6>Quick Links</h6>
                    <ul className="footer-links">
                    <li><a href="https://www.facebook.com/lq.lam21/">About me</a></li>
                    <li><a href="https://www.facebook.com/lq.lam21/">Contact me</a></li>
                    <li><a href="https://www.facebook.com/lq.lam21/">Contribute</a></li>
                    <li><a href="https://www.facebook.com/lq.lam21/">Privacy Policy</a></li>
                    <li><a href="https://www.facebook.com/lq.lam21/">Sitemap</a></li>
                    </ul>
                </div>
                </div>
                <hr/>
            </div>
            <div className="container">
                <div className="row">
                <div className="col-md-8 col-sm-6 col-xs-12">
                    <p className="copyright-text">Published &copy; 2022 by Lê Quý Lâm
                    </p>
                </div>

                <div className="col-md-4 col-sm-6 col-xs-12">
                    <ul className="social-icons">
                    <li><a className="facebook" href="https://www.facebook.com/lq.lam21/"><FontAwesomeIcon icon={faFacebookF}/></a></li>
                    <li><a className="github" href="https://github.com/Lqlam2102/"><FontAwesomeIcon icon={faGithub}/></a></li>
                    <li><a className="instagram" href="https://www.instagram.com/_lqlam21/"><FontAwesomeIcon icon={faInstagram}/></a></li>
                    <li><a className="tiktok" href="https://www.tiktok.com/"><FontAwesomeIcon icon={faTiktok}/></a></li>
                    </ul>
                </div>
                </div>
            </div>
        </footer>
        </>
    )
}