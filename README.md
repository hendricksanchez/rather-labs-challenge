# Company Name Survey

Company Name Survey is a web application that allows you to earn QUIZ tokens by taking surveys.

## Technologies

React 18.1.0
Next.js 12.1.6
Web3 1.7.3
Dotenv 16.0.1
TailwindCSS 3.0.24

## To get started

### Related to your particular account in Metamask

First, download the Metamask extension in your browser.

Next, create an account in Metamask and configure it; take note (copy) of the account address in the wallet that was assigned to you, which must start at 0x...

When entering Metamask, the ETH token is observed by default, which will have a value of 0, therefore, we must obtain some ETH to be able to operate with the application.

There are several websites where you can get some test ETH for free. One of these is https://faucet.dimensions.network/, where by placing the address (copied in the previous step) we can obtain some ETH.

Note: Allocation of test ETH can take minutes or even a few hours, please be patient. It will be reflected in the ETH token within Metamask.

### Related to application settings

The application allows the management of different execution environments (local, development, integration and production).

For this, inside the src/environments folder there is a configuration file for each execution environment.

These environment configuration files take into account three variables required for the correct operation of the application.

These are:

CHAIN_ID: Numeric ID that indicates the network to which the application will connect.

CONTRACT_ADDRESS: Alphanumeric address where the smart contract by which the application is governed is deployed.

SURVEY_URL: URL with the survey data in JSON notation.

To run the application just indicate:

```bash
npm run local
# or
yarn local
```

Additionally, the /src/contract-abi.json file exposes the methods available by the smart contract (already deployed on the blockchain) and that allow the application to call them.

## Application deployed on a server

You can visit the site https://rather-labs-challenge-black.vercel.app/ to run the app directly.

## Images of the running application

![My Image](src/1.jpg)
![My Image](src/2.jpg)
![My Image](src/3.jpg)
![My Image](src/4.jpg)
![My Image](src/5.jpg)
![My Image](src/6.jpg)
![My Image](src/7.jpg)
![My Image](src/8.jpg)
![My Image](src/9.jpg)
![My Image](src/10.jpg)
![My Image](src/11.jpg)
![My Image](src/12.jpg)
![My Image](src/13.jpg)
![My Image](src/14.jpg)