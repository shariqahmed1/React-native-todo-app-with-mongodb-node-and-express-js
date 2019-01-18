const URL = 'https://mernstackcrud.herokuapp.com';

const allTodos = async () =>{
    try{
        const res = await fetch(`${URL}/fetch/list`)
        const data = await res.json();
        return data;
    }
    catch(e){
        throw new Error(e.message);
    }
}

const addTodo = async (task) =>{
    try{
        const res = await fetch(`${URL}/add/addItem`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({title:task})
        });
        const data = await res.json();
        return data;
    }
    catch(e){
        throw new Error(e.message);
    }
}

const updateTodo = async (id,task) =>{
    try{
        const res = await fetch(`${URL}/update/updateItem/${id}/${task}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            }
        });
        const data = await res.json();
        return data;
    }
    catch(e){
        throw new Error(e.message);
    }
}

const deleteTodo = async (id) =>{
    try{
        const res = await fetch(`${URL}/delete/deleteItem/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        });
        const data = await res.json();
        return data;
    }
    catch(e){
        throw new Error(e.message);
    }
}

export {allTodos,addTodo,deleteTodo,updateTodo};
