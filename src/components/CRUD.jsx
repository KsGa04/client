import React from "react";
import{
    getAllRecipe,
    getRecipe,
    deleteRecipe,
    addRecipe,
    updateRecipe,
} from "../api/articleApi"
import { Button, Form, Table } from "react-bootstrap";

const CRUD = () => {
    const [idRecipeForFind, setIdRecipeForFind] = React.useState(0);

    const [productData, setProductData] = React.useState([]);
    const [productsData, setProductsData] = React.useState([]);

    const [productDataToAdd, setProductDataToAdd] = React.useState({nameRecipe:"", ingredient:"", description:""});

    const [productToDataToUpdate, setProductDataToUpdate] = React.useState({idRecipe:"", nameRecipe:"", ingredient:"", description:""});


    React.useEffect(() => {
        (async () => await Load())();
    }, []);

    async function Load(){
        getAllRecipe().then((data) => {
            setProductsData(data)
        })
    }

    const handleFind = (event) => {
        event.preventDefault(); 
            getRecipe(idRecipeForFind).then((data) => {
                setProductData(data)
            });
    }


    const handleDelete = async (id, event) => {
        event.preventDefault();
        setProductDataToUpdate({idRecipe:"", nameRecipe:"", ingredient:"", description:""});
        await deleteRecipe(id);
        await Load();
    }

    const handleAdd = async (event) => {
        event.preventDefault();
        await addRecipe(productDataToAdd);
        setProductDataToAdd({nameRecipe: "", ingredient: "", description: ""});
        await Load();
    }

    const handleSelectProductToUpdate = (recipe, event) => {
        setProductDataToUpdate(recipe);
    }

    const handleUpdate = async (event) => {
        event.preventDefault();
        await updateRecipe(productToDataToUpdate);
        setProductDataToUpdate({idRecipe: "", nameRecipe: "", ingredient: "", description: ""});
        await Load();
    }

    return(
        <div className="all">
            <Table striped bordered hover>
            <tbody>
                <tr>
                    <th>№</th>
                    <th>Название</th>
                    <th>Ингредиенты</th>
                    <th>Описание</th>
                    <th></th>
                    <th></th>
                </tr>
                {productsData.map((item, index) => (
                    <tr key={item.idRecipe}>
                        <td>{item.idRecipe}</td>
                        <td>{item.nameRecipe}</td>
                        <td>{item.ingredient}</td>
                        <td>{item.description}</td>
                        <td>
                            <Button variant="outline-primary" onClick={(event) => handleSelectProductToUpdate(item, event)}>
                                Изменить
                            </Button>
                        </td>
                        <td>
                            <Button variant="outline-danger" onClick={(event) => handleDelete(item.idRecipe, event)}>
                                Удалить
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </Table>
            <Form>
            <p className="tx">Нахождение необходимого рецепта</p>
            <Form.Control className="w-25 mx-auto" required id="id" placeholder="id" onChange={(e) => setIdRecipeForFind(e.target.value)}/>
            <Button variant="outline-success" className="d-flex mx-auto w-10 justify-content-center" onClick={handleFind}>Найти</Button>
            </Form>
            {productData && (
            <div>
                <p className="fw-bold">Название рецепта</p>
                <p>{productData.nameRecipe}</p>
                <p className="fw-bold">Ингредиенты</p>
                <p>{productData.ingredient}</p>
                <p className="fw-bold">Описание</p>
                <p>{productData.description}</p>
            </div>
            )}
            <Form>
            <p className="tx">Добавление рецепта</p>
                <Form.Control className="d-block w-25" required placeholder="Название" value={productDataToAdd.nameRecipe} onChange={(e) => setProductDataToAdd({...productDataToAdd, nameRecipe: e.target.value})}/>
                <Form.Control className="d-block w-50" required placeholder="Ингредиент" value={productDataToAdd.ingredient} onChange={(e) => setProductDataToAdd({...productDataToAdd, ingredient: e.target.value})}/>
                <Form.Control className="d-block w-75" required placeholder="Описание" value={productDataToAdd.description} onChange={(e) => setProductDataToAdd({...productDataToAdd, description: e.target.value})}/>
                <Button variant="outline-success" className="d-flex mx-auto w-25 justify-content-center" onClick={handleAdd}>Добавить</Button>
            </Form>
            {productToDataToUpdate.idRecipe !== "" && (
                <Form>
                <p className="tx">Изменение рецепта</p>
                  <Form.Control className="d-block" required disabled value={productToDataToUpdate.idRecipe}/>
                  <Form.Control className="d-block w-25" required placeholder="Название" value={productToDataToUpdate.nameRecipe} onChange={(e) => setProductDataToUpdate({...productToDataToUpdate, nameRecipe: e.target.value})}/>
                  <Form.Control className="d-block w-50" required placeholder="Ингредиент" value={productToDataToUpdate.ingredient} onChange={(e) => setProductDataToUpdate({...productToDataToUpdate, ingredient: e.target.value})}/>
                  <Form.Control className="d-block" required placeholder="Описание" value={productToDataToUpdate.description} onChange={(e) => setProductDataToUpdate({...productToDataToUpdate, description: e.target.value})}/>
                  <Button variant="outline-success" className="d-flex mx-auto w-25 justify-content-center" onClick={handleUpdate}>Изменить</Button>
                </Form>
            )}
        </div>
    );
};

export default CRUD;