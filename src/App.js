import React, { useState } from 'react';

import Header from './Header';

import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";

import Home from './Home';
import SearchPane from './SearchPane';
import PodcastPane from './PodcastPane';
import About from './About';
import Player from './Player';


import './App.css';

function App(props) {
	const [playingEpisode, setPlayingEpisode] = useState(false);

	const playEpisode = (episode) => {
		setPlayingEpisode(episode);
	}
	return (
		<Router>
			<div className="App">
				<Header />
				<Switch>
					<Route path="/about">
						<About />
					</Route>
					<Route path="/podcast/:podcastId">
						<PodcastPane playEpisode={playEpisode} />
					</Route>
					<Route path="/search/:searchQuery">
						<SearchPane />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
				{ playingEpisode && 
					<Player playingEpisode={playingEpisode} />
				}
			</div>
		</Router>
	);
}

export default App;
