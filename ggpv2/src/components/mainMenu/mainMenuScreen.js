import React from 'react';
import LoginForm from './loginForm';

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
                    <div className="d-flex justify-content-center flex-column" >
                        <button onClick={() => this.renderLoginForm()}>Login</button>
                        <button onClick={() => this.renderRegisterForm()}>Register</button>
                    </div>
                )
                break;
            case 'login':
                return <LoginForm />
                break;
        }
    }

    render() {
        const content = this.renderContent()
        return (
            <div className="d-flex justify-content-center flex-column" style={{ width: "1024px", height: "800px" }}>
                {content}
            </div>
        )
    }
}

export default MainMenuScreen;