# ft-api

## Installation
1. If you haven't got the Serverless Framework installed on your machine, you'l need to run this command. 

```
$ npm install serverless -g
```
This will install Serverless golbally. For more information: https://serverless.com

2. Install all the relevant dependancies.
```
npm install
```

3. Once serverless is installed, you'll need to deply the project to AWS. This will create a DynamoDB database, a set of Lambda Function, and IAM role for permissions and an API Gateway.
```
sls deploy
```

4. Once the project has been deployed, you'll have all the end points presented in Terminal. You will also be given an API Key.
In order to send requests to the API you'll need to add *'x-api-key'* with the value of the API key to the request's header.

## Unit Testing
There's an example of a unit test in the project that can be run locally with
```
npm run test
```

## Offline
Once the package had been deployed once, you can run the code locally with this comment
```
npm run offline
```
Bear in mind that the code will be run offline, but it will still connect the the database on aws.
