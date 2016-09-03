# frontend-ziltag.com

## Development
### Preliminary Operation
Go to project `ziltag.com` and register `ziltag.com`'s image to local docker registry (will be eliminated after we push images to docker hub).

`docker tag ${name or id of ziltag.com's image} localhost:5000/ziltag.com && docker push localhost:5000/ziltag.com`

Go to project `frontend-ziltag.com` and register `frontend-ziltag.com`'s image to local docker registry (will be eliminated after we push images to docker hub).

`npm run docker:build && npm run docker:push`

Go to project `ziltag-plugin` and register `ziltag-plugin`'s image to local docker registry (will be eliminated after we push images to docker hub).

`npm run docker:build && npm run docker:push`

### Initialize Database
`npm run docker:initdb`

### Migrate Database
`npm run docker:migrate`

### Run dev server
May operate by `hotel`.

`npm run docker:serve`

### Operate npm
Note: must run dev server first.

`npm run docker:npm -- command`

e.g.

`npm run docker:npm -- i -S react`

`npm run docker:npm -- rm -S react`
