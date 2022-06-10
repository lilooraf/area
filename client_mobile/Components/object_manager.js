export const getKeys = (obj) => {
    var key_arr = Object.keys(obj)
    let array = []


    key_arr.forEach(element => {
            array.push(element)
    });
    return array
}