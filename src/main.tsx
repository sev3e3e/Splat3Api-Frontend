import { render } from 'preact';
import { Router, Route } from 'preact-router';
import { Index } from './routes';

import './main.css';
import ScheduleItem from './components/schedule-item';
import { Arrow } from './components/arrow';
import { MapCard } from './components/MapCard';

import { Header } from './components/header';
import { Footer } from './components/footer';

const Main = () => {
    return (
        <>
            <Header />
            <div className='flex justify-center'>
                <Router>
                    <Route path='/' component={Index} />
                    <Route
                        path='/debug'
                        component={ScheduleItem}
                        stage1={{ id: 1, name: 'マンタマリア号' }}
                        stage2={{ id: 2, name: 'ユノハナ大峡谷' }}
                    />
                    <Route path='/arrow' component={Arrow} />
                    <Route
                        path='/swiper'
                        component={MapCard}
                        stage1={{ id: 1, name: 'マンタマリア号' }}
                        stage2={{ id: 2, name: 'ユノハナ大峡谷' }}
                    />
                </Router>
            </div>
            <Footer />
        </>
    );
};

render(<Main />, document.body);
