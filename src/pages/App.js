import React from 'react';
import { BrowserRouter as Router, Route,Redirect,Switch, useLocation} from "react-router-dom";
import styled from 'styled-components';
import ScrollToTop from '../components/ScrollToTop';
import Headers from '../common/Headers';
import BottomMenu from '../common/BottomMenu';

import Home from './Home';

import Letter from './Letter/Letter';
import LetterList from './Letter/LetterList';

import Card from './Card/Card';
import CardList from './Card/CardList';

import Office from './My/Office';

import Talk from './Talk/Talk';
import TalkList from './Talk/TalkList';

import Video from './Video/Video';
import VideoList from './Video/VideoList';


const App = () => {
  
    return (
        
            <Router>
                <ScrollToTop/>
                <Headers/> 
                <>

                <Switch>
                
              
                <Route exact path="/" component={Home} />
                <Route exact path="/letterlist" component={LetterList} />
                <Route exact path="/letter/:pk" component={Letter} />
                
                <Route exact path="/cardlist" component={CardList} />
                <Route exact path="/card/:pk" component={Card} />

                <Route exact path="/talklist" component={TalkList} />
                <Route exact path="/talk/:pk" component={Talk} />

                <Route exact path="/videolist" component={VideoList} />
                <Route exact path="/video/:pk" component={Video} />

                <Route exact path="/my/office" component={Office} />
                </Switch>
                
            
                </>
                <BottomMenu/>
                {/* <Footer/> */}
                
            </Router>
       
    );
}


export default App