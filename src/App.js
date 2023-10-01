import './App.css';
import { useState } from 'react';
import TopNavBar from './TopNavBar/TopNavBar';
import Dropdown from './Dropdown/Dropdown';
import Home from './HomePage/HomePage';
import Order from './Order/Order';

function App() {
	const [activetab, setActivetab] = useState('home');
	const [dropdown, setDropdown] = useState(false);



  	return (
    	<div id="App">
			<TopNavBar
				activetab={activetab}
				changeTab={(tab)=>{ setActivetab(tab); }}
				changeDropdown={(state)=>{ setDropdown(state); }}
				dropdown={dropdown}
			/>
			
			{
				activetab==='home'?
					<Home
						activetab={activetab}
					/>
				:activetab==='order'?
					<Order
						activetab={activetab}
					/>
				:''
			}
			
			<Dropdown
				activetab={activetab}
				changeTab={(tab)=>{ setActivetab(tab); }}
				changeDropdown={(state)=>{ setDropdown(state); }}
				dropdown={dropdown}
			/>
			
    	</div>
 	);
}

export default App;
