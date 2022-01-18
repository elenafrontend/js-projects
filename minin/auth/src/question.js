export class Question {
  static create(question) {
    return fetch('https://minin-auth-default-rtdb.firebaseio.com/question.json', {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
      })
  }
}