import Header from "../components/Header";
import LoginPage from "../components/LoginPage";
//this page is the Login page that will the input as name and email
function Login() {
  return (
    <div className="Login">
      <Header />
      <br />
      <br />
      <LoginPage />
    </div>
  );
}

export default Login;
