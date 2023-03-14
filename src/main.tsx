import { render } from 'preact';
import { Router, Route } from 'preact-router';
import { Index } from './routes';

import './main.css';

//import 'dotenv/config.js';

const Main = () => {
    return (
        <Router>
            <Route path='/' component={Index} />
        </Router>
    );
};

render(<Main />, document.body);
