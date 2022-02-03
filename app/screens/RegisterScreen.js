import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required().min(6).label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen() {
  const registerApi = useApi(authApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    const result = await registerApi.request(userInfo);

    if (!result.ok) {
      if (result.data) setError(result.data);
      else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
      return;
    }

    // desctructuring με alias - υποχρεωτικά με το όνομα του property
    const { data: {token} } = await loginApi.request(
      userInfo.email,
      userInfo.password
    );
    auth.logIn(token);

    // const loginData = await loginApi.request(
    //   userInfo.email,
    //   userInfo.password
    // );
    // auth.logIn(loginData.data.token);
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Screen style={styles.container}>
        <Form
          initialValues={{ fullname: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <FormField
            autoCorrect={false}
            icon="account"
            name="fullname"
            placeholder="Name"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Register" />
        </Form>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
