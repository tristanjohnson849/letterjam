import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router-dom';
import router from './routing.js';
import "./index.css";


const App: React.FC<{}> = () => (
    <RouterProvider router={router}/>
)

ReactDOM.render(<App />, document.getElementById('react-app'));
