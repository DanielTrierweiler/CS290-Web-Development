/******************************************************************************
* Author: Daniel
* Date: January 27th, 2017
* Description: CS290 Week3 Activity 3
******************************************************************************/

function deepEqual(object1, object2)
{
	if (object1 === object2)
	{
		return true;
	}
	else if ((typeof object1 != "object" || object1 == null) ||
                 (typeof object2 != "object" || object2 == null))
	{
		return false;
	}
	else
	{
		for (var prop in object1)
		{
			return deepEqual(object1[prop], object2[prop]);	
		}
	}

}

var obj = {here: {is: "an"}, object: 2};

console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {here: 1, object: 2}));
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
