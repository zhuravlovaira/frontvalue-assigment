# Frontvalue assigment

App is hosted on `https://poetic-lolly-f07ce6.netlify.app`

You can check E2E and unit tests in the GitHub actions tab.

If you want to test the app locally please pull the project, run:

```
npm i
npm start
```

Navigate to `http://localhost:4200/`

![Main-page](https://github.com/zhuravlovaira/frontvalue-assigment/assets/17531782/ce27f9d1-f60a-4bd4-af19-f79f8a71e31f)

## Development details

The app is using `changeDetection: ChangeDetectionStrategy.OnPush` for all components for better performance, hence all data in the app is immutable.

`PrimeNG` components library is used for visial part.

## Unit tests

If you want to run unit tests locally please run:

```
npm run test
```

## e2e tests

If you want to run e2e tests locally please run:

```
npm start
```

And in parallel:

```
npm run open:cypress
```
