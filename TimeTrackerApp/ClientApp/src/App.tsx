
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { AuthenticationIndex} from "./components/login/AuthenticationIndex";
import { Index } from "./components/Layout/Index";
import Calendar from './components/Calendar/Calendar';


const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/welcome"} element={<AuthenticationIndex />} />
                <Route path={"/"} element={<Index />} >
                    <Route path="/calendar"  />
                    <Route path="/userList"  />

                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;