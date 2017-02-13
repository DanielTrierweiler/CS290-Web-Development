/******************************************************************************
* Author: Daniel Trierweiler
* Date: January 27th, 2017
* Description: CS290 Week3 Activity 2
******************************************************************************/

console.log("Trying to hoist a function declaration....");
console.log(hello("Daniel"));

function hello(name)
{
	return "Hello " + name;
}

console.log("Trying to hoist a function definition....");
console.log(rectanglePerimeter(2, 4));

var rectanglePerimeter = function(length, width)
{
	return length * 2 + width * 2;
}




