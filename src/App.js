import './App.css';
import { useState } from 'react';
import TopNavBar from './TopNavBar/TopNavBar';
import Dropdown from './Dropdown/Dropdown';
import Home from './HomePage/HomePage';

function App() {
	const setActiveTab = () => {

	}

  	return (
    	<div id="App">
			<TopNavBar
				setActiveTab={setActiveTab}
			/>
			<Dropdown/>
			<Home/>
    	</div>
 	);
}

export default App;
