# Members Only

<img src='https://github.com/run-after/membersonly/blob/main/public/images/Screenshot_2021-06-04%20Members%20Only.png' alt='Members Onlyl' width='100%' />
  
- **Built with Node.js and express**
- **Utilized MongoDB**
- **Utilized bcrypt to encrypt passwords in the DB**
- **Utilized dotenv to protect DB URL and secret passwords**
- **Utilized passport to log in to site**
- **Utilized express sessions to create cross site sessions**
- **Utilized express validator to validate and sanitize inputs**

This app is something used to learn Node.js.

A user can sign up with a username and password. After signing up, to become a member you must answer a question. If the user does not answer that question correctly, they can see all messages, but won't know who it is from.

Once user answers the confirmation question correctly, they are now a member and can see who posted each message. They can also answer a question and become an administrator. Admins have the ability to delete messages.

Deployed on Heroku - [View live](https://cryptic-ridge-97906.herokuapp.com/)

To run locally:

- Clone repo
- Create a MongoDB collection
- Create a `.env` file and add:
  - MONGODB_URI
  - SECRET_PASSWORD
  - ADMIN_ANSWER
- You'll have to change the questions if you want different ones
