import React from 'react';
import '../css/Formulario.css';

const Formulario = () => {
  const [nombre, setNombre] = React.useState('');
  const [apellido, setApellido] = React.useState('');
  const [lista, setLista] = React.useState([]);
  const [editIndex, setEditIndex] = React.useState(-1);

  const guardarDatos = (e) => {
    e.preventDefault();

    if (!nombre) {
      alert('Falta nombre');
      return;
    }
    if (!apellido) {
      alert('Falta apellido');
      return;
    }

    if (editIndex === -1) {
      // Nuevo usuario
      setLista([...lista, { nombre, apellido }]);
    } else {
      // Editar usuario existente
      const updatedList = [...lista];
      updatedList[editIndex] = { nombre, apellido };
      setLista(updatedList);
      setEditIndex(-1);
    }

    e.target.reset();
    setNombre('');
    setApellido('');
  };

  const deleteUser = (index) => {
    setLista(lista.filter((_, i) => i !== index));
  };

  const editUser = (index) => {
    const user = lista[index];
    setNombre(user.nombre);
    setApellido(user.apellido);
    setEditIndex(index);
  };

  return (
    <div className='container'>
      <h2 className='text-secondary text-center'>Formulario Registro De Usuario</h2>
      <form onSubmit={guardarDatos}>
        <input
          type='text'
          placeholder='Ingrese su nombre'
          className='form-control mb-3'
          value={nombre}
          onChange={(e) => setNombre(e.target.value.trim())}
        />
        <input
          type='text'
          placeholder='Ingrese su apellido'
          className='form-control mb-3'
          value={apellido}
          onChange={(e) => setApellido(e.target.value.trim())}
        />
        <div className='d-grid gap-2'>
          <button type='submit' className='btn btn-outline-dark'>
            {editIndex === -1 ? 'Registrar' : 'Actualizar'}
          </button>
        </div>
      </form>
      <hr />
      <ol className='list-group list-bordered'>
        {lista.map((item, index) => (
          <li className='list-group-item bg-secondary' key={index}>
            {item.nombre} {item.apellido}
            <button
              className='btn btn-danger btn-xs float-end'
              onClick={() => deleteUser(index)}
            >
              Eliminar
            </button>
            &nbsp;
            <button
              className='btn btn-dark float-end'
              onClick={() => editUser(index)}
            >
              Editar
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export  {Formulario};