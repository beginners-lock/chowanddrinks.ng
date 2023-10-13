import React, {useState} from 'react';
import LoadingSpinner from '../Spinner/Spinner';
import './Authentication.css';
import { url } from '../config';

const Authentication = (props) => {
    const [email, setEmail] = useState('');
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');
    const [loading, setLoading] = useState(false);


    const login = () => {
        let data = {
            email: email,
            pass1: pass1
        };

        fetch(url+'/userlogin', {
            method:'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
    }

    const createaccount = () => {
        let data = {
            email: email,
            pass1: pass1,
            pass2: pass2,
        };

        fetch(url+'/usercreate', {
            method:'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
    }

    const switchToLogin = () => {
        document.getElementById('AuthScroller').scroll({top: 0, left: 0, behavior:'smooth'});
        setEmail(''); setPass1(''); setPass2('');
    }

    const switchToCreate = () => {
        document.getElementById('AuthScroller').scroll({top: 0, left: window.innerWidth, behavior:'smooth'});
        setEmail(''); setPass1(''); setPass2('');
    }

    return (
        <div id="Authentication">
            <div id='AuthScroller'>
                <div id="AuthWrapper">
                    <div id="ASTop">
                        <div id="ASMText">chowanddrinks.ng</div>
                    </div>
                    <div id="AuthWrapper2">
                        <div id="ASLeft">
                            <div id="LoginPage">
                                <div id="LPHeader">Login</div>
                                <div id="LPText1">Sign in and start making <div className="AuthSpecial">orders</div></div>
                                <div id="LPText2">Don't have an account? <div className="AuthSpecial" style={{cursor:'pointer'}} onClick={()=>{switchToCreate();}}>Create account</div></div>
                                <input className="Authinput" type='email' placeholder='Email' onChange={(e)=>{setEmail(e);}}/>
                                <input className="Authinput" type='password' placeholder='Password' onChange={(e)=>{setPass1(e);}}/>
                                <div id="forgotpassword">Forgot Password?</div>
                                <div id="Loginbtn" onClick={()=>{login();}}>
                                    <div style={{display:loading?'none':'flex'}}>Login</div>
                                    <LoadingSpinner
                                        width={'15px'}
                                        height={'15px'}
                                        loading={loading}
                                        borderColor={'white'}
                                        borderTopColor={'#FE7240'}
                                    />
                                </div>
                            </div>
                        </div>
                        <div id="ASMiddle">
                            <div id="ASMText">chowanddrinks.ng</div>
                        </div>
                        <div id="ASRight">
                            <div id="CreatePage">
                                <div id="CPHeader">Create account</div>
                                <div id="CPText1">Sign up to access our <div className="AuthSpecial">awesome services</div></div>
                                <div id="CPText2">Already got an account? <div className="AuthSpecial" style={{cursor:'pointer'}} onClick={()=>{switchToLogin();}}>Login</div></div>
                                <input className="Authinput" type='email' placeholder='Email' onChange={(e)=>{setEmail(e);}}/>
                                <input className="Authinput" type='password' placeholder='Password' onChange={(e)=>{setPass1(e);}}/>
                                <input className="Authinput" type='password' placeholder='Confirm Password' onChange={(e)=>{setPass2(e);}}/>
                                <div id="Createbtn" onClick={()=>{createaccount();}}>
                                    <div style={{display:loading?'none':'flex'}}>Create account</div>
                                    <LoadingSpinner
                                        width={'15px'}
                                        height={'15px'}
                                        loading={loading}
                                        borderColor={'white'}
                                        borderTopColor={'#FE7240'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Authentication;