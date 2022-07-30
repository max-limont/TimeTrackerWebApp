import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { useNavigate } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <CookiesProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </CookiesProvider>
);

reportWebVitals();
