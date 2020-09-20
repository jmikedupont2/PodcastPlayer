import React, { useState, useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';

import LoadingIndicator from './resources/loading.svg';

import PodcastService from './PodcastService';

function SearchPane(props) {
	let { searchQuery } = useParams();

	const [searchResults, setSearchResults] = useState(false);

	useEffect(() => {
		setSearchResults(false);
		PodcastService.search(searchQuery)
		.then((returnedSearchResults) => {
			setSearchResults(returnedSearchResults);
		});
	},[searchQuery]);

	return (
		<div class="searchPane">
			<h1>Searching for &quot;{searchQuery}&quot;</h1>

			{ searchResults === false &&
				<div class="loading">
					<div>
						Loading search results
					</div>

					<img src={LoadingIndicator} class="loadingIndicator" alt="Loading indicator" />
				</div>
			}
			{ searchResults !== false &&
				<div>
					<h2>Found {searchResults.count} result{searchResults.count !== 1 ? 's' : ''}</h2>
				</div>
			}
			{ searchResults !== false && searchResults.count > 0 &&
				searchResults.feeds.map((searchResult,index) => {
					return (
						<Link to={'/podcast/' + searchResult.id} class="searchResult">
							<img src={searchResult.artwork} alt={searchResult.title + ' artwork'} />

							<div class="title">{searchResult.title}</div>
							<div class="author">{searchResult.author}</div>
						</Link>
					);
				})
			}
		</div>
	);
}
export default SearchPane;