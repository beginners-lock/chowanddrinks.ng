import React, {useState, useEffect} from 'react';
import { url } from '../config';
import './Notification.css';
import LoadingSpinner from '../Spinner/Spinner';

const Notification = (props) => {
	const [notifications, setNotifications] = useState([]);
	const [loading, setLoading] = useState(false);
	const [warning, setWarning] = useState('');

	useEffect(()=>{
		setWarning('');
		if(props.activeuser){
			setLoading(true);
			let userid = props.activeuser.userid;

			try{
				fetch(url+'/getnotifications', {
					method:'POST',
					headers: { "Content-Type": "application/json"},
					body: JSON.stringify({userid: userid})
				}).then(response => {
					return response.json();
				}).then(response => {
					if(response.msg==='success'){
						setNotifications(response.data.reverse())
					}else{
						setWarning(response.msg);
					}
					setLoading(false);
				});
			}catch(e){
				console.log('An error occured in Notification useEffect: '+e);
				props.changeTab('errorpage');
			}
		}else{
			props.unsetUser();
		}
	}, []);	

	const timeformatter = (datetime) => {
		if(datetime){
			let date = datetime.slice(0, datetime.indexOf('T'));
			let time = datetime.slice(datetime.indexOf('T')+1, datetime.lastIndexOf('.')-3)
			return date+'	'+time;	
		}else{
			return '2000-01-01 00:00';
		}
		
	}

	const orderRedirect = (orderlink, message) => {
		if(orderlink){
			if(orderlink.reference){
				let url = 'http://localhost:8000/orderreview?reference='+orderlink.reference+'&userid='+orderlink.userid;
				window.open(url, '_blank');
			}else{
				let reference = message.slice(6, message.indexOf('payment')-1);
				let userid = props.activeuser.userid;
				let url = 'http://localhost:8000/orderreview?reference='+reference+'&userid='+userid;
				window.open(url, '_blank');
			}
		}
	}

	return (
		<div id="Notification">
			<LoadingSpinner
				width={'15px'}
				height={'15px'}
				loading={loading}
				borderColor={'#FE7240'}
				borderTopColor={'red'}
			/>
			<div style={{display:!loading && warning!==''?'flex':'none', color:'red'}}>{warning}</div>
			{
				notifications.length>0?
					notifications.map((notification, index)=>{
						return(
							<div key={'NotificChild'+index} className='NotificChild' style={{cursor:notification.type?'pointer':''}} onClick={()=>{ orderRedirect(notification.type, notification.message); }}>
								<div className='NCmsg'>{notification.message}</div>
								<div className='NCtime'>{timeformatter(notification.time)}</div>
							</div>
						);
					})
				: <div style={{display:warning==='' && !loading?'flex':'none'}}>You do not have any notifications</div>
			}
		</div>
	)
}

export default Notification;