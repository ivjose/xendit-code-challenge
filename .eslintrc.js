module.exports = {
  root: true,
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  plugins: ['react', 'prettier'],
  extends: [
    'react-app', // eslint-config-react-app
    'airbnb', // eslint-config-airbnb
    'prettier', // eslint-config-prettier
  ],

  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.js', '.jsx'],
      },
    ],
  },
}
