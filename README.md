# campuSnacks Backend

## Setup
- Node version `18.18.2`
- npm version `9.8.1`
- `PostgreSQL` version 14
- Use `npm ci` to get versioned modules
- Create `.env` file with copying `.template.env` file.
- Run `npm run build` to compile project.
- use `npm run db:reset` to reset the DB.
- use `npm run 'db:migrate'` to get latest migrations.
- use `npm run 'db:seed'` to seeding.

## Linting
All code must be properly linted.
- Use `npm run lint`

## Start
- For development use `npm run dev`
- Or `npm run dev-alt` to not use `nodemon`

## Swagger
- Navigate to `{host}/api-docs`

