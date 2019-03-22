console.log('javascript loaded');

$(document).ready(onReady);

// function to run at page load
function onReady() {
   console.log('jQuery loaded');
   renderAllTasks();

   $('.btn-change-status').on('click', changeTaskStatus);
   $('.btn-delete-row').on('click', deleteTask);
}

// GET data from /tasks and append to DOM
function renderAllTasks() {
   $.ajax({
      type: 'GET',
      url: '/tasks',
   }).then(function (response) {
      $('#table-body').empty();
      let status = null;

      for (let task of response) {
         status = isTaskComplete(task.is_complete);
         console.log(status);

         $('#table-body').append(`
            <tr>
               <td>${task.task}</td>
               <td>${status}</td>
               <td><button class="btn-change-status">Make Complete</button></td>
               <td><button class="btn-delete-row">Delete</button></td>
            </tr>
      `);
      }
   }).catch(function (error) {
      console.log('Failed to retrieve tasks:', error);
      alert(`Error: could not retrieve tasks`);
   });
}

// Checks if task is complete and returns a string
function isTaskComplete(taskStatus) {
   console.log('in isTaskComplete', taskStatus);
   if (taskStatus === true) {
      return 'complete';
   } else if (taskStatus === false) {
      return 'incomplete';
   }
}
