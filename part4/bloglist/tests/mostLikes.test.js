const listHelper = require('../utils/list_helper')

describe('most likes', () => {
    const expectedAuthorOne = {
        author: 'Edsger W. Dijkstra',
        likes: 5
    }

    const expectedAuthorMany = {
        author: 'Edsger W. Dijkstra',
        likes: 12
    }

    const expectedAuthorManyMore = {
        author: 'Res',
        likes: 50
    }

    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    const listWithMoreBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Alex',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 12,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f3',
            title: 'Statement Considered Harmful',
            author: 'Alex',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10,
            __v: 0
        }
    ]

    const listWithEvenMoreBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Alex',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 12,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f3',
            title: 'Statement Considered Harmful',
            author: 'Res',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 50,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f3',
            title: 'Statement Considered Harmful',
            author: 'Res',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10,
            __v: 0
        }
    ]

    test('of empty list is empty object', () => {
        expect(listHelper.mostLikes([])).toEqual({})
    })

    test('when list has only one blog show that one', () => {
        expect(listHelper.mostLikes(listWithOneBlog)).toEqual(expectedAuthorOne)
    })

    test('of a bigger list is calculated right', () => {
        expect(listHelper.mostLikes(listWithMoreBlogs)).toEqual(expectedAuthorMany)
    })
    test('of an even bigger list is calculated right', () => {
        expect(listHelper.mostLikes(listWithEvenMoreBlogs)).toEqual(expectedAuthorManyMore)
    })
})