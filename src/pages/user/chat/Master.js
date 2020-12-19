import React from 'react'
import { Route } from 'react-router-dom'

// import Messages from './Messages'
import Peoples from './Peoples'
import MessageRoom from './MessageRoom'

const Master = () => {
    return (
        <div>
            <Route>
                {/* <Route exact path="/home/chat/" component={Messages} /> */}
                <Route exact path="/home/chat/" component={Peoples} />
                <Route path="/home/chat/messages/:name/:id" component={MessageRoom} />
            </Route>
        </div>
    );
};

export default Master;