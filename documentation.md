# Bees API

This is an API to learn all about BEES.

## API Endpoints

* The following is a list of all of the endpoints that you have available for use with our API.

| TYPE   | URL              | DATA                                                |
| ------ | ---------------- | --------------------------------------------------- |
| POST   | /api/bees/create | *breed, gentleness, swarming, *honey, propolis      |
| GET    | /api/bees        | retieves a list of bee breeds                       |
| PUT    | /api/bees/id     | allows a bee breed to be updated if you have the id |
| DELETE | /api/bees/id     | allows a bee breed to be deleted                    |

* all fields marked with `*` are required
