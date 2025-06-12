import { useState, ChangeEvent, FormEvent, Dispatch } from 'react'
// import { v4 } from 'uuid'

import type { Activity } from '../types/index'
import { categories } from '../data/categories'
import type { ActivityActions } from '../reducers/activity-reducers'

type FormProps = {
    dispatch : Dispatch<ActivityActions>
}

const initialState = {
        category : 1,         
        name:'',
        calories: 0 
}

export default function Form({dispatch}: FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState)
    

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {

        const isNumberField =['category','calories'].includes(e.target.id)

        console.log(isNumberField)

        setActivity({
            ...activity,
            [e.target.id] : isNumberField ? +e.target.value : e.target.value 
        })
        
        console.log(e.target.value)
    }

    const isValidActivity = () =>{
        const { name, calories} = activity
        return name.trim() !== '' && calories > 0
    }


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("Enviando submit")
        dispatch({ type: "save-activity", payload:{newActivity: activity } })

        setActivity(initialState)
    }

  return (
    <form className='space-y-5 bg-white shadow p-10 rounded-lg' onSubmit={handleSubmit}>        
        <div className='grid grid-cols-1 gap-3'>   
            <label htmlFor="category" className='font-bold'>Categoria</label>

            <select 
                className='border border-slate-300 p-2 rounded-lg w-full bg-white'
                id="category"
                value={activity.category}   
                onChange={handleChange}  
            >
            {categories.map(category => (
                <option
                    key={category.id}
                    value={category.id}
                >                    
                    {category.name}
                </option>
            ))}
            </select>
        </div>

        <div className='grid grid-cols-1 gap-3'>
            <label htmlFor='name'></label>
            <input 
                id="name"
                type="text" 
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Ejemplo ... Comida, jugo de Naranja, Ensalada"
                value={activity.name}
                onChange={handleChange}  
            />
        </div>

        <div className='grid grid-cols-1 gap-3'>
            <label htmlFor="calories"></label>
            <input 
                id='calories'
                type="number" 
                className='border border-slate-300 p-2 rounded-lg'
                placeholder='Ejemplo ... Calorias 300 o 500'
                value={activity.calories}
                onChange={handleChange}  
            />
        </div>

        <input 
                type='submit'                
                className='bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-30' 
                value = {activity.category == 1 ? 'Guardar comida': 'Guardar Ejercicio'}
                disabled={!isValidActivity()}
                
        />

    <p>FORMULARIO</p>
    </form>
 )
}
