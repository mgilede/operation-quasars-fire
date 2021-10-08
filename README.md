# operation-quasars-fire

Project Operation Quasar's Fire

This is an operation of vital importance for the Rebel Alliance. This will give an edge in galactic war for the freedom of the galaxy.

## Prerequisites

- Docker
- NodeJs v12.X
- npm
- Mongo Database

## Getting Started

Copy the `.env.example` into the `.env` file and set the port and DB conection.

Install dependencies running:

```sh
$ npm install
```

#### Running locally.

```sh
$ npm start
```

#### Docker Compose local
- The server can also run in a docker container locally by using the following commands to start the server.

```sh
$ docker-compose up --build --force-recreate -d
```

## Stop Docker container

```sh
$ docker-compose down --volumes
```
## Clean Docker Volumens and images
```sh
$ docker system prune -a --volumes
```

#### Navigate to the API:

http://localhost

## Notes:

- The project is hosted in two independant servers.
- Production is located in http://operation-quasars-fire.codemg.com
- Staging is located in http://stg-operation-quasars-fire.codemg.com
- This repository is originally hosted over GitLab to be able to implement Continous Integration and Continous Deployment. The Repo's URL is: https://gitlab.com/code-mg/operation-quasars-fire
- It is also hosted on GitHub to comply with the requirement on the URL: https://github.com/mgilede/operation-quasars-fire

### API consumption
- The server has 4 enpoints to be able to use on different ways.
- The first endpoint over `POST` goes to the path `/topsecret/` and is a simple `JSON` request where all the information is sent and the system return the values calculated.
- The second endpoint is over `POST` and uses the path `/topsecret_split/` using a `URI` parameter `satellite_name`(`/topsecret_split/satellite_name`) to use as an `index` to store information in the system, allowing the user to assemble the information required to calculate the position and message.
- The third endpoint is over `GET`, uses the path `/topsecret_split/` and is intended to request the information stored in the last endpoint and return the calculation.
- The last endpoint is intended to clear or wipe the DB in order to be able to start over the proccess of storing parts of the message. This endpoint works over `DELETE` on the path `/topsecret_split/`.

## API requests in cURL
### First Endpoint `POST` => `/topsecret/`
```sh
$ curl --request POST \
  --url http://operation-quasars-fire.codemg.com/topsecret \
  --header 'Content-Type: application/json' \
  --data '{
	"satellites": [
		{
			"name": "kenobi",
			"distance": 1442,
      "message": ["este", "", "", "mensaje", ""]
		},
		{
			"name": "skywalker",
			"distance": 921,
			"message": ["", "es", "", "", "secreto"]
		},
		{
			"name": "sato",
			"distance": 538,
			"message": ["este", "", "un", "", ""]
		}
	]
}'
```
### Second Endpoint `POST` => `/topsecret_split/satellite_name`
```sh
$ curl --request POST \
  --url http://operation-quasars-fire.codemg.com/topsecret_split/skywalker \
  --header 'Content-Type: application/json' \
  --data '
	{
		"distance": 600,
		"message": ["", "es", "", "", "secreto"]
	}'
```
### Third Endpoint `GET` => `/topsecret_split/`
```sh
$ curl --request GET \
  --url http://operation-quasars-fire.codemg.com/topsecret_split/
```
### Fourth Endpoint `DELETE` => `/topsecret_split/`
```sh
$ curl --request DELETE \
  --url http://stg-operation-quasars-fire.codemg.com/topsecret_split
```