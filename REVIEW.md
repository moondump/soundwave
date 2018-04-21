# Midterm Review
## README Contents
Nice README. Great to have clear links to everyone in the team 
so prominently. Nice summary in the overiew. Thanks for listing 
the expected properties for the .env file.

Here's one tip. It's nice to commit a file called `sample.env`
that has some throw-away default values. If you include this
in the repo then people can copy it and start using your app
super easily.

## Server
You've got this utility line commented out in your server. You
could modify your package.json to have a custom `seed` command
that runs your `seedDb` file.

Nice overall main server file. It's clean and well-organized.
It's easy to see a high-level summary of all the routes.

## Routes
You have slightly inconsistent file names between your routes.
`removeSong.js` doesn't match the pattern of `add-song.js`,
`signgin-route.js` and the others. JavaScript files tend to
use `kebab-case` but consistency is the most important thing.
As projects get larger small inconsistencies like this can
really drive you nuts.

It's strange to have all CRUD methods for the song split out
across different files. Most applications have just one file 
that handles all the create, read, update and delete routes for
one resource.

Nice work handling updating songs with all the optional 
properties.

## MongoDB
You only need to make one connection to your database. Do that
connection in your main server file. There's a second connection
being made in the `update.js` file that's unnecessary.

Good job using the pre-save hook in the User model to save the
hashed password instead of plain text.

Good job establishing the relationship between users and songs.

## Testing
Your Sign-In test depends on someone having created an account
with username/password "signin/signin" manually. Improve the
test by running a sign-up within the test and using that new
account to sign in.

Your sign-in test has strange indentation. The series of
`.then()` functions after `User.findOne` cascades further
and further in.

Return `Song.find()` from the first `.then()` so then it's
passed as a parameter to your second `.then()`, then your
then functions will flatten out.

Compare the two code snippets below.

```js
User.findOne({
  username: username
})
  .then((results) => {
    Song.find( {
      userId: results._id
    })
      .then((results) => {
        let payload = { userId: user._id };
        let token = jwt.sign(payload, process.env.SECRET);
        res.status(200).send({ auth: true, token: token , results});
      })
      .catch(err => res.send(err.message));
```

```js
User.findOne({
  username: username
})
.then((results) => {
  return Song.find( {
    userId: results._id
  })
})
.then((results) => {
  let payload = { userId: user._id };
  let token = jwt.sign(payload, process.env.SECRET);
  res.status(200).send({ auth: true, token: token , results});
})
.catch(err => res.send(err.message));
```

## Frontend

Oh the horror. String-inlined HTML. D: Happy we're using React 
now?

Seriously good use of jQuery and handlebars. Way to jump in and
flex your front-end muscles again.

Very clean code on the front-end. Nice work.

```js
let markup = `
<div id="song-div">
  <ul class="songListItems">
    <li id="artist">Artist: {{artist}}</li>
    <li id="album">Album: {{album}}</li>
    <li id="song">Title: {{title}}</li>
    <a id="audio" onclick="this.firstChild.play()"> <audio controls
    controlsList="nodownload" src="{{url}}"></audio></a>
  </ul>
</div>
`;

```

# Oberall
Excellent work!