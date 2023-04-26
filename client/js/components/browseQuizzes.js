// Home page to browse all quizzes
const browseQuizzes = async () => {
    const main = document.querySelector('#quiz-div')

    const response = await axios.get('/api/quizzes')
    main.innerHTML = `
    `
    for (let quiz of response.data) {
        const deleteQuiz = async (quizId) => {
            await axios.delete(`/api/quizzes/${quizId}`)
            container.remove()
        }

        const container = document.createElement('div')
        const deleteIcon = document.createElement('i')
        const image = document.createElement('img')
        const cardBody = document.createElement('div')
        const cardTitle = document.createElement('h5')
        const cardSubtitle = document.createElement('h6')
        const cardParagraph = document.createElement('p')
        const button = document.createElement('a')

        container.classList.add('card')
        container.style.width = '18rem'
        container.style.position = 'relative'
        deleteIcon.classList.add('fas')
        deleteIcon.classList.add('fa-trash')
        deleteIcon.style.position = 'absolute'
        deleteIcon.style.top = '10px'
        deleteIcon.style.right = '10px'
        deleteIcon.style.cursor = 'pointer'
        deleteIcon.onclick = () => deleteQuiz(quiz.id)
        image.classList.add('card-img-top')
        image.src = '/img/The_Simpsons_yellow_logo.svg.png' // Replace with random image API
        cardBody.classList.add('card-body')
        cardTitle.classList.add('card-title')
        cardSubtitle.classList.add('card-subtitle')
        cardSubtitle.classList.add('mb-2')
        cardSubtitle.classList.add('text-muted')
        cardParagraph.classList.add('card-text')
        button.href = '#' // Replace with link to Quiz
        button.classList.add('btn')
        button.classList.add('btn-primary')

        const quizResponse = await axios.get(`/api/quizzes/${quiz.id}`)
        // console.log(quizResponse)
        cardTitle.textContent = quizResponse.data[0].title
        cardSubtitle.textContent = quizResponse.data[0].difficulty
        cardParagraph.textContent = quizResponse.data[0].topic
        button.textContent = 'Take Quiz'

        main.append(container)
        container.append(image)
        container.append(cardBody)
        cardBody.append(cardTitle)
        cardBody.append(cardSubtitle)
        cardBody.append(cardParagraph)
        cardBody.append(button)
        cardBody.append(deleteIcon)
    }

    main.style.display = 'grid'
    main.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))'
    main.style.gridGap = '20px'
}

export default browseQuizzes