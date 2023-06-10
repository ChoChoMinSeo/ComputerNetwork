1. When user access to localhost:5000/(GET), server redirects to /login(GET). --- line 30~34
1-1) If user already logged in(if there is session file for user), server redirects to /profile(GET)  ---line 42~46
1-2) else user has to type in ID, password in input form.  ---line 52
2. When user press login button(POST), server checks id and password in testIds.js file.  ---line 59~65
2-1) If id and password are all correct, redirects to /profile, and shows user data of current account. ---line 107~122, line 143~160
2-2) else shows error pop-up and redirects to /login. ---line 68~82, line 89~103
3. When user press logout button, server redirects to /logout(GET) and then, deletes session file and redirect to /login(GET). ---line 127~139