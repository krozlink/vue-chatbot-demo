import * as Cognito from 'amazon-cognito-identity-js';

const PoolData = {
  UserPoolId: process.env.VUE_APP_AWS_COGNITO_USER_POOL_ID,
  ClientId: process.env.VUE_APP_AWS_COGNITO_CLIENT_ID,
};

function Login(user, password) {
  return new Promise((resolve, reject) => {
    const authData = new Cognito.AuthenticationDetails({
      Username: user,
      Password: password,
    });

    const userPool = new Cognito.CognitoUserPool(PoolData);

    const cognitoUser = new Cognito.CognitoUser({
      Username: user,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authData, {
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
}

function Register(user, email, password) {
  return new Promise((resolve, reject) => {
    const userPool = new Cognito.CognitoUserPool(PoolData);

    const attributes = [
      new Cognito.CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),
    ];

    userPool.signUp(user, password, attributes, null, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function GetCredentials() {
  return new Promise((resolve, reject) => {
    const userPool = new Cognito.CognitoUserPool(PoolData);
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser !== null) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          reject(sessionErr);
          return;
        }

        const login = `cognito-idp.${process.env.VUE_APP_AWS_REGION}.amazonaws.com/${process.env.VUE_APP_AWS_COGNITO_USER_POOL_ID}`;
        const credentials = new AWS.CognitoIdentityCredentials({ 
          IdentityPoolId: process.env.VUE_APP_AWS_COGNITO_IDENTITY_POOL_ID,
          Logins: {
            [login]: session.getIdToken().getJwtToken(),
          }
        });
      
        resolve({credentials, session});
        console.log(`session validity: ${session.isValid()}`);
      });
    } else {
      reject(new Error('No current user'));
    }
  });
}

function GetCurrentUser() {
  return new Promise((resolve, reject) => {
    const userPool = new Cognito.CognitoUserPool(PoolData);
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser !== null) {
      cognitoUser.getSession((sessionErr, session) => {
        if (sessionErr) {
          reject(sessionErr);
          return;
        }

        console.log(`session validity: ${session.isValid()}`);

        cognitoUser.getUserData((err, data) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(data);
            resolve(data);
          }
        });
      });
    } else {
      reject(new Error('No current user'));
    }
  });
}

function ConfirmRegistration(user, code) {
  return new Promise((resolve, reject) => {

    const userPool = new Cognito.CognitoUserPool(PoolData);

    const cognitoUser = new Cognito.CognitoUser({
      Username: user,
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(authData, true, (err, result) => {
      if(err) {
        console.error(err);
        reject(err);
      } else {
        console.log(result);
        resolve(result);
      }
    });
  });
}

function ResendCode(user) {
  return new Promise((resolve, reject) => {


    const userPool = new Cognito.CognitoUserPool(PoolData);

    const cognitoUser = new Cognito.CognitoUser({
      Username: user,
      Pool: userPool,
    });

    cognitoUser.confirmRegistration((err, result) => {
      if(err) {
        console.error(err);
        reject(err);
        return;
      }
      console.log('Code resent');
      resolve(result);
    });
  });
}

export default {
  Login,
  Register,
  GetCurrentUser,
  ConfirmRegistration,
  ResendCode,
  GetCredentials
};
