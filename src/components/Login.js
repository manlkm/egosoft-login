import React from "react";
import '../style/Login.css';

class Login extends React.Component {
    render() {
        return (
            <div className="login">
            <div className="login__content">
                <div className="login__img">
                    
                </div>

                <div className="login__forms">
                    <form action="" className="login__registre" id="login-in">
                        <h1 className="login__title">自柔傢俬</h1>
    
                        <div className="login__box">
                            <i className='bx bx-user login__icon'></i>
                            <input type="text" placeholder="用戶名稱" className="login__input" />
                        </div>
    
                        <div className="login__box">
                            <i className='bx bx-lock-alt login__icon'></i>
                            <input type="password" placeholder="密碼" className="login__input" />
                        </div>

                        {/* <a href="#" className="login__forgot">Forgot password?</a> */}

                        <a href="#" className="login__button">登入</a>

                       
                    </form>

                </div>
            </div>
        </div>
        );
    }
}

export default Login;