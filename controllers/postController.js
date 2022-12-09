module.exports = {
  path: 'posts/',
  get: {
    // wildcard route
    'get/*': function (req, res) {
      // get the path from the request
      const path = req.path
      // get post id from path
      const id = path.split('/')[-1]

      // get post from database

      // return post page

    },
    'search/*': function (req, res) {
      // get the path from the request
      const path = req.path
      // get search query from path
      const query = path.split('/')[-1]

      // get posts from database

      // return search page

    }
  },
  post: {
    create: function (req, res) {
      // check if session exists
      // check if user has permission to post
      // check if post is valid
      // post post
      // redirect to post
    },
    edit: function (req, res) {
      // check if session exists
      // check if user has permission to edit
      // check if post is valid
      // edit post
      // redirect to post
    },
    delete: function (req, res) {
      // check if session exists
      // check if user has permission to delete
      // delete post
      // redirect to home
    },
    rate: function (req, res) {
      // check if session exists
      // check if user has permission to rate
      // check if rating is valid
      // rate post
      // redirect to post
    },
  },
  put: {},
  delete: {},
}