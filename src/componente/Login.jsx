/* eslint-disable react/prop-types */
import { useState } from "react";
import { auth } from "../../scripts/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ setEstaIniciado }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function loginFirebase(event) {
    event.preventDefault();
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then(setEstaIniciado(true))
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <section className="login-container">
      <h1 className="login-title">Loguear</h1>
      <form className="login-form" onSubmit={loginFirebase}>
        <label className="login-label" htmlFor="email">
          Email
        </label>
        <input
          className="login-input"
          type="email"
          name="email"
          id="email"
          placeholder="Escribe su email"
          onChange={handleChange}
          value={form.email}
        />
        <label className="login-label" htmlFor="password">
          Password
        </label>
        <input
          className="login-input"
          type="password"
          name="password"
          id="password"
          placeholder="Escribe su password"
          onChange={handleChange}
          value={form.password}
        />
        <button className="submit-btn">Enviar</button>
      </form>
    </section>
  );
}
