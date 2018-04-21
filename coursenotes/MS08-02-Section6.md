### Lecture 71: How Authentication Works in a MEAN Application

(see slides)

### Lecture 72: Backend - Signing Up
* Create `POST` route in `user.js`
```javascript
router.post('/', (req, res, next) => {
  let user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  });
  user.save()
      .then((result) => res.status(200).send({status: 'User registered.', obj: result}))
      .catch((err) => res.status(500).send({status: 'Error registering user.'}));
});
```

### Lecture 73: Signing up Users - Wiring up Frontend and Backend
* Create `register()` in `auth.service.ts`
```javascript
  register(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'content-type': 'application/json'});
    return this.http.post('http://localhost:3000/api/users', body, {headers})
               .map((resp: Response) => resp.json())
               .catch((err: Response) => Observable.throw(err.json()));
  }
```
* Add `AuthService` as a provider in `app.module.ts` for application-wide access
* Subscribe to service in `register.component.ts`

### Lecture 74: Backend - Signin
* Create `POST` route in `user.js`
```javascript
router.post('/login', (req, res, next) => {
  User.findOne({email: req.body.email})
      .then((user) => {
        if(!bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(401).send({status: 'Unauthorized.'});
        } else {
          let token = jwt.sign({user}, 'secret', {expiresIn: 7200});
          return res.status(200).send({status: 'User logged in.', obj: {token, userId: user._id}});
        }
      })
      .catch((err) => res.status(500).send({status: 'Error loging in.'}));
});
```

### Lecture 75: More Information on JWT

### Lecture 76: User Sign In - Wiring up Frontend and Backend
* Create `login()` in `auth.service.ts`
```javascript
login(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'content-type': 'application/json'});
    return this.http.post('http://localhost:3000/api/users/login', body, {headers})
               .map((resp: Response) => resp.json())
               .catch((err: Response) => Observable.throw(err.json()));
  }
```
* Subscribe to service in `register.component.ts` and use `localStorage` to save token and user ID
```javascript
onSubmit() {
    const user = new User(this.myForm.value.email, this.myForm.value.pwd);
    this.authService.login(user)
        .subscribe(
          (data) => {
            localStorage.setItem('token', data.obj.token);
            localStorage.setItem('userId', data.obj.userId);
            this.router.navigateByUrl('/');
          },
          (error) => console.log(error)
        );
    this.myForm.reset();
  }
```

### Lecture 77: Logging Users Out
* Create `logout()` in `auth.service.ts` to clear `localStorage`
* Call this function in `logout.component.ts` and redirect to login page

### Lecture 78: Checking the Login State
* Create `isLoggedIn()` in `auth.service.ts` to see if token exists
* Call this function in `auth.component.ts`
* Use `*ngIf` directive to toggle `login/logout`

### Lecture 79: Backend Route Protection with JWT
* Protect all routes in `msgs.js` except `GET /` with middleware by verifying JWT
```javascript
router.use('/', (req, res, next) => {
  jwt.verify(req.query.token, 'secret', (err, decoded) => {
    if(err) return res.status(400).send({status: 'Not authorized.'});
    next();
  });
});
```
* This still doesn't work yet because the token is not being sent with user's request

### Lecture 80: Fixing a Mongoose Bug

### Lecture 81: Connecting Users with Messages
* User data is encoded in token when logging in, so it can be decoded when creating a message and linked to the Message model
  * Use `jwt.decode()` instead of `jwt.verify()` because the token has already been verified by middleware before reaching this route
* The message being created can now be added to the array in User model
* The message also needs to be removed the array when it's being deleted
```javascript
router.delete('/:id', async (req, res, next) => {
  try {
    let msgDel = await Message.findByIdAndRemove(req.params.id);
    let userUpd = await User.findByIdAndUpdate(
      msgDel.user, {$pull: {messages: {$in: [msgDel._id]}}}
    );
    res.status(200).send({status: 'Message deleted.'});
  } catch(err) {
    res.status(500).send({status: 'Error deleting message.'});
  }
});
```

### Lecture 82: Sending Requests with a Token
* For `addMsg()`, `updateMsg()`, `deleteMsg()` in `msg.service.ts`, token can be sent as a query string
```javascript
let token = localStorage.getItem('token');
    if(token) token = '?token=' + token;
    else token = '';
```

### Lecture 83: Handle User Authorization
* Use the token to allow user who created the message to edit/delete it

### Lecture 84: Passing the User Object with Messages
```javascript
Message.find()
       .populate({path: 'user', select: ['_id', 'fname']})
       .exec()
       .then((msgs) => {
         res.status(200).send({status: 'Messages retrieved.', obj: msgs});
       ...
```

### Lecture 85: Frontend Authorization Check
* Compare `userId` in `localStorage` (placed there by `login.component.ts`) with the message's `userId`, and disable the edit/delete buttons if they are not the same
