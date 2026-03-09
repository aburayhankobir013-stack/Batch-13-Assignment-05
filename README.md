Question=>(01):
What is the difference between var, let, and const?
Answer:
1. var
var is the old way fo declaring variables in JavaScript.

(01)=>Function scoped(Accessible only inside the function whereit is declared).
(02)=>Can be re-declared(The samw variable name can be declared again).
(03)=>Can be reassigned(It's value can be changed).
(04)=>Hoisted(The declaration moves to the top of the scope during execution).

2.let
let was introduced in ES6 and is used to declare variables with blick scrope.

(01)=>Block scoped(Limited to the {} block where it is defined).
(02)=>Cannot be re-declared in the same scope.
(03)=>Can be reassigned.
(04)=>Hoisted but not initialized before declaration(Temporal Dead Zone).

3.const
const is used to declare constant variables whose values cannot be changed.

(01)=>Block scoped.
(02)=>Cannot be re-declared.
(03)=>Cannot be reassigned.
(04)=>Must be initialized at the time of declaration.

----------------------------------------------------------

Question=>(02):
What is the spread operator (...)?
Answer:
The spread operator is a feature introduced in ES6 that allows an iteratble object such as an array or object to be expanded into individual elements.

Additional Inforamtion:
(01)=>Expands elements of an array or object.
(02)=>Makes copying arrays or objects easier.
(03)=>Helps marge arrays or objects.
(04)=>Can be used when passing arguments to functions.

----------------------------------------------------------

Question=>(03):
What is the difference between map(), filter(), and forEach()?
Answer:
1. map()
map() is used to create a new array by applying a function to each element of the original array.

(01)=>Returns a new array.
(02)=>The length of the new array is the same as the original array.
(03)=>The original array remains unchanged.

2.filter()
filter() is used to create a new array containing only the elements that satisfy a specific condition.

(01)=>Returns a new array.
(02)=>The new array may have fewer elements that the original.
(03)=>The original array remeains unchanged.

3. forEach()
forEach() is used to execute a function for each element of an array.

(01)=>Does not return a new array.
(02)=>Used minly for performing actions such as printing values.
(03)=>It does not modify the original array unless done manually.

----------------------------------------------------------

Question(04)=>
What is an arrow function?
Answer:
An arrow function is a shorter and more modern way to write functions in JavaScript. It makes the code more concise and easier to read.

Additional Information:
(01)=>Provides shorter syntax for writing functions.
(02)=>Does not have its own this keyword(Inherits this from the surrounding scope).

--------------------------------------------------------

Question=>(05):
What are template literals?
Answer:
Template literals ae a feature introduced in ES6 that allow developers to create strings more easily and flexible. They use backticks (` `) instead of single(' ') or double (" ") quotes. Template literals allow embedding variables and expressions directly inside a string.

Additional Information:
(01)=>Use backticks(` `) instead quotes.
(02)=>Allow string interpolation using ${}.
(03)=>Support multi-line strings without using special characters.
(04)=>Can include expressions and variables inside strings.


