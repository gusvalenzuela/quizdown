export function randomizeArray(array) {
  const tempArray = array
  const newArray = []
  //   looping through from back to randomize
  for (let c = tempArray.length; c > 0; c--) {
    const randomIndex = Math.floor(Math.random() * tempArray.length) // a random index
    newArray.push(tempArray[randomIndex]) // push to newArray for replacing
    tempArray.splice(randomIndex, 1) // delete choice as you go
  }

  return newArray
}
