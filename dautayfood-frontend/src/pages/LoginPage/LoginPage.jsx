import LoginForm from "../../components/LoginForm/LoginForm";
import ScrollToTop from '../../ScrollToTop';

const LoginPage = () => {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-100">
            <ScrollToTop />

            {/* Nội dung chính */}
            <main className="flex-1 relative flex items-center justify-center px-4 py-8">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80"
                        alt="Background"
                        className="w-full h-full object-cover object-center brightness-75"
                    />
                </div>

                {/* Form */}
                <div className="relative z-10 w-full max-w-md flex justify-center">
                    <LoginForm />
                </div>
            </main>

            {/* Footer */}

        </div>
    );
};

export default LoginPage;
