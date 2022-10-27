import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { actions as userActions } from "../features/userReducer";
import { useDispatch } from "react-redux";
import "../styles/_userForm.scss";
import formLogo from "../assets/formLogo.svg";
import Alert from "../components/Alert";
import "../styles/_alert.scss";

type userLogin = {
  name: string;
  password: string;
};
type errorType = {
  title: string;
  message: string;
};

const LoginView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<boolean>(false);

  const [errorElement, showError] = useState<boolean>(false);
  const [errorMessages, makeError] = useState({ title: "", message: "" });
  const showAlert = errorElement ? (
    <Alert
      errorTitle={errorMessages.title}
      errorMessage={errorMessages.message}
      showError={showError}
    />
  ) : (
    ""
  );
  let tempObject: errorType = { title: "", message: "" };

  async function userLogin() {
    setLoading(true);
    let userCreds: userLogin = {
      name: userName,
      password: userPassword,
    };
    if (userCreds.name == "" || userCreds.password == "") {
      tempObject.title = "Inga personuppgifter";
      tempObject.message = "Kan inte logga in utan personuppgifter";
      makeError(tempObject);
      showError(true);
      setLoading(false);
      return;
    }

    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify(userCreds),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log("response data: ", data);
    if (data.success) {
      setLoading(false);
      dispatch(userActions.setUser(data.user));
      localStorage.setItem("accountId", JSON.stringify(data.user.accountId));
      if (data.user.admin) {
        navigate("/AdminPage");
      } else {
        navigate("/menu");
      }
    } else {
        tempObject.title = "Inloggningen misslyckades";
        tempObject.message = "Du har anget fel användarnamn eller lösenord, försök igen";
        makeError(tempObject);
        showError(true);
        setLoading(false);
        return;
      
    }
  }

  const handleName: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    if (e.target.value !== " ") {
      setUserName(e.target.value);
    }
  };
  const handlePassword: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    setUserPassword(e.target.value);
  };

  const handleSubmit: (e: FormEvent) => void = (e) => {
    e.preventDefault();
    userLogin();
  };

  return (
    <div className="login">
      {loading ? <div className="loading"></div> : ""}
      <button className="small__btn" onClick={() => navigate(-1)}>
        Tillbaka
      </button>
      <figure className="form__logo">
        <img src={formLogo} alt="logo" />
      </figure>
      <form className="userForm">
        <div>
          <input
            className="form__input"
            placeholder=" "
            type="text"
            name="username"
            required
            onChange={(e) => {
              handleName(e);
            }}
          />
          <label
            className="form__label form__label--info"
            placeholder=" "
            htmlFor="username"
          >
            Användarnamn
          </label>
        </div>
        <div>
          <input
            className="form__input"
            placeholder=" "
            type="password"
            name="password"
            required
            onChange={(e) => {
              handlePassword(e);
            }}
          />
          <label
            className="form__label form__label--info"
            placeholder=" "
            htmlFor="password"
          >
            Lösenord
          </label>
        </div>
        <p>
          Inget konto? <a href="/SignUp"> Skapa </a>
        </p>
        <div>
          <button
            className="big__btn login__btn"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Logga in
          </button>
        </div>
      </form>
      {showAlert}
    </div>
  );
};

export default LoginView;
