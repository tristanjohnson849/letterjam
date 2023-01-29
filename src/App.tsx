import React from 'react';
import { firebaseApp } from './firebase';


const App: React.FC<{}> = () => (
    <div>
        <h1>This is an app</h1>
        <p>Firebase App: {firebaseApp.name}</p>
    </div>
)

export default App;