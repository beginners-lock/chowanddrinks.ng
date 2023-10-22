import './App.css';
import { useState, useEffect } from 'react';
import TopNavBar from './TopNavBar/TopNavBar';
import Dropdown from './Dropdown/Dropdown';
import Home from './HomePage/HomePage';
import Order from './Order/Order';
import Authentication from './Authentication/Authentication';
import Notification from './Notification/Notification';
import ErrorPage from './ErrorPage/ErrorPage';
import ChangePassword from './ChangePassword/ChangePassword';
import { url } from './config';
import { History } from './History/History';
import { Rentachef } from './Rentachef/Rentachef';

function App() {
	const [activetab, setActivetab] = useState('home');
	const [dropdown, setDropdown] = useState(false);
	const [user, setUser] = useState(null);
	const [newnotifics, setNewnotifics] = useState(false);

	useEffect(()=>{
		let activeuser = localStorage.getItem('cadnguser');
		console.log('activeuser: '+activeuser);
		if(activeuser){ 
			let order = localStorage.getItem('cadngorder');
			console.log(order);
			activeuser = JSON.parse(activeuser);
			setUser(activeuser);

			if(order){
				setActivetab('order');
			}else{
				setActivetab('home');
			}

			//Check notifications
			checkNotifications(activeuser.email);
		}else{
			setUser(null);
			setActivetab('authentication');
		}
	}, []);

	const clearUser = () => {
		localStorage.removeItem('cadnguser'); 
		setUser(null);
		localStorage.removeItem('cadngorder');
		setActivetab('authentication');
	}

	const checkNotifications = (email) => {
		fetch(url+'/loadcategories', {
            method:'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({email: email})
        }).then(response => {
            return response.json();
        }).then(response => {
			setNewnotifics(response.new);
		});
	}

  	return (
    	<div id="App">
			<TopNavBar
				activetab={activetab}
				changeTab={(tab)=>{ setActivetab(tab); }}
				changeDropdown={(state)=>{ setDropdown(state); }}
				dropdown={dropdown}
				activeuser={user}
				unsetUser={()=>{clearUser();}}
				newnotifics={newnotifics}
			/>
			
			{
				activetab==='home'?
					<Home
						activetab={activetab}
					/>
				:activetab==='order'?
					<Order
						activetab={activetab}
						activeuser={user}
						changeTab={(tab)=>{setActivetab(tab);}}
						updatenotific={()=>{ setNewnotifics(true); }}
					/>
				:activetab==='authentication'?
					<Authentication
						activetab={activetab}
						changeTab={(tab)=>{setActivetab(tab);}}
						setActiveuser={(user)=>{setUser(user);}}
						updatenotific={()=>{ setNewnotifics(true); }}
					/>
				:activetab==='notification'?
					<Notification
						activetab={activetab}
						changeTab={(tab)=>{setActivetab(tab);}}
						activeuser={user}
						unsetUser={()=>{clearUser();}}
					/>
				:activetab==='history'?
					<History
						activetab={activetab}
						changeTab={(tab)=>{setActivetab(tab);}}
						activeuser={user}
						unsetUser={()=>{clearUser();}}
					/>
				:activetab==='errorpage'?
					<ErrorPage
						activetab={activetab}
					/>
				:activetab==='changepassword'?
					<ChangePassword
						changeTab={(tab)=>{ setActivetab(tab); }}
						unsetUser={()=>{clearUser();}}
						updatenotific={()=>{ setNewnotifics(true); }}
					/>
				:activetab==='rentachef'?
					<Rentachef/>
				:''
			}
			
			<Dropdown
				activetab={activetab}
				changeTab={(tab)=>{ setActivetab(tab); }}
				changeDropdown={(state)=>{ setDropdown(state); }}
				dropdown={dropdown}
				activeuser={user}
				unsetUser={()=>{clearUser();}}
				newnotifics={newnotifics}
			/>
			
    	</div>
 	);
}

export default App;
