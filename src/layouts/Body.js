import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from '../pages/Home'
import Footer from "./Footer";
import Lesson from "../pages/Lesson";
import LessonDetail from "../pages/LessonDetail";
import Login from "../pages/Login";
import Register from "../pages/Resgister";
import PageNotFound from './404';


export default function Body() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/courses/:courseId/lessons/" component={Lesson} />
                    <Route exact path="/lessons/:lessonId/" component={LessonDetail} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path='/404' component={PageNotFound} />
                    <Route exact path='*' component={PageNotFound} />
                </Switch>
                <Footer />
            </BrowserRouter>
        </>
            
    )
}