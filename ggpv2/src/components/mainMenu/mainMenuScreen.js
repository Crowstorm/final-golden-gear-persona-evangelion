import React from 'react';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';

import useForm from './useForm';


class MainMenuScreen extends React.Component {
    state = {
        content: 'menu'
    }

    renderMainMenu = () => {
        this.setState({
            content: 'menu'
        })
    }

    renderLoginForm = () => {
        this.setState({
            content: 'login'
        })
    }

    renderRegisterForm = () => {
        this.setState({
            content: 'register'
        })
    }

    renderContent = () => {
        switch (this.state.content) {
            case 'menu':
                return (
                    <div className="d-flex justify-content-around flex-column" style={{height: '50%'}}>
                        <div className="eightbit-btn d-flex justify-content-center align-items-center" style={{height: '30%', fontSize: 42, textAlign: 'center'}} onClick={() => this.renderLoginForm()}>Login</div>
                        <div className="eightbit-btn d-flex justify-content-center align-items-center" style={{height: '30%', fontSize: 42, textAlign: 'center'}} onClick={() => this.renderRegisterForm()}>Register</div>
                    </div>
                )
            case 'login':
                return <LoginForm {...this.props}/>
            case 'register':
                return <RegisterForm {...this.props}/>
            default:
                console.log('renderContent error')
        }
    }

    render() {
        const content = this.renderContent()
        return (
            <div className="mainMenu d-flex justify-content-center flex-column" style={{ width: "1024px", height: "800px" }}>
                {content}
            </div>
        )
    }
}

export default MainMenuScreen;