import LoginForm from "../../components/LoginForm/LoginForm"
import '../LoginPage/LoginPage.css';

const LoginPage = () => {
    return (
        <div className="LoginPage-container">
            <main className="LoginPage-main">
                <div className="LoginPage-background">
                    <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80" />

                </div>
                <div className="LoginFrame">
                    <LoginForm />
                </div>
            </main>
            <div className="LoginPage-footer"></div>
        </div>
    );
};
export default LoginPage;