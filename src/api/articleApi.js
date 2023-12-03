import { $host } from "./index";

export const getAllRecipe = async () => {
    const {data} = await $host.get('https://localhost:7008/getRecipe')
    return data
}

export const getRecipe = async (id) => {
    const {data} = await $host.get('https://localhost:7008/getRecipe_id/' + id)
    return data
}

export const deleteRecipe = async (id) => {
    await $host.delete('https://localhost:7008/deleteRecipe/' + id)
}

export const addRecipe = async (recipe) => {
    await $host.post('https://localhost:7008/addRecipe/' + recipe.nameRecipe + '&&' + recipe.ingredient + '&&' + recipe.description)
}

export const updateRecipe = async (recipe) => {
    await $host.put('https://localhost:7008/updateRecipe/'+ recipe.idRecipe + '&&' + recipe.nameRecipe + '&&' + recipe.ingredient + '&&' + recipe.description)
}