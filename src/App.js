/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Header } from './components/Header'
import { StartHere } from './features/start-here'
import { Autowired } from './features/auto-wired'
import { LayoutConfig } from './features/layouts'
import { PostsList } from './features/posts/PostsList'
import { AddPostForm } from './features/posts/AddPostForm'
import { EditPostForm } from './features/posts/EditPostForm'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { ComponentRegistry } from './features/component-registry'

export default () => (
  <Router>
    <Header />
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <React.Fragment>
              <AddPostForm />
              <PostsList />
            </React.Fragment>
          )}
        />
        <Route exact path="/posts/:postId" component={SinglePostPage} />
        <Route exact path="/editPost/:postId" component={EditPostForm} />
        <Route exact path="/layout-config" component={LayoutConfig} />
        <Route exact path="/component-registry" component={ComponentRegistry} />
        <Route exact path="/auto-wired" component={Autowired} />
        <Route exact path="/start-here" component={StartHere} />
        <Redirect to="/" />
      </Switch>
    </div>
  </Router>
)
