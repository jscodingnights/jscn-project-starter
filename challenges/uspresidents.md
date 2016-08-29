# US President Voting App
Create an app that some random citizen can use to vote in the upcoming presidental election!

Use React or any client of your choice!

**Remember**: React is a view engine!  Focus on good looking UI. Pick one single bit of functionality to focus on first before trying to implement the entire app.

## App Spec

Citizens can:

* see a list of candidates (GET /candidates)
* vote as much as they like, but only the most recent vote counts. (POST /votes)
* see which candidate was voted for by every other citizen. (GET /summary)
* see which candidate is the current winner (GET /summary)

Citizens are unique by their IP address.

## Recommended Workflow

If you want to do React + Redux:

* Focus on consuming the summary API
* Create a single reducer for consuming that data
* Use react-redux to connect react components to the global state
* Make a nice UI for the available data

## API Documentation

###`GET /summary` - Get entire app summary
```json
{
    "candidates": [
        {
            "id": 1,
            "name": "Hillary Clinton",
            "photoUrl": "http://www.newsbiscuit.com/wp-content/uploads/2015/10/hillary-clinton-womenjpeg-045d7.jpg"
        }
    ],
    "allVotes": [
        {
            "id": 1,
            "candidateId": 2,
            "voterId": "democratA",
            "createdOn": "2015-10-28T20:05:43.150Z"
        }
    ],
    "allVotesByCitizen": {
        "192.168.1.100": [
            {
                "id": 1,
                "candidateId": 2,
                "voterId": "democratA",
                "createdOn": "2015-10-28T20:05:43.150Z"
            }
        ]
    },
    "countingVotesByCitizen": {
        "192.168.1.100": {
            "id": 1,
            "candidateId": 2,
            "voterId": "democratA",
            "createdOn": "2015-10-28T20:05:43.150Z"
        }
    },
    "candidateScores": {
        "1": 1
    },
    "winningCandidate": {
        "id": 1,
        "name": "Hillary Clinton",
        "photoUrl": "http://www.newsbiscuit.com/wp-content/uploads/2015/10/hillary-clinton-womenjpeg-045d7.jpg"
    }
}
```

###`GET /candidates` - Retrieve the list of candidates
**response**
```json
[
    {
        "id": 1,
        "name": "Hillary Clinton",
        "photoUrl": "http://www.newsbiscuit.com/wp-content/uploads/2015/10/hillary-clinton-womenjpeg-045d7.jpg"
    },
    {
        "id": 2,
        "name": "Donald Trump",
        "photoUrl": "http://images.huffingtonpost.com/2016-07-15-1468607338-43291-DonaldTrumpangry.jpg"
    }
]
```

###`POST /candidates` - Create a new candidate
**payload**
```json
{
    "name": "New Candidate",
    "photoUrl": "http://something.jpg"
}
```
**response**
```json
{
    "id": 123,
    "name": "New Candidate",
    "photoUrl": "http://something.jpg"
}
```

###`GET /votes` - Get all votes
**response**
```json
[
    {
        "id": 1,
        "candidateId": 2,
        "voterId": "192.168.1.100",
        "createdOn": "2015-10-28T20:05:43.150Z"
    },
    {
        "id": 2,
        "candidateId": 1,
        "voterId": "192.168.1.101",
        "createdOn": "2016-09-28T20:05:43.150Z"
    }
]
```

###`POST /votes` - Vote!
**payload**
```json
{
    "candidateId": 1
}
```
**response**
```json
{
    "id": 123,
    "candidateId": 1,
    "voterId": "<YourIp>"
}
```
