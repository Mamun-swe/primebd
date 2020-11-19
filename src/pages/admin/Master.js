import React from 'react'
import { Route } from 'react-router-dom'

import DashboardIndex from './Dashboard/Index'
import CategoryIndex from './Category/Index'
import CategoryCreate from './Category/Create'
import VideosIndex from './Videos/Index'
import VideoShow from './Videos/Show'

const Master = () => {
    return (
        <div>
            <Route>
                <Route exact path="/admin/" component={DashboardIndex} />
                <Route exact path="/admin/category" component={CategoryIndex} />
                <Route exact path="/admin/category/create" component={CategoryCreate} />
                <Route exact path="/admin/videos" component={VideosIndex} />
                <Route exact path="/admin/videos/:id/:name" component={VideoShow} />

            </Route>
        </div>
    );
};

export default Master;