const getPosts = (limit) => {
    return fetch(`https://jsonplaceholder.typicode.com/po(OOO)sts?_limit=${limit}`)
}

const renderPost = async () => {
    try {
        const response = await getPosts(5). then(result =>result.json())

        if(!Array.isArray(response)){
            throw new SyntaxError ('Somthing went wrong')
        }

        response.forEach(item => console.log(item))
    } catch (error) {
        console.log('Handeled error: ' + error);
    }
}

renderPost()
