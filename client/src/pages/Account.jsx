import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../config/Context";
import registerOption from "../utils/formValidation";

const Account = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [isSubmitting, setIsSubmiting] = useState(false);
  const { loginUser, registerUser, currentUser } = useStateContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (currentUser.token) {
      navigate("/");
    }
  }, [navigate, currentUser.token]);

  const switchMode = () => {
    setIsSignup((previsSignup) => !previsSignup);
  };

  const onSubmit = async ({ name, email, password }, e) => {
    e.preventDefault();
    setIsSubmiting(true);
    if (isSignup) {
      await registerUser(name, email, password);
    } else {
      await loginUser(name, password);
    }

    setIsSubmiting(false);
  };
  return (
    <Container className="py-5 mt-5">
      <div className="border border-danger px-2 logo-width">
        <p className="texting mb-0">Footshop</p>
        <h1 className="text-danger display-3">SHOP</h1>
      </div>
      <div style={{ border: "1px solid red" }} className="mt-5 mb-5" />
      <h1 className="heading text-center">
        {isSignup ? "Get started" : "Log in"}
      </h1>
      <Form className="mt-4 mx-auto" style={{ width: "270px" }} onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formBasicName" className="mb-4">
          <Form.Control
            type="text"
            placeholder="Username"
            className="mb-0 rounded-0"
            {...register("name", registerOption.name)}
          />
          {errors?.name && (
            <span className="text-danger small">{errors.name.message}</span>
          )}
        </Form.Group>
        {isSignup && (
          <Form.Group controlId="formBasicEmail" className="mb-4">
            <Form.Control
              type="email"
              placeholder="Email Address"
              className="mb-0 rounded-0"
              {...register("email", registerOption.email)}
            />
            {errors?.email && (
              <span className="text-danger small">{errors.email.message}</span>
            )}
          </Form.Group>
        )}
        <Form.Group controlId="formBasicPassword" className="mb-4">
          <Form.Control
            type="password"
            placeholder="Enter Password"
            className="mb-0 rounded-0"
            {...register("password", registerOption.password)}
          />
          {errors?.password && (
            <span className="text-danger small">{errors.password.message}</span>
          )}
        </Form.Group>
        {isSignup ? (
          <Button variant="dark" type="submit" className="rounded-0 w-100">
            {isSubmitting ? "loading..." : "Sign Up"}
          </Button>
        ) : (
          <Button variant="dark" type="submit" className="rounded-0 w-100">
            {isSubmitting ? "loading..." : "Log In"}
          </Button>
        )}
        {!isSignup && <p className="small mt-4 cursor" onClick={switchMode}>Create an account</p>}
        {isSignup && (
          <p className="small mt-4 cursor" onClick={switchMode}>Create an account? Log in</p>
        )}
      </Form>
    </Container>
  );
};

export default Account;
