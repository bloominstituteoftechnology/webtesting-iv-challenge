GET /animals
Status: 200
Example Response:
{
"name": "tiger",
"continent": "Asia"
}


POST /animals
Status: 200
Example Input:
{
"name": "elephant",
"Continent": "Africa"
}

Example Response:
{
"name": "elephant",
"Continent": "Africa"
}

PUT /animals/:name
Status: 200
Example Input:
localhost:3030/animals/bear
{
"name": "bear",
"Continent": "North America"
}

Example Response:
{
"name": "bear",
"Continent": "North America"
}


DELETE /animals/:name
Status: 200
Example Input:
localhost:3030/animals/sloth

Example Response: 
{
"Success": True
}

