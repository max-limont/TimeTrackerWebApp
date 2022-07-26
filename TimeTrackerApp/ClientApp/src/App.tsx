import { Index } from "./components/Layout/Index";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <Index />
        </BrowserRouter>
    );
}

export default App;