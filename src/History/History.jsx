import React, {useEffect, useState} from 'react';
import LoadingSpinner from '../Spinner/Spinner';
import './History.css';
import { url } from '../config';

export const History = (props) => {
    const [history, setHistory] = useState([]);
	const [loading, setLoading] = useState(false);
	const [warning, setWarning] = useState('');

    useEffect(()=>{
        setWarning('');
		if(props.activeuser){
			setLoading(true);
			let userid = props.activeuser.userid;

			try{
				fetch(url+'/getorderhistory', {
					method:'POST',
					headers: { "Content-Type": "application/json"},
					body: JSON.stringify({userid: userid})
				}).then(response => {
					return response.json();
				}).then(response => {
					if(response.msg==='success'){
						setHistory(response.data.reverse())
					}else{
						setWarning(response.msg);
					}
					setLoading(false);
				});
			}catch(e){
				console.log('An error occured in History useEffect: '+e);
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

    const orderRedirect = (ownerid, reference) => {
        let url = 'http://localhost:8000/orderreview?reference='+reference+'&userid='+ownerid;
		window.open(url, '_blank');
	}

    return (
        <div id="History">
            <LoadingSpinner
				width={'15px'}
				height={'15px'}
				loading={loading}
				borderColor={'#FE7240'}
				borderTopColor={'red'}
			/>
            <div style={{display:!loading && warning!==''?'flex':'none', color:'red'}}>{warning}</div>
			{
				history.length>0?
					history.map((row, index)=>{
						return(
							<div key={'HistChild'+index} className='HistChild' onClick={()=>{ orderRedirect(row.ownerid, row.reference); }}>
								<div className='HCref'>{'Order '+row.reference}</div>
                                <div className='HCpaid'>{'NGN '+row.paid}</div>
								<div className='HCtime'>{timeformatter(row.time)}</div>
							</div>
						);
					})
				: <div style={{display:warning==='' && !loading?'flex':'none'}}>You do not have any paid orders</div>
			}
        </div>
    )
}
