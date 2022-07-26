import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AuthenticationIndex, FormVariant} from "./components/login/AuthenticationIndex";
import {Index} from "./components/Layout/Index";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/*"} element={<Index />} />
                <Route path={"/welcome/"} element={<AuthenticationIndex variant={FormVariant.outlined} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;