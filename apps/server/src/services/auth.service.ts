import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  SignUpCommandInput,
  InitiateAuthCommand, // New import
  InitiateAuthCommandInput, // New import
} from '@aws-sdk/client-cognito-identity-provider';

// Initialize the Cognito Client
const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
});

// This function sends user details to AWS Cognito to create a new user
export const registerUser = async (userData: any) => {
  // ... (The registerUser function remains unchanged)
  const { email, password, firstName, lastName } = userData;

  const params: SignUpCommandInput = {
    ClientId: process.env.AWS_COGNITO_CLIENT_ID!,
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'given_name', Value: firstName },
      { Name: 'family_name', Value: lastName },
    ],
  };

  try {
    const command = new SignUpCommand(params);
    const response = await cognitoClient.send(command);
    console.log('User registered successfully:', response);
    return response;
  } catch (error) {
    console.error('Error during user registration:', error);
    throw error;
  }
};

// --- NEW FUNCTION ---
// This function sends credentials to AWS Cognito to log in a user
export const loginUser = async (userData: any) => {
  const { email, password } = userData;

  const params: InitiateAuthCommandInput = {
    ClientId: process.env.AWS_COGNITO_CLIENT_ID!,
    AuthFlow: 'USER_PASSWORD_AUTH',
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  try {
    const command = new InitiateAuthCommand(params);
    const response = await cognitoClient.send(command);
    console.log('User logged in successfully:', response);
    return response.AuthenticationResult; // We only need the tokens
  } catch (error) {
    console.error('Error during user login:', error);
    throw error;
  }
};