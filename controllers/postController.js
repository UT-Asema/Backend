module.exports = {
  path: 'posts/',
  get: {
    // wildcard route
    'get/*': function (req, res) {
      // get the path from the request
      let path = req.path.split('/');
      let id = parseInt(path[path.length - 1]);

      // get post from database
      db.get('SELECT * FROM posts WHERE id = ?', id, function (err, row) {
        if (err) {
          console.log(err);
          if (res.headersSent) return;
          res.status(500).send('Internal Server Error');
        } else if (!!row) {
          let data = {
            id: row.id,
            title: row.title,
            description: row.description,
            content: row.content,
            date: row.date,
            modified_date: row.modified_date,
            rating: -1,
          }

          // get rating from database if user is logged in
          if (!!req.session.user) db.get('SELECT * FROM ratings WHERE user_id = ? AND post_id = ?', [req.user.user_id, id], function (err, row) {
            if (err) {
              console.log(err);
              if (res.headersSent) return;
              res.status(500).send('Internal Server Error');
            } else if (!!row) {
              data.rating = row.rating;
            }
          });
          if (res.headersSent) return;
          res.status(200).send(JSON.stringify(data));
        }

        // return 404 not found if no other response
        if (res.headersSent) return;
        res.status(404).send('Not Found');
      })
    },
    'search/*': function (req, res) {
      // get the path from the request
      const path = req.path
      // get search query from path
      const query = path.split('/')[-1]

      // get posts containing query in title limit 10
      db.all('SELECT * FROM posts WHERE title LIKE ? LIMIT 10', ['%' + query + '%'], function (err, rows) {
        if (err) {
          console.log(err);
          if (res.headersSent) return;
          res.status(500).send('Internal Server Error');
        } else {
          data = [];
          for (let row of rows) {
            data.push({
              id: row.id,
              title: row.title,
              description: row.description,
              content: row.content,
              date: row.date,
              modified_date: row.modified_date,
              rating: -1,
            })

            // get rating from database
            db.get('SELECT * FROM ratings WHERE user_id = ? AND post_id = ?', [req.user.user_id, row.id], function (err, row) {
              if (err) {
                console.log(err);
                if (res.headersSent) return;
                res.status(500).send('Internal Server Error');
              } else if (!!row) {
                data[data.length - 1].rating = row.rating;
              }
            });
          }
          if (res.headersSent) return;
          res.status(200).send(data);
        }

        if (res.headersSent) return;
        // return 404 not found if no other response
        res.status(404).send('Not Found');
      })
    },
    'getTop': function (req, res) {
      // get top 100 posts based on star count from all users
      db.all('SELECT * FROM posts JOIN ratings ON posts.id = ratings.post_id GROUP BY ratings.post_id ORDER BY SUM(ratings.rating) DESC LIMIT 100', function (err, rows) {
        if (err) {
          console.log(err);
          if (res.headersSent) return;
          res.status(500).send('Internal Server Error');
        } else {
          data = [];
          for (let row of rows) {
            data.push({
              id: row.id,
              title: row.title,
              description: row.description,
              content: row.content,
              date: row.date,
              modified_date: row.modified_date,
              rating: -1,
            })

            // get rating from database
            db.get('SELECT * FROM ratings WHERE user_id = ? AND post_id = ?', [req.user.user_id, row.id], function (err, row) {
              if (err) {
                console.log(err);
                if (res.headersSent) return;
                res.status(500).send('Internal Server Error');
              } else if (!!row) {
                data[data.length - 1].rating = row.rating;
              }
            });
          }
          if (res.headersSent) return;
          res.status(200).send(data);
        }

        // return 404 not found if no other response
        if (res.headersSent) return;
        res.status(404).send('Not Found');
      })
    },
    'getTrending': function (req, res) {
      // get 100 best posts based on star count from all users in the last week
      db.all('SELECT * FROM posts JOIN ratings ON posts.id = ratings.post_id WHERE posts.date > ? GROUP BY ratings.post_id ORDER BY SUM(ratings.rating) DESC LIMIT 100', [Date.now() - 604800000], function (err, rows) {
        if (err) {
          console.log(err);
          if (res.headersSent) return;
          res.status(500).send('Internal Server Error');
        } else {
          data = [];
          for (let row of rows) {
            data.push({
              id: row.id,
              title: row.title,
              description: row.description,
              content: row.content,
              date: row.date,
              modified_date: row.modified_date,
              rating: -1,
            })

            // get rating from database
            db.get('SELECT * FROM ratings WHERE user_id = ? AND post_id = ?', [req.user.user_id, row.id], function (err, row) {
              if (err) {
                console.log(err);
                if (res.headersSent) return;
                res.status(500).send('Internal Server Error');
              } else if (!!row) {
                data[data.length - 1].rating = row.rating;
              }
            });
          }
          if (res.headersSent) return;
          res.status(200).send(data);
        }

        // return 404 not found if no other response
        if (res.headersSent) return;
        res.status(404).send('Not Found');
      })
    },
    'getNew': function (req, res) {
      // get newest 100 posts
      db.all('SELECT * FROM posts ORDER BY date DESC LIMIT 100', function (err, rows) {
        if (err) {
          console.log(err);
          if (res.headersSent) return;
          res.status(500).send('Internal Server Error');
        } else {
          data = [];
          for (let row of rows) {
            data.push({
              id: row.id,
              title: row.title,
              description: row.description,
              content: row.content,
              date: row.date,
              modified_date: row.modified_date,
              rating: -1,
            })

            // get rating from database
            db.get('SELECT * FROM ratings WHERE user_id = ? AND post_id = ?', [req.user.user_id, row.id], function (err, row) {
              if (err) {
                console.log(err);
                if (res.headersSent) return;
                res.status(500).send('Internal Server Error');
              } else if (!!row) {
                data[data.length - 1].rating = row.rating;
              }
            });
          }
          if (res.headersSent) return;
          res.status(200).send(data);
        }

        // return 404 not found if no other response
        if (res.headersSent) return;
        res.status(404).send('Not Found');
      })
    }
  },
  post: {
    create: function (req, res) {
      // check if session exists
      if (!req.session) {
        res.redirect('/auth/login')
      }

      // post post
      // get post data from request
      let date = new Date.now()
      const data =
        {
          title: req.body.title,
          description: req.body.description,
          content: req.body.content,
          date: date,
          modified_date: date
        }
      // post post to database
      db.run(`INSERT INTO 
        posts (user_id, title, description, content, date, modified_date) VALUES (?, ?, ?, ?, ?, ?)`,
        [req.session.user_id, data.title, data.description, data.content, data.date, data.modified_date], function (err) {
          if (err) {
            console.log(err)
            // return 500 error
            res.status(500).send('Internal Server Error')
          } else {
            // get post id
            db.get('SELECT id FROM posts WHERE user_id = ? AND title = ? AND description = ? AND content = ? AND date = ? AND modified_date = ?', [req.session.user_id, data.title, data.description, data.content, data.date, data.modified_date], function (err, row) {
              if (err) {
                console.log(err)
                // return 500 error
                res.status(500).send('Internal Server Error')
              } else {
                // return post id
                res.status(200).send({ id: row.id })
              }
            })
          }
        }
      )
    },
    edit: function (req, res) {
      // check if session exists
      if (!req.session) {
        res.redirect('/auth/login')
      }
      // check if user has permission to edit
      // get post from database
      db.get(`SELECT * FROM posts WHERE id = ?`, [req.body.id], function (err, row) {
        if (err) {
          console.log(err)
          // return 500 error
          res.status(500).send('Internal Server Error')
        } else {
          // check if user owns post
          if (row.user_id === req.session.user_id) {
            // edit post
            // get post data from request
            const data =
              {
                title: req.body.title,
                description: req.body.description,
                content: req.body.content,
                modified_date: Date.now()
              }
            // edit post in database
            db.run(`UPDATE posts SET title = ?, description = ?, content = ?, modified_date = ? WHERE id = ?`, [data.title, data.description, data.content, data.modified_date, req.body.id], function (err) {
              if (err) {
                console.log(err)
                // return 500 error
                res.status(500).send('Internal Server Error')
              } else {
                // redirect to post
                res.redirect('/posts/get/' + req.body.id)
              }
            })
          } else {
            // return 403 error
            res.status(403).send('Forbidden')
          }
        }

        // if no rows are returned
        if (!row) {
          // return 404 error
          res.status(404).send('Not Found')
        }
      })
    },
    delete: function (req, res) {
      // check if session exists
      if (!req.session) {
        res.redirect('/auth/login')
      }

      // check if user has permission to delete
      // get post from database
      db.get(`SELECT * FROM posts WHERE id = ?`, [req.body.id], function (err, row) {
        if (err) {
          console.log(err)
          // return 500 error
          res.status(500).send('Internal Server Error')
        } else {
          // check if user owns post
          if (row.user_id === req.session.user_id) {
            // delete post
            db.run(`DELETE FROM posts WHERE id = ?`, [req.body.id], function (err) {
              if (err) {
                console.log(err)
                // return 500 error
                res.status(500).send('Internal Server Error')
              } else {
                // redirect to home page
                res.redirect('/')
              }
            })
          } else {
            // return 403 error
            res.status(403).send('Forbidden')
          }
        }

        // if no rows are returned
        if (!row) {
          // return 404 error
          res.status(404).send('Not Found')
        }
      })
    },
    rate: function (req, res) {
      // check if session exists
      if (!req.session) {
        res.redirect('/auth/login')
      }

      // check if user has permission to rate
      // get rating for post from database if it doesn't exist create it
      db.get(`SELECT * FROM ratings WHERE post_id = ? AND user_id = ?`, [req.body.id, req.session.user_id], function (err, row) {
          if (err) {
            console.log(err)
            // return 500 error
            res.status(500).send('Internal Server Error')
          } else {
            // rate post
            // get rating data from request
            const data =
              {
                user_id: req.session.user_id,
                post_id: req.body.id,
                rating: req.body.rating,
              }

            // if rating doesn't exist create it
            if (!row) {
              // rate post in database
              db.run(`UPDATE ratings SET rating = ? WHERE post_id = ? AND user_id = ?`, [data.rating, req.body.id, req.session.user_id], function (err) {
                if (err) {
                  console.log(err)
                  // return 500 error
                  res.status(500).send('Internal Server Error')
                } else {
                  // redirect to post
                  res.redirect('/posts/get/' + req.body.id)
                }
              })
            } else {
              // check if post exists
              db.get(`SELECT * FROM posts WHERE id = ?`, [req.body.id], function (err, row) {
                if (err) {
                  console.log(err)
                  // return 500 error
                  res.status(500).send('Internal Server Error')
                } else if (!!row) {
                  // rate post in database
                  db.run(`INSERT INTO ratings (user_id, post_id, rating) VALUES (?, ?, ?)`, [data.user_id, data.post_id, data.rating], function (err) {
                    if (err) {
                      console.log(err)
                      // return 500 error
                      res.status(500).send('Internal Server Error')
                    } else {
                      // redirect to post
                      res.redirect('/posts/get/' + req.body.id)
                    }
                  })
                }

                // if no rows are returned
                if (!row) {
                  // return 404 error
                  res.status(404).send('Not Found')
                }
              })
            }
          }
        }
      )
    },
  },
  put: {},
  delete: {},
}