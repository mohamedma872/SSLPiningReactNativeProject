# React Native SSL Pinning Example

This is a sample React Native application that demonstrates how to implement SSL pinning using the `react-native-ssl-public-key-pinning` package.

## Introduction

SSL pinning is a security feature that helps prevent man-in-the-middle attacks by validating the server's certificate against known hashes of the server's public key. This sample app sets up SSL pinning for requests to `google.com` and includes error handling for SSL pinning mismatches.

## Prerequisites

Before you run this project, ensure you have the following installed:

- Node.js
- npm or Yarn
- React Native CLI (if not using Expo)
- An emulator or device to run a React Native app

## Installation

To get started with this project, clone the repository and install the dependencies:

\`\`\`bash
git clone https://github.com/your-username/react-native-ssl-pinning-example.git
cd react-native-ssl-pinning-example
npm install
\`\`\`

## Running the App

To run the app on an emulator or a physical device, use the following commands:

\`\`\`bash
npx react-native run-android   # For Android
npx react-native run-ios       # For iOS
\`\`\`

## Key Features

- **SSL Pinning Setup:** Initialize SSL pinning for `google.com` with multiple public key hashes.
- **Error Handling:** Listen to SSL pinning errors and log them for debugging purposes.
- **Network Request:** Example of a network request to `google.com` with SSL pinning applied.

## Code Overview

The main logic for setting up SSL pinning and making a secured request is in `App.js`. Here's a brief overview:

### Initialize SSL Pinning

SSL pinning is initialized in a `useEffect` hook when the app starts:

\`\`\`javascript
useEffect(() => {
  const setupSslPinning = async () => {
    try {
      await initializeSslPinning({
        'google.com': {
          includeSubdomains: true,
          publicKeyHashes: [
            'CLOmM1/OXvSPjw5UOYbAf9GKOxImEp9hhku9W90fHMk=',
            'hxqRlPTu1bMS/0DITB1SSu0vd4u/8l8TjPgfaAp63Gc=',
            'Vfd95BwDeSQo+NUYxVEEIlvkOlWY2SalKK1lPhzOx78=',
            'QXnt2YHvdHR3tJYmQIr0Paosp6t/nggsEGD4QJZ3Q0g=',
            'mEflZT5enoR1FuXLgYYGqnVEoZvmf9c2bVBpiOjYQ0c=',
          ],
        },
      });
      console.log('SSL pinning initialized successfully');
    } catch (error) {
      console.error('Failed to initialize SSL pinning', error);
    }
  };

  setupSslPinning();
}, []);
\`\`\`

### Make a Secured Network Request

A network request to `google.com` with SSL pinning is made in the same `useEffect` hook:

\`\`\`javascript
const callApi = async() => {
  try {
    const response = await fetch('https://www.google.com');
  } catch (error) {
    console.log(error);
  }
}
callApi();
\`\`\`

### Listen to SSL Pinning Errors

Another `useEffect` hook is used to listen for any SSL pinning errors:

\`\`\`javascript
useEffect(() => {
  const subscription = addSslPinningErrorListener((error) => {
    console.log(error.serverHostname);
    console.log(error.message);
  });
  return () => {
    subscription.remove();
  };
}, []);
\`\`\`

## Contributing

Feel free to fork this repository and submit pull requests to contribute to this project.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
