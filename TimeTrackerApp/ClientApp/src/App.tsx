import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { AuthenticationIndex} from "./components/login/AuthenticationIndex";
import { Index } from "./components/Layout/Index";

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