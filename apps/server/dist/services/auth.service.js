"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
// Initialize the Cognito Client
const cognitoClient = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({
    region: process.env.AWS_REGION,
});
// This function sends user details to AWS Cognito to create a new user
const registerUser = async (userData) => {
    // ... (The registerUser function remains unchanged)
    const { email, password, firstName, lastName } = userData;
    const params = {
        ClientId: process.env.AWS_COGNITO_CLIENT_ID,
        Username: email,
        Password: password,
        UserAttributes: [
            { Name: 'email', Value: email },
            { Name: 'given_name', Value: firstName },
            { Name: 'family_name', Value: lastName },
        ],
    };
    try {
        const command = new client_cognito_identity_provider_1.SignUpCommand(params);
        const response = await cognitoClient.send(command);
        console.log('User registered successfully:', response);
        return response;
    }
    catch (error) {
        console.error('Error during user registration:', error);
        throw error;
    }
};
exports.registerUser = registerUser;
// --- NEW FUNCTION ---
// This function sends credentials to AWS Cognito to log in a user
const loginUser = async (userData) => {
    const { email, password } = userData;
    const params = {
        ClientId: process.env.AWS_COGNITO_CLIENT_ID,
        AuthFlow: 'USER_PASSWORD_AUTH',
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password,
        },
    };
    try {
        const command = new client_cognito_identity_provider_1.InitiateAuthCommand(params);
        const response = await cognitoClient.send(command);
        console.log('User logged in successfully:', response);
        return response.AuthenticationResult; // We only need the tokens
    }
    catch (error) {
        console.error('Error during user login:', error);
        throw error;
    }
};
exports.loginUser = loginUser;
