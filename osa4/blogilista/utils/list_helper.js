const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogi) => {
    const likesMapped = blogi.map(like => like.likes)
    const initialValue = 0
    const summedLikes = likesMapped.reduce((acc, current) => 
    acc + current, initialValue)
    return summedLikes
}
  
module.exports = {
  dummy,
  totalLikes
}