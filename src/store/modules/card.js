
export default {
	state: {
		taskCounter: 1,
		tasks: [{
			author: "dasdas",
			date: "2021-09-03T00:00:00.000Z",
			finishDate: "2021-09-29T05:44:08.779Z",
			id: 0,
			board: 3,
			startDate: "2021-09-29T05:43:44.391Z",
			status: "Завершена",
			text: "dsadas",
			title: "dasdasd",
			usedTime: 0
		}],
		boards: [{
			id:    0,
			title: 'Создано',
			tasks: []
		},
			{
				id:    1,
				title: 'В работе',
				tasks: []

			},
			{
				id:    2,
				title: 'Завершено',
				tasks: []
			}]
	},

	actions: {
		 getTrelloData(context){
			const tasks = JSON.parse(localStorage.getItem('tasks')) ?? [] //проверка на null
			const boards = JSON.parse(localStorage.getItem('boards')) ?? []
			 context.commit('setAllTasksBoards', {tasks, boards})
		}
	},
	mutations: {
		//второй аргумент(payload) - только один объект
		setAllTasksBoards(state, {tasks, boards}){
			state.tasks = tasks

			if (0 === state.boards.length) {
				state.boards = boards
			}
		},

		updateTask(state, {taskId, boardId}) {

			const task   = state.tasks.find((item) => item.id === +taskId)
			task.board = boardId


			if (boardId === 0) {
				task.status = "Создана"
			}
			else if (boardId === 1) {
				task.status = "В работе"
				task.startDate = new Date();
			}
			else if (boardId === 2) {
				task.status = "Завершена"
				task.finishDate = new Date();
				let diff = (new Date(task.finishDate).getTime() - new Date(task.startDate).getTime()) / 1000;
				diff /= (60 * 60);
				task.usedTime = Math.abs(Math.round(diff));
			}
		},



		addTask(state, newTask){
			newTask.id = state.taskCounter;
			newTask.board = 0
			state.tasks.push(newTask)
			state.taskCounter += 1
		},
//почитать про мутации и геттеры(вьюх в целом)
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
			return state.tasks?.filter(task => task.board === boardId)
		}             //      ? проверит tasks на null, если не пустая, то выполнит

	}
}