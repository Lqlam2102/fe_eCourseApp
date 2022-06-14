import { useEffect, useState } from "react"
import { Alert, Button, ButtonGroup, Row, Container, Spinner } from "react-bootstrap"
import { useLocation } from "react-router"
import Apis, { endpoints } from "../configs/Apis"
import ECourseCard from '../layouts/ECourseCard'
import MyInfo from "../pages/Info.js"
import { Parallax } from 'react-scroll-parallax';

export default function Home() {
    const [courses, setCourses] = useState([])
    const [prev, setPrev] = useState(false)
    const [next, setNext] = useState(false)
    const [page, setPage] = useState(1)
    const location = useLocation()
    const [status, setStatus] = useState('')


    useEffect(() => {
        
        let loadCourses = async () => {
            let query = location.search
            if (query === "")
            query = `?page=${page}`
            else
            query += `&page=${page}`
            try {
                setStatus(<Spinner style={{margin:"auto"}} animation="border"/>)
                let res = await Apis.get(`${endpoints['courses']}${query}`)
                setCourses(res.data.results)
                setNext(res.data.next !== null)
                setPrev(res.data.previous !== null)
                if (courses.length ===0) {
                    setStatus(<Alert key={'info'} variant={'info'}>
                    Không có khóa học nào.
                </Alert>)
                }
            } catch (err) {
                console.error(err)
                setStatus(<Alert key={'danger'} variant={'danger'}>
                    Không thể tải khóa học!
                </Alert>)
            }
        }

        loadCourses()
        
    }, [location.search, page,courses.length])

    const paging = (inc) => {
        setPage(page + inc)
    }
    return (
        <>
        <div id = "info">
        <div className="animation-wave">
              <div className="waveWrapper waveAnimation" >
                  <div className="waveWrapperInner bgTop">
                  <div className="wave waveTop" style={{backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-top.png')"}}></div>
                  </div>
                  <div className="waveWrapperInner bgMiddle">
                  <div className="wave waveMiddle" style={{backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-mid.png')"}}></div>
                  </div>
                  <div className="waveWrapperInner bgBottom">
                  <div className="wave waveBottom" style={{backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-bot.png')"}}></div>
                  </div>
              </div>
            </div>
            <Parallax  opacity={[2.3,-.2]}>
              <MyInfo/>
              <hr style={{marginTop:"5rem"}} />
          </Parallax>
          <div id ="courses" style={{minHeight:"6rem", backgroundColor:"rgba(219,219,219,.5)"}}></div>

      </div>
      <div style={{backgroundColor:"rgba(219,219,219,.3)"}}>
        <Container style={{minHeight:"800px"}}>
            <h1 className="reveal text-center text-danger" style ={{paddingTop:"1rem"}}>Danh mục khóa học</h1>
            {courses.length !== 0 || status}
            {courses.length !== 0 && <ButtonGroup>
                <Button variant="info" onClick={() => paging(-1)} disabled={!prev}>Pre</Button>
                <Button variant="info" onClick={() => paging(1)} disabled={!next}>Next</Button>
            </ButtonGroup>
            }

            <Row>
                {courses.map(c => <ECourseCard obj={c} key={c.id} />)}
            </Row>
            <br/>
        </Container>
      </div>
        </>
    )
}