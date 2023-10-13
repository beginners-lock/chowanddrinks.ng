import './App.css';
import { useState } from 'react';
import TopNavBar from './TopNavBar/TopNavBar';
import Dropdown from './Dropdown/Dropdown';
import Home from './HomePage/HomePage';
import Order from './Order/Order';
import Authentication from './Authentication/Authentication';
import Notification from './Notification/Notification';

function App() {
	const [activetab, setActivetab] = useState('authentication');
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
				:activetab==='authentication'?
					<Authentication
						activetab={activetab}
					/>
				:activetab==='notification'?
					<Notification
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
