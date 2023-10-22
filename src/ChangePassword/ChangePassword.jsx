import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../Spinner/Spinner';
import { url } from '../config';
import './ChangePassword.css';

const ChangePassword = (props) => {
    const [user, setUser] = useState(null);
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');
    const [pass3, setPass3] = useState('');

    const [pass1warning, setPass1warning] = useState('');
    const [pass2warning, setPass2warning] = useState('');
    const [pass3warning, setPass3warning] = useState('');
    const [warningcolor, setWarningcolor] = useState('red');

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        let user = localStorage.getItem('cadnguser');
        if(user){
            setUser(JSON.parse(user));
        }else{
            props.unsetUser();
        }
    }, []);

    const resetWarning = () => {
        setPass1warning('');
        setPass2warning('');
        setPass3warning('');
        setWarningcolor('red');
    }

    const changepassword = () => {
        resetWarning();
        if(pass1!=='' && pass2!=='' && pass3!==''){
            if(pass2===pass3){
                setLoading(true);
                let data  = {email: user.email, pass1: pass2, current: pass1};

                fetch(url+'/changepassword', {
                    method:'POST',
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(data)
                }).then((response)=>{
                    return response.json();
                }).then((response)=>{
                    if(response.msg==='success'){
                        setPass1warning('Password change succesful!');
                        setPass2warning('Password change succesful!');
                        setPass3warning('Password change succesful!');
                        setWarningcolor('green');
                        props.updatenotific();
                    }else{
                        if(response.msg==='Wrong password'){
                            setPass1warning('Wrong password');
                        }else{
                            setPass1warning('An error occured, please try again later');
                            setPass2warning('An error occured, please try again later');
                            setPass3warning('An error occured, please try again later');
                        }
                    }

                    setLoading(false);
                });
            }else{
                setPass2warning('Passwords not similar');
                setPass3warning('Passwords not similar');  
            }
        }else{
            if(pass1===''){ setPass1warning('This field cannot be empty'); }
            if(pass2===''){ setPass2warning('This field cannot be empty'); }
            if(pass3===''){ setPass3warning('This field cannot be empty'); }
        }
    }

    return (
        <div id="ChangePassword">
            <input className="CPInput" type='password' placeholder='Current Password' onChange={(e)=>{setPass1(e.target.value);}}/>
            <h5 className='CPwarning' style={{color: warningcolor}}>{pass1warning}</h5>
            <input className="CPInput" type='password' placeholder='New Password' onChange={(e)=>{setPass2(e.target.value);}}/>
            <h5 className='CPwarning' style={{color: warningcolor}}>{pass2warning}</h5>
            <input className="CPInput" type='password' placeholder='Confirm Password' onChange={(e)=>{setPass3(e.target.value);}}/>
            <h5 className='CPwarning' style={{color: warningcolor}}>{pass3warning}</h5>

            <div id="CPbtn" onClick={()=>{if(!loading){ changepassword(); }}}>
                <div style={{display:loading?'none':'flex'}}>Change password</div>
                <LoadingSpinner
                    width={'15px'}
                    height={'15px'}
                    loading={loading}
                    borderColor={'white'}
                    borderTopColor={'#FE7240'}
                />
            </div>
        </div>
    );
}

export default ChangePassword