# frontend-ziltag.com

## Development
### Initialize Database
`npm run docker:initdb`

### Migrate Database
`npm run docker:migrate`

### Upgrade
`npm run docker:upgrade`

This command equals `npm run docker:pull && npm run docker:build && npm run docker:migrate`.

### Run dev server
May operate by `hotel`.

`npm run docker:serve`

### Operate npm
Note: must run dev server first.

`npm run docker:npm -- command`

e.g.

`npm run docker:npm -- i -S react`

`npm run docker:npm -- rm -S react`

### Lint
`npm run docker:npm -- run lint`
