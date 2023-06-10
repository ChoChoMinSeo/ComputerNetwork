const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const bodyParser = require("body-parser");
const {requireLogin} = require("./middlewares/requireLogin");
const {testIds} = require("./testIds");



const app = express();  // create an express application instance

app.use(bodyParser.urlencoded({extended: false})); // bodyParser middleware registration

// express-session middleware registration
app.use(session({
    store: new FileStore({path: "./sessions"}),  // Specify the path to store session data
    secret: "secret!@#$%^&*()",  // Secret key for session encryption
    cookie: {expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}   // Session expiration time
}));

// View enjine settings (Use ejs)
app.set("view engine", "ejs");
app.set("views", "./views");



// When a GET requies comes to the "/" path, which is the main page, redirect to the login page
// Hint: Use the redirect() function.

app.get("/", (req, res) =>
{
    // <Your codes here>
    return res.redirect("/login"); //redirect to /login page
});


// When a GET request is received through the "/login" path

app.get("/login",(req,res)=>// Your codes here (a line indicating the path of the GET request)
{
    // If a user is logged in, redirect to the "/profile" page.
    if (req.session.user)
    {
        // <Your codes here>
        return res.redirect("/profile") //redirect to /profile page
    }

    // Display the login page.
    // Hint: Use the render() function.

    // <Your codes here>
    res.render("login-page"); //show login page
});


// When a POST request comes to the "/login" path,

// <Your codes here> (A line for using a REST API function)
app.post("/login",(req,res) => //define post method for /login
{
    // Extract the userId and password entered by the user from the body of the POST request.
    const {userId, password} = req.body;

    // Search for a user matching userId in the test accounts list.
    const user = testIds.find(user => user.userId === userId);

    // If the account you entered does not exist:
    if (!user)
    {
        // Display a login failure pop-up and redirect to the "/login" page.
        res.writeHead(401, {"Content-Type": "text/html; charset=utf-8"});

        res.write(`
            <script>
                window.onload = function() {
                    alert("Login failed!");
                    window.location.href = "/login";
                };
            </script>`);

        res.end();
        return;
    }

    // If the password does not match:
    // Hint: Refer to the part "If the account you entered does not exist" above.

    // <Your codes here> (A line to indicate that the password is not correct)
    if(user.password!=password) //if saved password is different with typed password
    {
        // Display a login failure pop-up and redirect to the "/login" page.
        res.writeHead(401, {"Content-Type": "text/html; charset=utf-8"});

        // <Your codes here> (For redirecting to the login page)
        res.write(`
            <script>
                window.onload = function() {
                    alert("Wrong password!");
                    window.location.href = "/login";
                };
            </script>`); // just like above showing account does not exist, show alert message for wrong password
        res.end(); 
        return;
    }

    // Save user information in the req.session object when login is successfull.
    req.session.user = {userId: user.userId};

    // Display a login success pop-up and redirect to the "/profile" page.
    // Hint: Unlike the 401 code used in the case of failure, 200 code should be used.
    
    // <Your codes here>
    res.writeHead(200,{"Content-Type": "text/html; charset=utf-8"});
    res.write(`
        <script>
            window.onload = function() {
                alert("Login succeeded!");
                window.location.href = "/profile";
            };
        </script>`); // just like above, show alert message for login is successful(status code is different).
    res.end();
    return;
});


// When a GET request is received through the "/logout" path
app.get("/logout", (req, res) =>
{
    // Delete the current user's session information and redirect to the "/login" page.
    // Hint: Use req.session.destory() function for deleting the session information.


    // <Your codes here>
    req.session.destroy(function(){ //destroy current session
        req.session;
    });
    res.redirect("/login"); //redirect to /login
    return;
});


// When a GET request is received through the "/profile" path, first perform requireLogin and then run the next function.
app.get("/profile", requireLogin, (req, res) =>
{
    // Extract the current user's information from the session information.
    // Hint: Use the function of req.session.user.
    // And refer to the part "Search for a user matching userId in the test accounts list" above.

    // <Your codes here>
    const user = testIds.find(user => user.userId === req.session.user.userId); //similar to line 65, find user information by session's userID
    // Display the profile page and forward the user information(name, student number, photo).
    // Hint: It is delivered in the form of json file, and the check the variable names of the necessary information in the testIds.js.
    // For example, the "name" is specified as "userName".
    res.render("profile-page", {
        userName: user.userName,
        // <Your codes here>
        classnumber: user.classNumber,
        photo: user.photo, //put user data
    });
});



// Run the server on the port 5000.
app.listen(5000);

// Output the server execution log on the console.
console.log("Server is running at http://localhost:5000");
