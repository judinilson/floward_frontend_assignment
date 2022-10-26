/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import { history } from "../../helpers";
import { authActions } from "../../store";

export { Login };

function Login() {
  const dispatch = useDispatch();
  const authUser = useSelector((x) => x.auth.user);
  const authError = useSelector((x) => x.auth.error);

  useEffect(() => {
    // redirect to home if already logged in
    if (authUser) history.navigate("/");
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    const user = rememberMe ? localStorage.getItem("user") : "";
    setValue("email", user);
  }, []);

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .min(4, "Password must be more than 4 characters")
      .required("Password is required"),
  });
  const formOptions = {
    resolver: yupResolver(validationSchema),
  };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit({ email, password, rememberMe }) {
    storeRememberMe(rememberMe, email);
    return dispatch(authActions.login({ email, password }));
  }

  const storeRememberMe = (rememberMe, email) => {
    localStorage.setItem("rememberMe", rememberMe);
    localStorage.setItem("user", rememberMe ? email : "");
  };

  return (
    <div className="p-3 my-5 container">
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div className="col-8">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Phone image"
          />
        </div>

        <div className="col-4  ">
          {/* <div className="alert alert-info">
            email: test
            <br />
            Password: test
          </div> */}

          {/* <h4 className="card-header">Login</h4> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              {/* <label>email</label> */}

              <input
                placeholder="Email"
                name="email"
                type="email"
                {...register("email")}
                className={`form-control mb-4 ${
                  errors.email ? "is-invalid" : "mt-6"
                }`}
              />
              <div className="invalid-feedback mb-2">
                {errors.email?.message}
              </div>

              {/* <label>Password</label> */}
              <input
                placeholder="Password"
                name="password"
                type="password"
                {...register("password")}
                className={`form-control mb-1 ${
                  errors.password ? "is-invalid" : "mt-6"
                }`}
              />
              <div className="invalid-feedback mb-2">
                {errors.password?.message}
              </div>
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  {...register("rememberMe")}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Remember me
                </label>
              </div>
            </div>

            <button
              disabled={isSubmitting}
              className="btn btn-primary mb-4 w-100"
            >
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Login
            </button>
            {authError && (
              <div className="alert alert-danger mt-3 mb-0">
                {authError.message}
              </div>
            )}
          </form>

          {/* <div className="card-body"></div> */}
        </div>
      </div>
    </div>
  );
}
