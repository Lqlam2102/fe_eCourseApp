import { useEffect, useState } from "react"
import { Row, Container, Spinner, Alert } from "react-bootstrap"
import { useParams } from "react-router"
import Apis, { endpoints } from "../configs/Apis"
import ECourseCard from "../layouts/ECourseCard"


export default function Lesson() {
    const [lessons, setLessons] = useState([])
    const { courseId } = useParams()
    const [status, setStatus] = useState('')
    useEffect(() => {
        setStatus(<Spinner style={{margin:"auto"}} animation="border"/>)

        let loadLesson = async () => {
            try {
                
                let res = await Apis.get(endpoints['lessons'](courseId))
                setLessons(res.data)
                if (lessons.length <=0) {
                    setStatus(<Alert key={'info'} variant={'info'}>
                    Không có bài học nào.
                </Alert>)
                }
            } catch (err) {
                console.error(err)
                setStatus(<Alert key={'danger'} variant={'danger'}>
                    Không thể tải bài học!
                </Alert>)
            }
        }

        loadLesson()
    }, [courseId,lessons.length])


    return (
        <>
        <div style={{backgroundColor:"rgba(219,219,219,.2)"}}>
            <Container style={{minHeight:"800px"}} >
            <h1 className="text-center text-danger"style={{marginTop:"1rem"}}>Danh sách các bài học</h1>
            <Row>
                {lessons.length !== 0 || status}
                {lessons.map(l => <ECourseCard obj={l} type="lesson" key = {l.id}/>)}
            </Row>
            </Container>
        </div>
        </>
    )   
}