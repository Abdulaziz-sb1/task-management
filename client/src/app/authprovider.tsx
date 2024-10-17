import React, { ReactNode } from 'react';
import { Authenticator } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify';
import "@aws-amplify/ui-react/styles.css"

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
            userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || ""
        }
    }
})
const formFields = {
    signUp: {
      username: {
        order: 1,
        placeholder: "Choose a Username",
        label: "Username",
        inputProps: {required: true}
      },
      email: {
        order: 2,
        placeholder: "Enter your email",
        label: "Email",
        inputProps: {type: "email",required: true}
      },
      password: {
        order: 3,
        placeholder: "Enter your password",
        label: "Password",
        inputProps: {type:"password", required: true}
      },
      confirm_password: {
        order: 4,
        placeholder: "Confirm your password",
        label: "Confirm your password",
        inputProps: {type: "password", required: true}
      },
    }
  }
type AuthProviderProps = {
    children: ReactNode;
};

const AuthProvider = ({children}: AuthProviderProps) => {
    return (
        <div>
            <Authenticator formFields={formFields}>
                {({ user }) => user ? ( <div>{children}</div> ) : (
                    <div>
                        <h1>
                            Please sign in below:
                        </h1>
                    </div>
                )}
            </Authenticator>
        </div>
    )
}

export default AuthProvider