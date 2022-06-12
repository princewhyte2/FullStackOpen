module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "cypress/globals": true
    },
    "extends": ["eslint:recommended", "airbnb"],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
   "plugins": [
        "react", "jest", "cypress"
    ],



}