<<<<<<< HEAD
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { AuthenticationIndex} from "./components/login/AuthenticationIndex";
import { Index } from "./components/Layout/Index";
import Calendar from './components/Calendar/Calendar';
import { useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { getCookie, refreshTokenKey } from './store/Cookie/Cookie';

const App = () => {
   
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/welcome"} element={<AuthenticationIndex />} />
                <Route path={"/"} element={<Index />} />
            </Routes>
=======
import { Index } from "./components/Layout/Index";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <Index />
>>>>>>> 9bad6087b545b86277939ce4b9fc9940c9698454
        </BrowserRouter>
    );
}

export default App;