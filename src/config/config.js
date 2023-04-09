const dotenv = require('dotenv')

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' })
} else {
  dotenv.config({ path: '.env.development' })
}

const ENV = process.env.NODE_ENV || 'development'

const CONFIG = {
  development: {
    app: {
      PORT: process.env.PORT || 4001
    },
    db: {
      uri: process.env.MONGODB_URI_CLUSTER
    },
    auth0: {
      client_origin: process.env.APP_ORIGIN,
      audience: process.env.AUTH0_AUDIENCE,
      issuer: process.env.AUTH0_ISSUER
    },
    jwt: {
      private_key: process.env.JWT_SECRET
    },
    firebase: {
      certConfig: {
        type: process.env.FB_CERT_TYPE,
        project_id: process.env.FB_CERT_PROJECT_ID,
        private_key_id: process.env.FB_CERT_PRIVATE_KEY_ID,
        private_key: process.env.FB_CERT_PRIVATE_KEY.replace(/\\n/gm, '\n'),
        client_email: process.env.FB_CERT_CLIENT_EMAIL,
        client_id: process.env.FB_CERT_CLIENT_ID,
        auth_uri: process.env.FB_CERT_AUTH_URI,
        token_uri: process.env.FB_CERT_TOKEN_URI,
        auth_provider_x509_cert_url:
          process.env.FB_CERT_AUTH_PROVIDER_X_509_CERT_URL,
        client_x509_cert_url: process.env.FB_CERT_CLIENT_X_509_CERT_URL
      }
    }
  },
  production: {
    app: {
      PORT: process.env.PORT || 4001
    },
    db: {
      url: 'http://localhost:4002/albums'
    },
    jwt: {
      private_key: process.env.JWT_SECRET
    },
    firebase: {
      certConfig: {
        type: process.env.FB_CERT_TYPE,
        project_id: process.env.FB_CERT_PROJECT_ID,
        private_key_id: process.env.FB_CERT_PRIVATE_KEY_ID,
        private_key: process.env.FB_CERT_PRIVATE_KEY.replace(/\\n/gm, '\n'),
        client_email: process.env.FB_CERT_CLIENT_EMAIL,
        client_id: process.env.FB_CERT_CLIENT_ID,
        auth_uri: process.env.FB_CERT_AUTH_URI,
        token_uri: process.env.FB_CERT_TOKEN_URI,
        auth_provider_x509_cert_url:
          process.env.FB_CERT_AUTH_PROVIDER_X_509_CERT_URL,
        client_x509_cert_url: process.env.FB_CERT_CLIENT_X_509_CERT_URL
      }
    }
  }
}

module.exports = CONFIG[ENV]
