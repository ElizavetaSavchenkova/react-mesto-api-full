import { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onLogin({ email, password });
  }

  return (
    <section className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__form-title">Вход</h2>
        <fieldset className="login__form-fieldset">
          <label className="login__form-label">
            <input className="login__form-input" id="emailLog" type="email" name="emailLogInput"
              placeholder="Email" value={email || ''} required onChange={handleEmailChange} />
            <span className="login__form-input-error"></span>
          </label>
          <label className="login__form-label">
            <input className="login__form-input" id="passwordLog" type="password" name="passwordLogInput"
              placeholder="Пароль" autoComplete="off" required value={password || ''} onChange={handlePasswordChange} />
            <span className="login__form-input-error"></span>
          </label>
          <button className="login__button button" type="submit">Войти</button>
        </fieldset>
      </form>
    </section>
  );
}

export default Login;
