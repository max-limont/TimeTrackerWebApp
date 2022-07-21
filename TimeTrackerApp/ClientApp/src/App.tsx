import React from 'react';
import logo from './logo.svg';
import { Layout } from './component/Layout';
import { Route, Routes } from 'react-router-dom';
import { initCalendar } from './store/slice/calendar/calendarSlice';
import { useAppDispatch } from './app/hooks';

function App() {
  
    return (
        <>
            <div>
                <Routes>
                    <Route path="/" element={<Layout />}>
                     
                    </Route>
                </Routes>
            </div>
        </>
    );
}

export default App;