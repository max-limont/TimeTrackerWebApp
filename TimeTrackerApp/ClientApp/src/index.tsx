import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { useNavigate } from 'react-router-dom';


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

reportWebVitals();
