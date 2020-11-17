import React from 'react';


const Navigation = ({onRouteChange, isSignedIn}) => {
    
       if(isSignedIn) {
           return (
            <nav style= {{display: "flex",
                justifyContent: "flex-end"}} 
                >
                <p className='f3 dim link gold pa3 
                pointer underline  calisto' 
                onClick = {() => onRouteChange('signout')} >
                Signout
                </p>
                
            </nav>)
       }

       else{
           return (
                <nav style= {{display: "flex",
                justifyContent: "flex-end"}} 
                >
                <p className='f3 dim link gold pa3 
                pointer underline  calisto'
                onClick = {() => onRouteChange('register')}>
                Register
                </p>
                <p className='f3 dim link gray pa3 
                pointer underline calisto'
                onClick = {() => onRouteChange('signin')}>
                Sign-in
                </p>
                
            </nav>  
           )
    
       }

    

}
export default Navigation