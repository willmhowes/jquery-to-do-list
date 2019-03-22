console.log('javascript loaded');

$(document).ready(onReady);

function onReady() {
   console.log('jQuery loaded');
   renderAllTasks();
}

function renderAllTasks() {
   $.ajax({
      type: 'GET',
      url: '/tasks',
   }).then(function (response) {
      $('#task-list').empty();

      for(let task of response) {
         $('#task-list').append(`
         <li>${task.task}</li>
      `);
      }

   }).catch(function (error) {

   })
}
