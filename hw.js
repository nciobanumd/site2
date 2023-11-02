const FizzBuzz = (n) => {
    let arr = []
    for (i = 1; i <= n; i++){
        if (i % 5 === 0 && i % 3 === 0 ) arr.push("FizzBuzz")
        else if (i % 3 === 0) arr.push("Fizz")
        else if (i % 5 === 0) arr.push("Buzz")
        else arr.push(i.toString())
    }
    return arr
}

/* console.log(FizzBuzz(100)); */

const FindMissingNumber = (n) => {
    let arr = Array(Math.max(...n)).fill(0)
    n.forEach((item) => (arr[item] = 1 ));
    
    const missingNumber = arr
        .map((item, index) => (item === 0 ? index: -1))
        .filter((item) => item !== -1)
    

    console.log(missingNumber);

}
/* n = [3, 0, 1, 8]
FindMissingNumber(n) */

const arr3 = [1, 2, 4, 6, 7]

const FindMissingNumber1 = (list) => {
    const sorted = list.sort((a, b) => a - b)

    for (let i = 0; i < sorted.length; i++) {
        if (i !== sorted[i]) {
            return i
        }
    }
    return list;
}

/* console.log(FindMissingNumber1(arr3)); */
