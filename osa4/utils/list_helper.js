const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs)=> {
    let total = 0
    blogs.forEach(element => {
        total += element.likes
    })
    return total 
}

const favoriteBlog = (blogs) => {
    let favorite = null
    blogs.forEach(element => {
        if (favorite === null || element.likes >= favorite.likes) {
            favorite = element
        }
    })
    return favorite
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null // Palautetaan null, jos taulukko on tyhjä
    }

    // Luodaan objekti, jossa avaimena on kirjoittajan nimi ja arvona blogien määrä
    const blogCounts = {}
    blogs.forEach(blog => {
        if (blog.author in blogCounts) {
            blogCounts[blog.author]++
        } else {
            blogCounts[blog.author] = 1
        }
    })

    // Etsitään kirjoittaja, jolla on eniten blogeja
    let maxBlogsAuthor = ''
    let maxBlogsCount = 0
    for (const author in blogCounts) {
        if (blogCounts[author] > maxBlogsCount) {
            maxBlogsCount = blogCounts[author]
            maxBlogsAuthor = author
        }
    }

    return {
        author: maxBlogsAuthor,
        blogs: maxBlogsCount
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null // Palautetaan null, jos taulukko on tyhjä
    }

    // Luodaan objekti, jossa avaimena on kirjoittajan nimi ja arvona tykkäysten yhteismäärä
    const likeCounts = {}
    blogs.forEach(blog => {
        if (blog.author in likeCounts) {
            likeCounts[blog.author] += blog.likes
        } else {
            likeCounts[blog.author] = blog.likes
        }
    })

    // Etsitään kirjoittaja, jonka blogeilla on eniten tykkäyksiä
    let maxLikesAuthor = ''
    let maxLikesCount = 0
    for (const author in likeCounts) {
        if (likeCounts[author] > maxLikesCount) {
            maxLikesCount = likeCounts[author]
            maxLikesAuthor = author
        }
    }

    return {
        author: maxLikesAuthor,
        likes: maxLikesCount
    }
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}