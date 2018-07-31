# dinopark

## Usage
```
$ npm install
$ npm start
```
Requires running MongoDB

## API

### Log event
Webhook for logging events from NULDS

**POST** /api/v1/event
```
Please see requirements documentation of NULDS for POST payload
```

### Get Maintenance Grid:
Get maintenance grid for display. Optionally provide time to test at maintenance schedule at a moment in time.

**POST** /api/v1/maintenance
```
data: {
    time: Datetime (optional)
} 
```

## Problem Approach
Separating concerns and allowing for scalability. Each components resides within its own Model -> Controller design to enable additional functionality to be added later.

###Zones:
* Each zone needs to track when it was last maintained to notify for due maintenance.
* There is a one to many relationship between a zone and a park.
* Instead of storing an array within park and having to iterate through, rather store locational information on zone with a size limitation on the location.
* Also allows for park size to easily grow, shrink or disable zones.
* Check is performed for each zone if maintenance is due.

###Dinos:
* Each dino needs to track when it was last fed to clasify it as safe.
* There is a one to many relationship between dinosaurs and the zone they belong to.
* Dinos can easily be moved across zones without list iteration.
* Check is performed for each dino in a zone if safe.

Since dino and zone information is not complete and known before execution, a strategy of create or update is used for objects.

## Doing things differently
* I would add a park object as a parent of zones to store park information.
* More validation on fields to ensure proper entry.
* Better way of mapping incoming keys to what models expect.

## What I learned
* I learned how nodejs handles foreign key relationships between models.

## Challenge Improvements
* I really loved the effort spent documenting the NUDLS system!
* I would suggest to add the expected output for the front-end devs as part of the scope to align backend and frontend. 