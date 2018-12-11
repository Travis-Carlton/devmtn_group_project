const axios = require('axios');

module.exports = {
    login: (req, res) => {

        const payload = {
          client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
          client_secret: process.env.AUTH0_CLIENT_SECRET,
          code: req.query.code,
          grant_type: 'authorization_code',
          redirect_uri: `https://${req.headers.host}/auth/callback`
        };

        function tradeCodeForAccessToken() {
          return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload);
        }
        
        function tradeAccessTokenForUserInfo(response) {
          return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${response.data.access_token}`);
        }
        
        function storeUserInfoInDataBase(response) {
          const userData = response.data;
      
          return req.app.get('db').find_user_by_auth0_id(userData.sub).then(users => {
            if (users.length) {
              const user = users[0];
              req.session.user = user;
              res.redirect('/');
            } else {
              return req.app.get('db').create_user([
                userData.sub,
                userData.email,
                userData.name,
                userData.picture
              ]).then(newUsers => {
                const newUser = newUsers[0];
                req.session.user = newUser;
                res.redirect('/');
              }).catch(error => {
                console.log('error inserting user into database', error);
                res.status(500).json({ message: 'Error on server' });
              });
            }
          }).catch(error => {
            console.error('error in storeUserInfoInDatabase', error);
            res.status(500).json({ message: 'Error on server, sorry bro' });
          });
        }

        tradeCodeForAccessToken()
        .then(accessToken => tradeAccessTokenForUserInfo(accessToken))
        .then(userInfo => storeUserInfoInDataBase(userInfo))
        .catch(error => {
          console.error('-------------- error', error);
          res.status(500).json({ message: 'There was an unexpected error on the server.' })
        });
    }
}