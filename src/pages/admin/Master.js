import React from 'react'
import { Route } from 'react-router-dom'

import DashboardIndex from './Dashboard/Index'
import CategoryIndex from './Category/Index'
import CategoryCreate from './Category/Create'
import CategoryEdit from './Category/Edit'
import VideosIndex from './Videos/Index'
import VideoShow from './Videos/Show'
import AudioIndex from './Audio/Index'
import VideoUpload from './Upload/Video'
import AudioUpload from './Upload/Audio'

const Master = () => {
    return (
        <div>
            <Route>
                <Route exact path="/admin/" component={DashboardIndex} />
                <Route exact path="/admin/category" component={CategoryIndex} />
                <Route exact path="/admin/category/create" component={CategoryCreate} />
                <Route exact path="/admin/category/:id/show" component={CategoryEdit} />
                <Route exact path="/admin/videos" component={VideosIndex} />
                <Route exact path="/admin/videos/:id/:title" component={VideoShow} />
                <Route exact path="/admin/audio" component={AudioIndex} />
                <Route exact path="/admin/upload/video" component={VideoUpload} />
                <Route exact path="/admin/upload/audio" component={AudioUpload} />

            </Route>
        </div>
    );
};

export default Master;