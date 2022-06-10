# AREA

AREA [![pipeline status](https://gitlab.com/Deadxras/area/badges/master/pipeline.svg)](https://gitlab.com/Deadxras/area/-/commits/master)

master: [![coverage report](https://gitlab.com/Deadxras/area/badges/master/coverage.svg)](https://gitlab.com/Deadxras/area/-/commits/master) 

server: [![coverage report](https://gitlab.com/Deadxras/area/badges/server/coverage.svg)](https://gitlab.com/Deadxras/area/-/commits/server)


# AREA-51 API



# Users

## GET Current user information

```
 http://localhost:8080/users/{random id}
```
***Response***
```
{
  "success": true,
  "email": "exemple@gmail.com"
}
```
## POST Create new user

```
 http://localhost:8080/users/
```
***Body*** formdata
```
{
  "email": "exemple@gmail.com",
  "password": "********"
}
```

***Response***
```
{
  "success": true,
  "email": "exemple@gmail.com"
}
```

## PUT Update user state

```
http://localhost:8080/users/{random id}
```

***Body*** formdata

if you want to signin:
```
{
  "signin": true,
  "email": "exemple@gmail.com",
  "passeword": "******"
}
```

if you want to signout:
```
{
  "signout": true
}
```

if you want to reset your password:
```
{
  "update": true,
  "reset": true,
  "email": "exemple@gmail.com"
}
```
***Response***

Signin
```
{
  "success": true,
  "email": "exemple@gmail.com"
}
```

Signout and Reset
```
{
  "success": true,
}
```

## DELETE user

```
http://localhost:8080/users/{random id}
```

***Response***
```
{
  "success": true,
}
```

# User Collection

## GET User document

```
http://localhost:8080/collection/{collection}
```
***Response***
```
{
  "success": true,
  "document": {}
}
```

## POST Create Collection

```
http://localhost:8080/collection/
```
***Body*** formdata

```
{
  "service": "Spotify",
  "access_token": "ezfezlmo6576czlkcez=LMLK",
  "refresh_token": "lkddlezdzeLKEZLK"
}
```

## PUT Update document

```
http://localhost:8080/collection/{collection}
```
***Body*** formdata

```
{
  "access_token": "ezfezlmo6576czlkcez=LMLK",
  "refresh_token": "lkddlezdzeLKEZLK"
}
```

## DELETE document

```
http://localhost:8080/services-available/{collection}
```

# Services Available

## GET all services available

```
http://localhost:8080/services-available/
```

## GET one service

```
http://localhost:8080/services-available/{document}
```

## POST create a service

```
http://localhost:8080/services-available/
```

***Body*** formdata
```
{
  "name": "Spotify",
  "body": {
    "name": "Spotify"
    "create_playlist": "something",
    "add_item_to_playlist": "something"
  }
}
```

## PUT Update a service

```
http://localhost:8080/services-available/{service}
```
***Body*** formdata
```
{
  "name": "Spotify"
  "create_playlist": "something",
  "add_item_to_playlist": "something"
}
```

## DELETE document

```
http://localhost:8080/services-available/{document}
```

# Links

## GET all user links

```
http://localhost:8080/links/
```

## GET a single link

```
http://localhost:8080/links/{uuid}
```

## POST create a link

```
http://localhost:8080/links/
```

***Body*** formdata
```
{
  "trigger_app": "Spotify",
  "react_app": "Youtube",
  "trigger_action": "whatever",
  "react_action": "whatever"
}
```
***Response***
```
{
  "success": "true"
  "uuid": "uuid"
  "data": {
    "user": "uid",
    "trigger_app": "Spotify",
    "react_app": "Youtube",
    "trigger_action": "whatever",
    "react_action": "whatever"
  }
}
```

## PUT Update a link

```
http://localhost:8080/links/{uuid}
```
***Body*** formdata
```
{
  "trigger_app": "Spotify", or
  "react_app": "Youtube", or
  "trigger_action": "whatever", or
  "react_action": "whatever" or
}
```
***Response***
```
{
  "success": "true"
  "uuid": "uuid"
  "data": {
    "user": "uid",
    "trigger_app": "Spotify",
    "react_app": "Youtube",
    "trigger_action": "whatever",
    "react_action": "whatever"
  }
}
```

## DELETE a link
```
http://localhost:8080/links/{uuid}
```
