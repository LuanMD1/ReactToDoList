import React, { Component } from 'react';
import { FaEdit, FaWindowClose, FaPlus } from 'react-icons/fa';

import '../src/style.css'


export default class Main extends Component {

  state = {
    novaTarefa: '',
    tarefas: [],
    index: -1,
  };


   componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));

    if (!tarefas) return;

    this.setState({ tarefas });
   }

  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;

    if (tarefas === prevState.tarefas) return;

    console.log('as tarefas mudaran', tarefas);

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  //** Handle Submit **//
  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefas, index } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim();
    
    if (tarefas.indexOf(novaTarefa) != -1) return;

    const novasTarefas = [...tarefas];

    if(index === -1) {
      this.setState({
        tarefas: [...novasTarefas, novaTarefa],
        novaTarefa: '',
      });
  } else {
    novasTarefas[index] = novaTarefa;

    this.setState({
      tarefas: novasTarefas,
      index: -1,
    });
  }
}



//** */ Handle Edit **//
handleEdit = (e, index) => {
  const  { tarefas } = this.state;

  this.setState({
    index,
    novaTarefa: tarefas[index],
  })
}

//** Handle Delete **//
handleDelete = (e, index) => {
  e.preventDefault();
  const { tarefas } = this.state;
  const novasTarefas = [...tarefas];
  novasTarefas.splice(index, 1);

  this.setState({
    tarefas: [...novasTarefas],
  });
}

//** Handle Change **//
handleChange = (e) => {
  this.setState({
    novaTarefa: e.target.value,
  });
}

render() {
  const { novaTarefa, tarefas } = this.state;
  return(
    <div className ="main">
      <h1>Lista de tarefas</h1>

      <form onSubmit={this.handleSubmit}
       action="#"
       className="form">
        <input
         onChange={this.handleChange}
         type="text"
         value={novaTarefa}
         className="input"
         />
        <button type="submit" className='buttonAdd'>
          <FaPlus />
        </button>
      </form>

      <ul className="tarefas">
        {tarefas.map((tarefa, index) => (
        <li key={tarefa}>
          {tarefa}
            <span>
            <FaEdit onClick={(e) => this.handleEdit(e, index)} className="edit"/>
            <FaWindowClose onClick={(e) => this.handleDelete (e, index)} className="remove"/>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}}

