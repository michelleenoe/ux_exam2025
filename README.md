Oprettede sider - med udkommenteret copy/paste fra foodRepo 

- index.html
- login.html + login.js
- signup.html + signup.js 
- api.js med auth for headers

Øvrige sider som mangler (ikke besluttet endnu)

* brugerprofil
* forfattere
* bogdetalje-side
* admin-login-side
* admin-dashboard-side

API - lokalt via Docker 
http://localhost:8080


deadline 28.05.25 kl 12.00 

## Git Commands (note)

- `git checkout branch_name`  
  Skifter branch til den angivne branch.

- `git add .`  
  Tilføjer alle filer til din git cache og gør dem klar til commit.

- `git commit -m "commit besked"`  
  Comitter dine filer med en besked, der beskriver ændringerne.

- `git push`  
  Pusher dine commits op på den branch, du står i.

- `git fetch`  
  Tjekker om der er ændringer i fjern-repositoriet. Gør klar til pull, hvis nødvendigt.

- `git pull`  
  Henter ændringer fra fjern-repositoriet og opdaterer dine lokale filer.



User can:

* Sign up
* Log in
* See a list of random books
* Search for books based on the title or part of the title
* See the books by a specific author
* See information for a specific book


Only if logged in: 

* Loan a book for a period of 30 days
* Only if the user does not have an existing loan on this book
* If the process is successful, the user will see a message explaining that an access link to the e-book will be sent to his/her email address (notice, though, that this functionality is not implemented in the back-end)
* Edit users information
* The password and membership date cannot be changed
* Remove user
* Log out

The admin can:
* Log in (user “admin.library@mail.com”, password “WebUdvikling25!”)

Only when logged in:
* See information for a specific book, including loan history
* Add a new book
* Add a new author
* Add a new publisher
* Log out


Users

* When signing up, the application will require the user’s email, password, and repeating the password. A valid email address is expected. The password must have more than 8 characters, and contain lowercase and uppercase letters, numbers, and special characters. Both passwords must match.
* When logging in, the user must introduce his/her email and password.
* Upon correct log in, the application will store in sessionStorage the user’s ID, email address and whether s/he is or not an admin user. Upon log out, said information will be removed from sessionStorage.
* To redirect from one page to another in JavaScript, this source can be handy.




