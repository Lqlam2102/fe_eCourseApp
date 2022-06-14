import { useEffect, useState } from "react"
import { Badge, Col, Row, Spinner, Image, Container } from "react-bootstrap"
import Moment from "react-moment"
import { useSelector } from "react-redux"
import { useParams, useLocation } from "react-router"
import { Link } from "react-router-dom"
import Apis, { endpoints } from "../configs/Apis"
import cookies from 'react-cookies'
import Rating from "react-rating"

export default function LessonDetail() {
    const location = useLocation()
    const [lesson, setLesson] = useState(null)
    const [view, setView] = useState('')
    const [comments, setComments] = useState([])
    const [commentContent, setCommentContent] = useState(undefined)
    const [rating, setRating] = useState(0)
    // const [changed, setChanged] = useState(1)
    let { lessonId } = useParams()
    const [next, setNext] = useState(false)
    const [page, setPage] = useState(1)
    let user = useSelector(state => state.user.user)
    const paging = (inc) => {
        setPage(page + inc)
    }
    const loadAllPages = async () =>{
        for (let i = 1; i <= page; i++)
                {
                    let query = `?page=${i}`
                    let res = await Apis.get(`${endpoints['comments'](lessonId)}${query}`)
                    if (i===1){
                        setComments(res.data.results)
                        setNext(res.data.next !== null)
                    }
                    else{
                        setComments((c)=>{
                            return [...c,...res.data.results]
                        })
                        setNext(res.data.next !== null)
                    }
                }
    }
    useEffect(() => {
        let loadLesson = async () => {
            try {
                let res = await Apis.get(endpoints["lesson-detail"](lessonId), {
                    headers: {
                        "Authorization": `Bearer ${cookies.load("access_token")}`
                    }
                })
                setLesson(res.data)
                setRating(res.data.rate)
            } catch (err) {
                console.error(err)
            }
        }

        let loadComments = async () => {
            let query = `?page=${page}`
            try {
                // for (let i = 1; i <= page; i++)
                // {
                //     let query = `?page=${i}`
                //     let res = await Apis.get(`${endpoints['comments'](lessonId)}${query}`)
                //     if (i===1){
                //         setComments(res.data.results)
                //         setNext(res.data.next !== null)
                //     }
                //     else{
                //         setComments((c)=>{
                //             return [...c,...res.data.results]
                //         })
                //         setNext(res.data.next !== null)
                //     }
                // }
                let res = await Apis.get(`${endpoints['comments'](lessonId)}${query}`)
                setComments((c)=>{
                    return [...c,...res.data.results]
                })      
                setNext(res.data.next !== null)            
            } catch (err) {
                console.error(err)
            }
        }
        let loadView = async () => {
            try {
                let res = await Apis.get(endpoints['lesson-view'](lessonId))
                setView(res.data.view)
            } catch (err) {
                console.error(err)
            }
        }
        loadView()
        loadLesson()
        loadComments()
    }, [lessonId,page])


    const addComment = async (event) => {
        event.preventDefault()

        try {
            let res = await Apis.post(endpoints['add-comment'](lessonId), {
                "content": commentContent
            }, {
                headers: {
                    "Authorization": `Bearer ${cookies.load("access_token")}`
                }
            })
            if (res.data) {
                console.info(res.data)
                // comments.push(res.data)
                // setComments(comments)
                loadAllPages()
                // setChanged(comments.length)
                setCommentContent("")
            }
        } catch (err) {
            console.error(err)
        }
    }

    const editComment = (e, content) => {
        // const parentElement = e.target.parentElement.parentElement.parentElement.parentElement
        // (<form className="form" name="form" onSubmit={addComment} noValidate>
        //     <div className="form-row">
        //         <textarea
        //             className="input"
        //             value={"${content}"}
        //             onChange={(event) => setCommentContent(event.target.value)}
        //             required
        //             rows= {2}
        //             cols= {50}
        //             >
        //             </textarea>

        //     </div>

        //     <div className="form-row action-edit">
        //         <p style={{display: 'inline-block', fontSize:".8rem", position: 'absolute', top:"6.5rem"}}>Nhấn Esc để <span role = "button" onClick="{cancelEdit}">hủy.</span></p>
        //         <input type="submit" className="col-xs-1" value="Lưu" />
        //     </div>
        // </form>)

        // parentElement.innerHTML = htmlEdit;
        // parentElement.className = "comment-form"
        // console.log(htmlEdit);

    }
    const deleteComment = (e) => {
        const divTextElement = e.target.parentElement.parentElement.parentElement.parentElement.querySelector('.comment-text');
        const textElement = divTextElement.querySelector('p');
        alert('Xóa bình luận ' + textElement.textContent);
    }


    const saveRating = async (rate) => {
        if (window.confirm("Bạn muốn đánh giá bài học này?") === true) {
            try {
                let res = await Apis.post(endpoints['rating'](lessonId), {
                    "rating": rate
                }, {
                    headers: {
                        "Authorization": `Bearer ${cookies.load("access_token")}`
                    }
                })
                console.info(res.data)
            } catch (err) {
                console.error(err)
            }
        }
    }

    if (lesson === null)
        return <Spinner animation="border" />

    let comment = <em><Link to={`/login/?continue=${location.pathname}`}>Đăng nhập</Link> để bình luận</em>

    let r = ""

    if (user !== null && user !== undefined) {
        comment =
            <div className="comment-form">
                <div className="comment-avatar">
                    <img src={user.avatar} alt={user.avatar.name} />
                </div>

                <form className="form" name="form" onSubmit={addComment} noValidate>
                    <div className="form-row">
                        <textarea
                            className="input"
                            value={commentContent}
                            onChange={(event) => setCommentContent(event.target.value)}
                            placeholder="Nhập nội dung bình luận..."
                            required></textarea>
                    </div>


                    <div className="form-row">
                        <input type="submit" value="Thêm bình luận" />
                    </div>
                </form>
            </div>
        r = <Rating initialRating={rating} onClick={saveRating} />
    }

    return (
        <>
            <Container>
                <h1 className="text-center text-danger" style={{marginTop:"1rem"}}>CHI TIẾT BÀI HỌC</h1>
                <Row>
                    <Col md={4} xs={12}>
                        <Image src={lesson.image} rounded fluid />
                    </Col>
                    <Col md={8} xs={12}>
                        <h2>{lesson.subject}</h2>
                        <p>Ngày tạo: {lesson.created_date}</p>
                        <p>Ngày cập nhật: {lesson.updated_date}</p>
                        <p>Lượt xem: {view}</p>
                        <p>
                            {lesson.tags.map(t => <Badge style={{ backgroundColor: "blue", marginRight: "5px" }} bg="secondary" key={`lesson-${t.id}`}>{t.name}</Badge>)}
                        </p>
                        <p>
                            {r}
                        </p>
                    </Col>
                </Row>
                <hr />
                <div>
                    {lesson.content}
                </div>

                <hr />
                <div className="bg-gray" style={{ padding: "1rem" }}>
                    {comment}
                </div>
                <hr />
                <div className="bg-gray" style={{ padding: "5rem" }}>
                    {comments.map(c => {
                        return (
                            <div className="comment" key={`comment-${c.id}`}>
                                <div className="comment-avatar">
                                    <img src={c.creator.avatar} alt={c.creator.avatar.name} />
                                </div>
                                <div className="comment-box">
                                    <div className="comment-text"><p>{c.content}</p></div>
                                    <div className="comment-footer">
                                        <div className="comment-info">
                                            <span className="comment-author">
                                                <a href="#us">{c.creator.username}</a>
                                            </span>
                                            <span className="comment-date">About: <Moment fromNow>{c.created_date}</Moment></span>
                                        </div>

                                        <div className="comment-actions">
                                            {!!user && c.creator.username === user.username && <div><a href="#edit" onClick={(e) => { return editComment(e, c.content) }}>Sửa</a>
                                                <a href="#del" onClick={deleteComment} style={{ marginLeft: "1rem", color: "red" }}>Xóa</a></div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    {comments.length === 0 && <p>Chưa có bình luận...</p>
                    }
                    {next && 
                        <span role="button" onClick={() => { paging(1) }}>Xem thêm...</span>
                    }
                </div>
            </Container>

        </>
    )
}