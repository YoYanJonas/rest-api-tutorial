## Part One
We need to modify the User Schema and add a appropriate DS for friends attribute. Array of user.obj got choosen.

## Part Two
Add two controller function for user to "add" and "remove" friend. In simple manner we get the friend Id as params and pass it to User model methods. It manipulates the user obj(or doc) in collection and return the promise. It's available for FREE plan and etc.

## Part Three
handle query params in get method for user info, if true was passed then handle it in User model method as another parameter to check the behavoir of method. Just mention here I checked just for 'true', we could add 'TRUE' or 'True' to have more responsible route.

## you can serach commentY in source code to see where i have manipulated the code.