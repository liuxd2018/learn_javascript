// write a function that takes two string, s1 and s2
// and returns the longest common subsequece of s1 and s2

//"ABAZDC" "BACBAD" => "ABAD"

function lcs(s1, s2) {
    let arr1 = s1.split("");
    let arr2 = s2.split("");
    let commonSubsequence = [];
    let arr2Index = -1;
    for(let i = 0; i < arr1.length; i++) {
        if(arr2Index !== -1) {
            let arr3 = arr2.slice(arr2Index + 1);
            let index = arr3.findIndex(val => arr1[i] === val)

            if(index !== -1) {
                commonSubsequence.push(arr1[i])
                arr2Index = arr2Index + index + 1
            }
        } else {
            arr2Index = arr2.findIndex(val => arr1[i] === val);
            if(arr2Index !== -1) {
                commonSubsequence.push(arr1[i]);
            }
        }
        
    }
    return commonSubsequence.join('');
}

// function lcs(s1, s2) {
//     let arr1 = s1.split("");
//     let arr2 = s2.split("");
//     let commonSubsequence = [];
//     const helper = (a1, a2) => {
       
//         const head = a1.shift();
        
//         const index = a2.findIndex(val => val === head);
//         if(index !== -1) {
//             a2 = a2.slice(index +1);
//             commonSubsequence.push(head);
//         }
//         helper(a1, a2);
//     }
//     helper(arr1,arr2);
//     return commonSubsequence.join();
// }

console.log(lcs("BACBAD","ABAZDC"))