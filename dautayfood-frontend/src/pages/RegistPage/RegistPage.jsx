import RegistForm from "../../components/RegistForm/RegistForm"
import '../RegistPage/RegistPage.css';

const RegistPage = () => {
    return (
        <div className="RegistPage-container">
            <main className="RegistPage-main">
                <div className="RegistPage-background">
                    <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80" />

                </div>
                <div className="RegistFrame">
                    <RegistForm />
                </div>
            </main>
            <div className="RegistPage-footer"></div>
        </div>
    );
};
export default RegistPage;