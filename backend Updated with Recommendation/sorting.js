// let dataArray =  [05514500,
//  05587450
// ,05588710
// ,06935850
// ,06935955
// ,06935965
// ,06936475
// ,07005000
// ,07010022
// ,07010082
// ,07010086
// ,07010208
// ,07016500
// ,07018100
// ,07019185
// ,07019220
// ,25001
// ,25002
// ,25003
// ,25004
// ,25005
// ,25006
// ,25007
// ,25008
// ,25009
// ,25010
// ,25011
// ,25012
// ,25013
// ,25014
// ,25015
// ,25016
// ,25017
// ,25018
// ,25019
// ,25021
// ,381139089531700
// ,381926089581400
// ,382422089522600
// ,384427090000701
// ,390008090411900]

// dataArray.sort();

// console.log(dataArray)


// // let numberArray = [];
// // let alphabeticArray = [];
// // let sortedArray = [];





// // function sortMePlease(dataArray, numberArray,alphabeticArray,sortedArray) {


// //     dataArray.map((item)=>{

// //         const value = isNaN(item) 
// //          if(!value){
    
// //             numberArray.push(item)
// //          }
// //          else{
// //             alphabeticArray.push(item)
// //          }
    
    
// //     })
    
// //     numberArray.sort();
// //     alphabeticArray.sort();
    
// //     numberArray.map((item)=>{
    
// //         sortedArray.push(String(item))
// //     })
    
// //     alphabeticArray.map((item)=>{
    
// //       sortedArray.push(item)
    
// //     })
    
// //     console.log("this is the number array ",numberArray)
// //     console.log("this is the string array ",alphabeticArray)
// //     console.log("final Sorted Array",sortedArray)
    
    


// //   }


  
// //   console.log(sortMePlease(dataArray,numberArray,alphabeticArray,sortedArray));


// var similarity = require('string-cosine-similarity')




// var string1 = 'In the recent period, many campaigns have been organized against employing children in mines, factories, motor garages, restaurants, tea stalls, and shops. There are various households that employ poor children though only a few provide their child-servants with adequate food and clothing. They are deprived of education and their wages are paid to their parents and the money is rarely spent on them. It is the extreme poverty of their parents that forces the children to adopt such a profession at a minor age. Hence, we need, not only strict laws but also a thorough economic reform to reduce the poverty line. At the same time, the spread of literacy is essential to root out these shameful practices still prevalent in our country.'
// var string2 = 'In the recent period, many campaigns have been organized against employing children in mines, factories, motor garages, restaurants, tea stalls, and shops. There are various households that employ poor children though only a few provide their child-servants with adequate food and clothing. They are deprived of education and their wages are paid to their parents and the money is rarely spent on them. It is the extreme poverty of their parents that forces the children to adopt such a profession at a minor age. Hence, we need, not only strict laws but also a thorough economic reform to reduce the poverty line. At the same time, the spread of literacy is essential to root out these shameful practices still prevalent in our country.'

// console.log(similarity(string1, string2)) 