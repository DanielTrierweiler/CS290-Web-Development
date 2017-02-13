function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an 
  array of objects appropriate for that comparator and it will return a new array which is 
  sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr( comparator, array) {
    var position = 0;
    for (i = 0; i < array.length - 1; i++) {
    	position = i;
      for (j = i + 1; j < array.length; j++) {
      	if (!comparator(array[position], array[j])) {
        	position = j;
        }
      }
      if (position != i) {
      	var temp = array[i];
        array[i] = array[position];
        array[position] = temp;
      }
    }
    return array;
}

/*A comparator takes two arguments and uses some algorithm to compare them. If the first 
  argument is larger or greater than the 2nd it returns true, otherwise it returns false. 
  Here is an example that works on integers*/
function exComparator( int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order 
  of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2){
    if (auto1.year > auto2.year) {
    	return true;
    }
    else {
    	return false;
    }
}

/*This compares two automobiles based on their make. It should be case insensitive and makes
  which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator( auto1, auto2){
    if (auto1.make.toLowerCase()[0] < auto2.make.toLowerCase()[0]) {
    	return true;
    }
    else {
    	return false;
    }
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" 
  is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be 
  case insensitive. If two cars are of equal type then the newest one by model year should 
  be considered "greater".*/
function typeComparator( auto1, auto2){
   
    var typeValue = function( auto) {
        if (auto.type.toLowerCase() == "roadster") {
  	    return 3;
        } 
        else if (auto.type.toLowerCase() == "pickup") {
  	    return 2;
        }
        else if (auto.type.toLowerCase() == 'suv') {
  	    return 1;
        }
        else {
  	    return 0;
       }
    }

    if (auto1.type.toLowerCase() == auto2.type.toLowerCase()) {
    	return yearComparator(auto1, auto2);
    }
    else if (typeValue(auto1) > typeValue(auto2)) {
    	return true;
    }
    else {
    	return false;
    }
}

/*Logs autombile year, make, model if passed boolean argument is false, otherwise, logs
  autombiles year, make, model, and type.*/
Automobile.prototype.logMe = function(bool) {
    if( bool) {
	console.log(this.year + " " + this.make + " " + this.model + " " + this.type);
    }
    else {
   	console.log(this.year + " " + this.make + " " + this.model);
    }
}

/*Calls automobiles logMe function for every automobile in the passed array.*/
function printAutomobiles( array, printType) {
    for (i = 0; i < array.length; i++) {
	array[i].logMe(printType);
    }
}

console.log("*****\nThe cars sorted by year are:");
printAutomobiles(  sortArr( yearComparator, automobiles), false);
console.log("\n");

console.log("The cars sorted by make are:");
printAutomobiles( sortArr( makeComparator, automobiles), false);
console.log("\n");

console.log("The cars sorted by type are:");
printAutomobiles( sortArr( typeComparator, automobiles), true);
console.log("*****");
