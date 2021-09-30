export default {
	state: {
		tasks: [{
			author: "dasdas",
			date: "2021-09-03T00:00:00.000Z",
			finishDate: "2021-09-29T05:44:08.779Z",
			id: 1,
			board: 3,
			startDate: "2021-09-29T05:43:44.391Z",
			status: "Завершена",
			text: "dsadas",
			title: "dasdasd",
			usedTime: 0
		}],
		boards: [{
			id:    1,
			title: 'Создано',
			tasks: []
		},
			{
				id:    2,
				title: 'В работе',
				tasks: []

			},
			{
				id:    3,
				title: 'Завершено',
				tasks: []
			}]
	},

	actions: {
		 getTrelloData(context){
			const tasks = JSON.parse(localStorage.getItem('tasks'))
			const boards = JSON.parse(localStorage.getItem('boards'))
			context.commit('setAllTasksBoards', tasks, boards)
		}
	},
	mutations: {
		setAllTasksBoards(state, tasks, boards){
			state.tasks = tasks

			if (0 === state.boards.length) {
				state.boards = boards
			}
		},

		updateTask(state, taskId, boardId) {
			const task   = state.tasks.find((item) => task.id === +taskId)
			task.board = boardId

			if (boardId === 1) {
				task.status = "Создана"
			}
			else if (boardId === 2) {
				task.status = "В работе"
				task.startDate = new Date();
			}
			else if (boardId === 3) {
				task.status = "Завершена"
				task.finishDate = new Date();
				task.usedTime = this.usedTime( new Date(task.finishDate), new Date(task.startDate));
			}
		},
		addTask(state, newTask){
			newTask.id = state.tasks.length;
			state.tasks.push(newTask)
		},

	},
	getters:{
		allTasks(state){
			return state.tasks
		},
		allBoards(state, getters){
			const boards = []
			if (state.boards) {
				state.boards.forEach(board => {
					board.tasks = getters.getTaskByBoardId(board.id)
					boards.push(board)
				})
			}
			return boards


		},
		getTaskByBoardId:state => boardId =>{
			return state.tasks.filter(task => task.board === boardId)
		}
	}
}