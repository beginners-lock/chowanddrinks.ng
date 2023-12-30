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
import { Aboutus } from './Aboutus/Aboutus';

function App() {
	const [prevtab, setPrevTab] = useState(null); //This gives us a page to fall back to after the authentication
	const [activetab, setActivetab] = useState('home');
	const [dropdown, setDropdown] = useState(false);
	const [user, setUser] = useState(null);
	const [newnotifics, setNewnotifics] = useState(false);

	useEffect(()=>{
		document.title = 'chowanddrinks.com.ng';
		let activeuser = localStorage.getItem('cadnguser');

		if(activeuser){ 
			//let order = localStorage.getItem('cadngorder');
			activeuser = JSON.parse(activeuser);
			setUser(activeuser);

			//Check notifications
			checkNotifications(activeuser.email);
		}else{
			setUser(null);
			//setActivetab('authentication');
		}
	}, []);

	const clearUser = () => {
		localStorage.removeItem('cadnguser'); 
		setUser(null);
		localStorage.removeItem('cadngorder');
		setActivetab('authentication');
	}

	const checkNotifications = (email) => {
		try{
			fetch(url+'/loadcategories', {
				method:'POST',
				headers: { "Content-Type": "application/json"},
				body: JSON.stringify({email: email})
			}).then(response => {
				return response.json();
			}).then(response => {
				setNewnotifics(response.new);
			});
		}catch(e){
            console.log('An error occured in Order useEffect: '+e);
            setActivetab('errorpage');
        }
	}

  	return (
    	<div id="App">
			<TopNavBar
				activetab={activetab}
				changeTab={(tab)=>{ if(tab==='authentication'){ setPrevTab(activetab); } setActivetab(tab); }}
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
						changeTab={(tab)=>{ if(tab==='authentication'){ setPrevTab('home'); } setActivetab(tab);}}
					/>
				:activetab==='order'?
					<Order
						activetab={activetab}
						activeuser={user}
						changeTab={(tab)=>{if(tab==='authentication'){ setPrevTab('order'); } setActivetab(tab);}}
						updatenotific={()=>{ setNewnotifics(true); }}
					/>
				:activetab==='authentication'?
					<Authentication
						activetab={activetab}
						changeTab={(tab)=>{ setPrevTab(null); setActivetab(tab);}}
						prevtab={prevtab}
						setActiveuser={(user)=>{setUser(user);}}
						updatenotific={()=>{ setNewnotifics(true); }}
					/>
				:activetab==='notification'?
					<Notification
						activetab={activetab}
						changeTab={(tab)=>{if(tab==='authentication'){ setPrevTab('notification'); } setActivetab(tab);}}
						activeuser={user}
						unsetUser={()=>{clearUser();}}
					/>
				:activetab==='history'?
					<History
						activetab={activetab}
						changeTab={(tab)=>{if(tab==='authentication'){ setPrevTab('hsitory'); } setActivetab(tab);}}
						activeuser={user}
						unsetUser={()=>{clearUser();}}
					/>
				:activetab==='errorpage'?
					<ErrorPage
						activetab={activetab}
					/>
				:activetab==='changepassword'?
					<ChangePassword
						changeTab={(tab)=>{ if(tab==='authentication'){ setPrevTab('changepassword'); } setActivetab(tab); }}
						unsetUser={()=>{clearUser();}}
						updatenotific={()=>{ setNewnotifics(true); }}
					/>
				:activetab==='aboutus'?
					<Aboutus/>
				:''
			}
			
			<Dropdown
				activetab={activetab}
				changeTab={(tab)=>{ if(tab==='authentication'){ setPrevTab(activetab); } setActivetab(tab); }}
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
