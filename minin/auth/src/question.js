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
        question.id = response.name;
        return question;
      })
      .then(addToLocalStorage)
      .then(Question.renderList)
  }

  static renderList() {
    const questions = getQuestionsFromLocalStorage();
    const listHtml = questions.length
      ? questions.map(makeQuestionCard).join('')
      : `<div class="mui&#45;&#45;text-headline">you haven't asked the question yet</div>`;

    const list = document.getElementById('list');
    list.innerHTML = listHtml;
  }
}

function addToLocalStorage(question) {
  const questions = getQuestionsFromLocalStorage();
  questions.push(question);
  localStorage.setItem('questions', JSON.stringify(questions));
}

function getQuestionsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('questions') || '[]');
}

function makeQuestionCard(question) {
  return `
    <div class="mui--text-black-54">
        ${new Date(question.date).toLocaleDateString()}
        ${new Date(question.date).toLocaleTimeString()}
    </div>
    <div>${question.text}</div>
    <br>
  `;
}