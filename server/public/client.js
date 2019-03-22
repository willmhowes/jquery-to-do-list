console.log('javascript loaded');

$(document).ready(onReady);

// function to run at page load
function onReady() {
   console.log('jQuery loaded');
   renderAllTasks();

   $('#btn-add-task').on('click', addNewTask);
   $('#table-body').on('click', '.btn-change-status', changeTaskStatus);
   $('#table-body').on('click', '.btn-delete-row', deleteTask);
}

function addNewTask(event) {
   event.preventDefault();

   let newTask = {
      task: $('#in-task').val(),
      is_complete: false, // assume task is not yet complete
   }

   $.ajax({
      type: 'POST',
      url: '/tasks',
      data: newTask,
   }).then(function (response) {
      renderAllTasks();
   }).catch(function (error) {
      console.log('Failed to add new task:', error);
      alert(`Error: could not add new task`);
   });
}

// TODO: write function to update a task's status
function changeTaskStatus() {

}

// deletes a task from the database and then renders the new DOM
function deleteTask() {
   let rowToDelete = $(this).closest('tr');
   let taskId = rowToDelete.data('id');

   $.ajax({
      type: 'DELETE',
      url: `/tasks/${taskId}`,
   }).then (function(response) {
      console.log('Success: task was deleted');
      renderAllTasks();
   }).catch(function(error) {
      console.log('Failed to delete task:', error);
      alert(`Error: could not delete task`);
   });
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

         let $tr =$(`
            <tr>
               <td>${task.task}</td>
               <td>${status}</td>
               <td><button class="btn-change-status">Make Complete</button></td>
               <td><button class="btn-delete-row">Delete</button></td>
            </tr>
         `);

         $tr.data(task);
         $('#table-body').append($tr);
      }
   }).catch(function (error) {
      console.log('Failed to retrieve tasks:', error);
      alert(`Error: could not retrieve tasks`);
   });
}

// Checks if task is complete and returns a string
function isTaskComplete(taskStatus) {
   if (taskStatus === true) {
      return 'complete';
   } else if (taskStatus === false) {
      return 'incomplete';
   }
}
