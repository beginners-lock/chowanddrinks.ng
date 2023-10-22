import React, {useState} from 'react';
import LoadingSpinner from '../Spinner/Spinner';
import './Authentication.css';
import { url } from '../config';
import SplitInput from '../SplitInput/SplitInput';

const Authentication = (props) => {
    const [email, setEmail] = useState('');
    const [emailwarning, setEmailwarning] = useState('');
    const [pass1warning, setPass1warning] = useState('');  
    const [pass2warning, setPass2warning] = useState(''); 
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');
    const [loading, setLoading] = useState(false);

    const [page1, setPage1] = useState('login')
    const [page2, setPage2] = useState('create');

    const [otpwarning1, setOtpwarning1] = useState('');
    const [otpwarning2, setOtpwarning2] = useState('');
    const [otploading, setOtploading] = useState(false);

    const [forgot1, setForgot1] = useState('');
    const [forgot2, setForgot2] = useState('');
    const [f1warning, setF1warning] = useState('');
    const [f2warning, setF2warning] = useState('');
    const [forgotloading, setForgotloading] = useState(false);

    const resetWarning = () => {
        setEmailwarning(''); setPass1warning(''); setPass2warning('');
    }

    const inputchecker = (type) => {
        let legible = true;

        if(!email.includes('@')){ setEmailwarning('Valid email not provided'); legible=false; }
        if(type==='create' && pass1!==pass2){ setPass1warning('Passwords not similar'); setPass2warning('Passwords not similar'); legible=false; }
        if(email===''){ setEmailwarning('This field cannot be empty'); legible=false; }
        if(pass1===''){ setPass1warning('This field cannot be empty'); legible=false; }
        if(type==='create' && pass2===''){ setPass2warning('This field cannot be empty'); legible=false; }

        return legible;
    }

    const login = () => {
        resetWarning();

        let valid = inputchecker('login');

        if(valid){
            let data = {
                email: email,
                pass1: pass1
            };
    
            setLoading(true);
            fetch(url+'/userlogin', {
                method:'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(data)
            }).then((response)=>{
                return response.json();
            }).then(response => {
                if(response.msg==='success'){
                    localStorage.setItem('cadnguser', JSON.stringify(response.user));
                    console.log(response.user);
                    props.setActiveuser(response.user);
                    props.updatenotific()
                    props.changeTab('order');
                }else{
                    if(response.msg==='Wrong credentials'){
                        setEmailwarning('Wrong credentials');
                        setPass1warning('Wrong credentials');
                    }else{
                        if(response.msg==='Email does not exist'){
                            setEmailwarning('Email does not exist');
                        }else{
                            setEmailwarning('An error occured, please try again later');
                            setPass1warning('An error occured, please try again later');
                            setPass2warning('An error occured, please try again later');
                        }
                    }
                }
                setLoading(false);
            });
        }
    }

    const emailverification = () => {
        resetWarning();
        
        let valid = inputchecker('create');
        if(valid){
            let data = {
                email: email,
                pass1: pass1,
                pass2: pass2,
            };
    
            setLoading(true);
            fetch(url+'/emailverification', {
                method:'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(data)
            }).then((response)=>{
                return response.json();
            }).then((response)=>{
                if(response.msg==='success'){
                    setPage2('otp');
                }else{
                    if(response.msg==='This email already exists'){
                        setEmailwarning('This email already exists');
                    }else{
                        setEmailwarning('An error occured, please try again later');
                        setPass1warning('An error occured, please try again later');
                        setPass2warning('An error occured, please try again later');
                    }
                }
                setLoading(false);
            });
        }
    }

    const switchToLogin = () => {
        resetWarning();
        document.getElementById('AuthScroller').scroll({top: 0, left: 0, behavior:'smooth'});
        setEmail(''); setPass1(''); setPass2('');
        [...document.getElementsByClassName('Authinput')].forEach(el=>{
            el.value = '';
        });
    }

    const switchToCreate = () => {
        resetWarning();
        document.getElementById('AuthScroller').scroll({top: 0, left: window.innerWidth, behavior:'smooth'});
        setEmail(''); setPass1(''); setPass2('');
        [...document.getElementsByClassName('Authinput')].forEach(el=>{
            el.innerText = '';
        });
    }

    const confirmemail1 = (code) => {
        setOtploading(true); setOtpwarning1('');

        let data = {
            email: email,
            code: code,
        }

        fetch(url+'/forgotpassword', {
            method:'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data)
        }).then((response)=>{
            return response.json();
        }).then((response)=>{
            if(response.msg==='success'){
                setPage1('forgotinput'); setForgot1('');  setForgot2('');
            }else{
                setOtpwarning1(response.msg);
            }
            setOtploading(false);
        });
    }

    const confirmemail2 = (code) => {
        setOtploading(true); setOtpwarning2('');

        let data = {
            email: email,
            pass1: pass1,
            code: code,
        }

        fetch(url+'/usercreate', {
            method:'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data)
        }).then((response)=>{
            return response.json();
        }).then((response)=>{
            setOtpwarning2(response.msg);
            if(response.msg==='Email Verified'){
                localStorage.setItem('cadnguser', JSON.stringify(response.user));
                props.setActiveuser(response.user);
                props.updatenotific();
                props.changeTab('order');
            }
            setOtploading(false);
        });
    }

    function forgotswitcher(){
        resetWarning();
        if(email!==''){
            if(!email.includes('@')){ 
                setEmailwarning('Valid email not provided'); 
            }else{
                let data = {
                    email: email
                };
        
                setLoading(true);
                fetch(url+'/passwordemail', {
                    method:'POST',
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(data)
                }).then((response)=>{
                    return response.json();
                }).then((response)=>{
                    if(response.msg==='success'){
                        setPage1('forgototp');
                    }else{
                        if(response.msg==='This email does not exist'){
                            setEmailwarning('This email does not exist'); 
                        }else{
                            setEmailwarning('An error occured, please try again later');  
                        }
                    }
                    setLoading(false);
                });
            }
        }else{
            setEmailwarning('This field cannot be empty');
        }
    }

    const changepassword = () => {
        if(forgot1!=='' && forgot2!==''){
            if(forgot1===forgot2){
                setForgotloading(true);
                let data  = {email: email, pass1: forgot1};

                fetch(url+'/changepassword', {
                    method:'POST',
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(data)
                }).then((response)=>{
                    return response.json();
                }).then((response)=>{
                    if(response.msg==='success'){
                        props.updatenotific();
                        setPage1('login');
                    }else{
                        setF1warning('An error occured, please try again later');
                        setF2warning('An error occured, please try again later');
                    }

                    setForgotloading(false);
                });
            }else{
                setF1warning('Passwords not similar');
                setF2warning('Passwords not similar');  
            }
        }else{
            if(forgot1===''){ setF1warning('This field cannot be empty'); }
            if(forgot2===''){ setF2warning('This field cannot be empty'); }
        }
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
                            <div id="LoginPage" style={{display:page1==='login'?'flex':'none'}}>
                                <div id="LPHeader">Login</div>
                                <div id="LPText1">Sign in and start making <div className="AuthSpecial">orders</div></div>
                                <div id="LPText2">Don't have an account? <div className="AuthSpecial" style={{cursor:'pointer'}} onClick={()=>{switchToCreate();}}>Create account</div></div>
                                <input className="Authinput" type='email' placeholder='Email' onChange={(e)=>{setEmail(e.target.value);}}/>
                                <h5 className='Authwarning'>{emailwarning}</h5>
                                <input className="Authinput" type='password' placeholder='Password' onChange={(e)=>{setPass1(e.target.value);}}/>
                                <h5 className='Authwarning'>{pass1warning}</h5>
                                <div id="forgotpassword" onClick={()=>{forgotswitcher();}}>Forgot Password?</div>
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
                            <div id="OTPPage" style={{display:page1==='forgototp'?'flex':'none'}}>
                                <SplitInput
                                    sendcode={confirmemail1}
                                    loading={otploading}
                                    goback={()=>{setOtpwarning1(''); setPage1('login');}}
                                    warning={otpwarning1}
                                />
                            </div>
                            <div id="forgotpage" style={{display:page1==='forgotinput'?'flex':'none'}}>
                                <input className="Authinput" type='password' placeholder='New Password' onChange={(e)=>{setForgot1(e.target.value);}}/>
                                <h5 className='Authwarning'>{f1warning}</h5>
                                <input className="Authinput" type='password' placeholder='Confirm Password' onChange={(e)=>{setForgot2(e.target.value);}}/>
                                <h5 className='Authwarning'>{f2warning}</h5>

                                <div id="forgotbtn" onClick={()=>{if(!forgotloading){ changepassword(); }}}>
                                    <div style={{display:forgotloading?'none':'flex'}}>Change password</div>
                                    <LoadingSpinner
                                        width={'15px'}
                                        height={'15px'}
                                        loading={forgotloading}
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
                            <div id="CreatePage" style={{display:page2==='create'?'flex':'none'}}>
                                <div id="CPHeader">Create account</div>
                                <div id="CPText1">Sign up to access our <div className="AuthSpecial">awesome services</div></div>
                                <div id="CPText2">Already got an account? <div className="AuthSpecial" style={{cursor:'pointer'}} onClick={()=>{switchToLogin();}}>Login</div></div>
                                <input className="Authinput" type='email' placeholder='Email' onChange={(e)=>{setEmail(e.target.value);}}/>
                                <h5 className='Authwarning'>{emailwarning}</h5>
                                <input className="Authinput" type='password' placeholder='Password' onChange={(e)=>{setPass1(e.target.value);}}/>
                                <h5 className='Authwarning'>{pass1warning}</h5>
                                <input className="Authinput" type='password' placeholder='Confirm Password' onChange={(e)=>{setPass2(e.target.value);}}/>
                                <h5 className='Authwarning'>{pass2warning}</h5>
                                <div id="Createbtn" onClick={()=>{emailverification();}}>
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
                            <div id="OTPPage" style={{display:page2==='otp'?'flex':'none'}}>
                                <SplitInput
                                    sendcode={confirmemail2}
                                    loading={otploading}
                                    goback={()=>{setOtpwarning2(''); setPage2('create');}}
                                    warning={otpwarning2}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Authentication;