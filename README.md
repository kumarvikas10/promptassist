Package I Used in this project
- Bcrypt - to hash password
- Mongodb
- Mongoose
- next-auth

add all nessary data files
- tailwind config
- add global css from its gist code
- assests in public folder

App folder
- add Layout.jsx which run all the pages
- add page.jsx for homepage or you can say main app file

components
- create nessasry files like 
  Nav
  Feed
  Form
  Profile
  PromptCard
  Provider

- import nav to layout.jsx file
- import feed to page.jsx 

Nav
- import all function signIn, signOut, getProviders for next-auth
- put all link to action of button
- useSession is used to get the session
- update the uri in web client in google client with "http://localhost:3000/api/auth/callback/google"

Provider
- To know which user session is running and wrap with layoyut.jsx file

API folder
- create auth folder and inside [...nextauth] and route.js
- follow documentation and create database , google provider and session callback
- signIn function to check user

Models
- create userschema
- create promptSchema
