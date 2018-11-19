import AWS from 'aws-sdk';
import Auth from './auth';

AWS.config.region =  process.env.VUE_APP_AWS_REGION;
AWS.config.credentials = null;

function SendMessage(message) {

    return new Promise((resolve, reject) => {
        Auth.GetCredentials()
        .then( data => { 
            AWS.config.credentials = data.credentials;
            const lex = new AWS.LexRuntime();
            const params = {
                botAlias: '$LATEST',
                botName: process.env.VUE_APP_BOT_NAME,
                inputText: message,
                userId: process.env.VUE_APP_USER_ID,
                sessionAttributes: {
                    token: data.session.getIdToken().getJwtToken(),
                },
            };
        
            lex.postText(params, (err, result) => {
                if(err) {
                    console.error(err);
                    reject(err);
                }
                else {
                    console.log(result);
                    resolve(result);
                }
            });    
        });
    });
}

export default {
    SendMessage,
}