const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const blogA = {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }

  const blogB = {
    _id: '5a422aa71b54a676234189k1',
    title: 'Crazy Foodies',
    author: 'John. B. Carmen',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Crazy_Foodies.html',
    likes: 10,
    __v: 1
  }

  const listWithOneBlog = [
    blogA
  ]

  const listWithTwoBlogs = [
    blogA, blogB
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has two blogs, equals the likes of first and second blog', () => {
    const result = listHelper.totalLikes(listWithTwoBlogs)
    expect(result).toBe(15)
  })
})

describe('favorite blog', () => {
  const blogA = {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }

  const blogB = {
    _id: '5a422aa71b54a676234189k1',
    title: 'Crazy Foodies',
    author: 'John. B. Carmen',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Crazy_Foodies.html',
    likes: 10,
    __v: 1
  }

  const listWithOneBlog = [
    blogA
  ]

  const listWithTwoBlogs = [
    blogA, blogB
  ]

  test('when list has only one blog, equals blogA', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5
      }
    )
  })

  test('when list has two blogs, equals blogB', () => {
    const result = listHelper.favoriteBlog(listWithTwoBlogs)
    expect(result).toEqual(
      {
        title: "Crazy Foodies",
        author: "John. B. Carmen",
        likes: 10
      }
    )
  })
})

describe('most blogs', () => {
  const blogA = {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }

  const blogB = {
    _id: '5a422aa71b54a676234189k1',
    title: 'Crazy Foodies',
    author: 'John. B. Carmen',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Crazy_Foodies.html',
    likes: 10,
    __v: 1
  }

  const blogC = {
    _id: '5a422aa71b54a676234189k1',
    title: 'Crazy Foodies The Sequel',
    author: 'John. B. Carmen',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Crazy_FoodiesII.html',
    likes: 15,
    __v: 1
  }

  const listWithOneBlog = [
    blogA
  ]

  const listWithThreeBlogs = [
    blogA, blogB, blogC
  ]

  test('when list has only one blog, equals Dijkstra with 1 blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(
      {
        author: "Edsger W. Dijkstra",
        blogs: 1
      }
    )
  })

  test('when list has three blogs, equals Carmen with 2 blogs', () => {
    const result = listHelper.mostBlogs(listWithThreeBlogs)
    expect(result).toEqual(
      {
        author: "John. B. Carmen",
        blogs: 2
      }
    )
  })
})

describe('most likes', () => {
  const blogA = {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }

  const blogB = {
    _id: '5a422aa71b54a676234189k1',
    title: 'Crazy Foodies',
    author: 'John. B. Carmen',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Crazy_Foodies.html',
    likes: 10,
    __v: 1
  }

  const blogC = {
    _id: '5a422aa71b54a676234189k1',
    title: 'Crazy Foodies The Sequel',
    author: 'John. B. Carmen',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Crazy_FoodiesII.html',
    likes: 15,
    __v: 1
  }

  const listWithOneBlog = [
    blogA
  ]

  const listWithThreeBlogs = [
    blogA, blogB, blogC
  ]

  test('when list has only one blog, equals Dijkstra with 1 blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(
      {
        author: "Edsger W. Dijkstra",
        likes: 5
      }
    )
  })

  test('when list has three blogs, equals Carmen with 2 blogs', () => {
    const result = listHelper.mostLikes(listWithThreeBlogs)
    expect(result).toEqual(
      {
        author: "John. B. Carmen",
        likes: 25
      }
    )
  })
})