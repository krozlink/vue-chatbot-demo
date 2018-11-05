import Cognito from 'amazon-cognito-identity-js';

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
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    } else {
      reject(new Error('No current user'));
    }
  });
}

export default {
  Login,
  Register,
  GetCurrentUser,
};
