console.log('javascript loaded');

$(document).ready(onReady);

// function to run at page load
function onReady() {
   console.log('jQuery loaded');
   renderAllTasks();

   $('#btn-add-task').on('click', addNewTask);
   $('#table-body').on('click', '.btn-update-status', updateTaskStatus);
   $('#table-body').on('click', '.btn-delete-row', deleteTask);
}

// adds a new task to the server
function addNewTask(event) {
   event.preventDefault();

   let newTask = {
      task: $('#in-task').val(),
      is_complete: false, // assume task is not yet complete
   }

   // Clears the input field
   $('#in-task').val('');

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
function updateTaskStatus() {
   let rowToUpdate = $(this).closest('tr');
   let taskID = rowToUpdate.data('id');
   console.log('Row ID:', taskID);

   $.ajax({
      type: 'PUT',
      url: `/tasks/update/${taskID}`
   }).then(function (response) {
      console.log('Success: task was updated');
      renderAllTasks();
   }).catch(function (error) {
      console.log('Failed to update task:', error);
      alert(`Error: could not update task`);
   });
}

// deletes a task from the database
function deleteTask() {
   let rowToDelete = $(this).closest('tr');
   let taskID = rowToDelete.data('id');
   console.log(taskID);

   $.ajax({
      type: 'DELETE',
      url: `/tasks/${taskID}`,
   }).then(function (response) {
      console.log('Success: task was deleted');
      renderAllTasks();
   }).catch(function (error) {
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
      let $tr = null;

      // renders all incomplete tasks together
      for (let task of response) {
         status = isTaskComplete(task.is_complete);

         if (status == 'incomplete') {
            $tr = $(`
               <tr>
                  <td>${task.task}</td>
                  <td>${status}</td>
                  <td>
                     <button type="button" class="btn-update-status btn btn-primary btn-sm">Complete</button>
                  </td>
                  <td>
                     <button type="button" class="btn-delete-row btn btn-danger btn-sm">Delete</button>
                  </td>
               </tr>
            `);

            $tr.data(task);
            $('#table-body').append($tr);
         }
      }

      // renders all complete tasks together
      for (let task of response) {
         status = isTaskComplete(task.is_complete);

         if (status == 'complete') {
            $tr = $(`
               <tr class="incomplete">
                  <td>${task.task}</td>
                  <td>${status}</td>
                  <td></td>
                  <td>
                     <button type="button" class="btn-delete-row btn btn-danger btn-sm">Delete</button>
                  </td>
               </tr>
            `);

            $tr.data(task);
            $('#table-body').append($tr);
         }
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
