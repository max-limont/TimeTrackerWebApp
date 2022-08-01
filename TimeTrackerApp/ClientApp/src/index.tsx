import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import App from './App';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
=======
>>>>>>> 9bad6087b545b86277939ce4b9fc9940c9698454


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
<<<<<<< HEAD
    <CookiesProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </CookiesProvider>
);

=======
    <Provider store={store}>
        <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals  
>>>>>>> 9bad6087b545b86277939ce4b9fc9940c9698454
reportWebVitals();
