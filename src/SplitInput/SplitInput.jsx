import React, { useMemo, useRef, useState, useEffect } from 'react';
import './SplitInput.css';
import LoadingSpinner from '../Spinner/Spinner';

/*export enum KeyBoardTypes {
    default = 'default',
    email = 'email-address',
    numeric = 'numeric',
    phone = 'phone-pad',
    url = 'url',
    number = 'number-pad',
    unset = 'unset',
}*/

const SplitInput = (props) => {
    const [text, onChangeText] = useState('');
    let inputRef = useRef();
    const onPress = () => { inputRef.current?.focus(); }

    useEffect(()=>{
        document.getElementById('otpinput').focus();
    }, []);

    const keyChecker = (e) => {
        if(e.key==='Enter' && text.length===6){
            props.sendcode(text);
        }
    }

    const otpContent = useMemo(() =>
        <div style={styles.containerStyle}>
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={'si'+i}
                    className='otpinputs'
                    onClick={onPress}
                    style={{...styles.textStyle, borderBottom:text.length===i ? '3px rgba(200,0,0,0.4) solid' : text.length>i ? '3px #F00000 solid' : '3px grey solid'}}
                    /*style={[styles.textStyle, text[i] ? styles.filledStyle : {}]}*/>
                    {text[i]}
                </div>
            ))}
        </div>
    , [text]);

    return (
        <div style={{width:'100%'}}>
            <input id="otpinput" type='number' maxLength={6} ref={inputRef}
                style={styles.input} onChange={(e) =>{ if(e.target.value.length <= 6){ onChangeText(e.target.value); } }}
                value={text}
                inputMode={'numeric'}
                onKeyDown={(e)=>{ keyChecker(e); }}
            />

            <div id="otpinstructions">{'A 6 digit code has been sent to '+props.email+'. Check your spam if it isn\'t found in your inbox.'}</div>

            {otpContent}

            <div  className='otpwarning' style={{ color: props.warning==='Email Verified'?'green':'red'}}>{props.warning}</div>
            <div className='otpbtns' onClick={()=>{ if(!props.loading && text.length===6){ props.sendcode(text); } }}>
                {
                    props.loading?    
                        <LoadingSpinner
                            width={'15px'}
                            height={'15px'}
                            loading={props.loading}
                            borderColor={'white'}
                            borderTopColor={'#FE7240'}
                        />
                    :'Send Code'
                }
            </div>
            <div className='otpbtns' onClick={()=>{props.goback();}}>
                Go back
            </div>
        </div>
    );
};

const styles = {
    input: {
        height: 0,
        width: 0,
    },
    containerStyle: {
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width:'100%'
    },
    textStyle: {
        height: 50,
        width: 50,
        color:'#F00000',
        borderWidth: 1,
        fontSize: 28,
        textAlign: 'center',
        paddingTop: 8,
    },
    safeAreaStyle: {
        marginHorizontal: 20,
    },
};

export default SplitInput;