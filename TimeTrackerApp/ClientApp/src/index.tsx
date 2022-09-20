import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie';
import App from './App';
import connection from "./store/signalr";


window.onunload = function(){
    connection.invoke("LogOut");
};

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    
    <CookiesProvider>
        <Provider  store={store}>
            <App  />
        </Provider>
    </CookiesProvider>
);
reportWebVitals();
