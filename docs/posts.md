# GET
## /posts/get/:ID
### Description
Get a post by ID
### Parameters
| Name | Type   | Description               | In request body? |
|------|--------|---------------------------|------------------|
| ID   | string | The ID of the post to get | &#9744;          |
### Response
| Name          | Type   | Description                                                 |
|---------------|--------|-------------------------------------------------------------|
| id            | string | The ID of the post                                          |
| title         | string | The title of the post                                       |
| description   | string | The description of the post                                 |
| content       | string | The content of the post (raw json of the content structure) |
| date          | string | The date the post was created (UNIX EPOCH)                  |
| modified_date | string | The date the post was last updated (UNIX EPOCH)             |
| rating        | number | The rating of the post (-1 if user hasn't rated post)       |

## /posts/search/:query
### Description
Search for posts by name
### Parameters
| Name  | Type   | Description               | In request body? |
|-------|--------|---------------------------|------------------|
| query | string | The ID of the post to get | &#9744;          |
### Response
array of 10 posts (same as the ones got from /posts/get/:ID)

# POST
## /posts/create
### Description
Create a new post
### Parameters
| Name        | Type   | Description                                                 | In request body? |
|-------------|--------|-------------------------------------------------------------|------------------|
| title       | string | The title of the post                                       | &#9745;          |
| description | string | The description of the post                                 | &#9745;          |
| content     | string | The content of the post (raw json of the content structure) | &#9745;          |
### Response
If user is not logged in, redirects to login page. Otherwise, redirects to /posts/get/:ID if successful and returns error if not

## /posts/edit/
### Description
Edit a post
### Parameters
| Name        | Type   | Description                                                 | In request body? |
|-------------|--------|-------------------------------------------------------------|------------------|
| id          | string | The ID of the post to edit                                  | &#9745;          |
| title       | string | The title of the post                                       | &#9745;          |
| description | string | The description of the post                                 | &#9745;          |
| content     | string | The content of the post (raw json of the content structure) | &#9745;          |
### Response
If user is not logged in, redirects to login page. Otherwise, redirects to /posts/get/:ID if successful and returns error if not

## /posts/delete/
### Description
Delete a post
### Parameters
| Name | Type   | Description                  | In request body? |
|------|--------|------------------------------|------------------|
| id   | string | The ID of the post to delete | &#9745;          |
### Response
If user is not logged in, redirects to login page. Otherwise, redirects to /posts/get/:ID if successful and returns error if not

## /posts/rate/
### Description
Rate a post
### Parameters
| Name   | Type   | Description                     | In request body? |
|--------|--------|---------------------------------|------------------|
| id     | string | The ID of the post to rate      | &#9745;          |
| rating | number | The rating of the post (1 to 5) | &#9745;          |
### Response
If user is not logged in, redirects to login page. Otherwise, redirects to /posts/get/:ID if successful and returns error if not