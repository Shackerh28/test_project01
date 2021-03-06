//part2

//hoisting


//called before function

/*calculateAge(1965);

function calculateAge(year){
    console.log(2016 - year);
}*/
//called after function

//calculateAge(1990);


//function expression


//called before  does not work because hoisiting doesnt work with expression
//retirement(1990);

//var retirement = function(year){
    //console.log(65-(2016 - year));
//}
//called after
//retirement(1990);

//take first three characters of a string and put them with the last three characters
/*
function MakeNewString(str){
    if(str.length < 3){
        console.log(str)
    }else{
        str.length > 3
            str.slice(0, 3) + str.slice(-3)
            console.log(str)
        }

}

MakeNewString(leonardo);
*/

var Person = function (name,yearOfBirth,job){
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
  this.calculateAge = function(){
    console.log(2016 - this.yearOfBirth);
  }

  
             }

var john = 
    new Person('john',1990,'teacher');

console.log(john);