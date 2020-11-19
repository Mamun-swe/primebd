import React from 'react'
import { Route } from 'react-router-dom'

import Home from './home/Index'
import Categories from './categories/Index'
import CategoryVideos from './categories/Show'
import Favourite from './favourite/Index'
import MyVideos from './my-videos/Index'
import UploadVideo from './upload-video/Index'
import Player from './player/Index'

import ChatMaster from './chat/Master'

const Master = () => {
    return (
        <div>
            <Route>
                <Route exact path="/home/" component={Home} />
                <Route exact path="/home/categories" component={Categories} />
                <Route exact path="/home/category/:id/:name/videos" component={CategoryVideos} />
                <Route exact path="/home/favourite" component={Favourite} />
                <Route exact path="/home/my-videos" component={MyVideos} />
                <Route exact path="/home/upload" component={UploadVideo} />
                <Route exact path="/home/video/:id/:name/play" component={Player} />
                <Route path="/home/chat" component={ChatMaster} />
            </Route>
        </div>
    );
};

export default Master;