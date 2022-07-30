/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

// Misc components
import { Header } from './components/misc/Header'

// Pages
import { StartHere } from './components/pages/start-here'
import { Autowired } from './components/pages/auto-wired'
import { LayoutConfig } from './components/pages/layouts'
import { Posts } from './components/pages/posts'
import { AddPost } from './components/pages/posts/add'
import { EditPostForm } from './components/pages/posts/edit'
import { Post } from './components/pages/posts/post'
import { ComponentRegistry } from './components/pages/component-registry'

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
              <AddPost />
              <Posts />
            </React.Fragment>
          )}
        />
        <Route exact path="/posts/:postId" component={Post} />
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
