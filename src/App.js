import './App.css';

import React from "react";
import { createBrowserHistory } from "history";
import { HashRouter, Router, Route, Switch } from "react-router-dom";

import HomePage from './views/HomePage/HomePage';
import NextTalksPage from './views/NextTalksPage/NextTalksPage';
import PreviousTalksPage from './views/PreviousTalksPage/PreviousTalksPage';
import SubscribePage from './views/SubscribePage/SubscribePage';
import ListKeywordsPage from './views/ListKeywordsPage/ListKeywordsPage';
import ListSpeakersPage from './views/ListSpeakersPage/ListSpeakersPage';

var hist = createBrowserHistory();

/*const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);*/

export default function App(props) {
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/NextTalks" component={NextTalksPage} />
        <Route path="/PreviousTalks" component={PreviousTalksPage} />
        <Route path="/Subscribe" component={SubscribePage} />
        <Route path="/ListKeywords" component={ListKeywordsPage} />
        <Route path="/ListSpeakers" component={ListSpeakersPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  );
}


