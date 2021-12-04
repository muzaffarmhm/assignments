### Used Modules


- Express
- Mongoose
- Ejs
- bcrypt
- nodemailer

# Editor.md

**Default:**
Once registering, the node will log a link to display to sent email.


###Changing own Email Address
How to:

1. Add host as gmail for gmail address
2. Add auth of email and password

```javascript
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'dawson.breitenberg1@ethereal.email',
        pass: 'BVkDzybWqjjC6V91dn'
    }
});
```
3 . Add Custom text here
```javascript
var mailOptions = {
  from: 'dawson.breitenberg1@ethereal.email',
  to: email,
  subject: 'Sending Email using Node.js',
  text: `Hi Welcome to the Webiste ${email}`
};
```
