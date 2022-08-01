
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { AuthenticationIndex} from "./components/login/AuthenticationIndex";
import { Index } from "./components/Layout/Index";
import Calendar from './components/Calendar/Calendar';
import { useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { getCookie, refreshTokenKey } from './Cookie/Cookie';

const App = () => {
   
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/welcome"} element={<AuthenticationIndex />} />
                <Route path={"/"} element={<Index />} />
            </Routes>

        </BrowserRouter>
    );
}

export default App;