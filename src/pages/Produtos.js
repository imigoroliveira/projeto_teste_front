import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import axios from 'axios';

const Produtos = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({ id: '', name: '', created_at: '', updated_at: '' });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
      try {
          const response = await axios.get('http://localhost:8000/api/produtos/listar');
          setProducts(response.data);
          console.log(response);
      } catch (error) {
          console.error('Failed to fetch products:', error);
      }
  };
    const handleAddProduct = () => {
        setShowAddModal(true);
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setShowEditModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleSaveProduct = async (e) => {
        e.preventDefault();
        const { name } = e.target.elements;
        const newProduct = { name: name.value };

        try {
            await axios.post('https://your-api-url/produto/criar/', newProduct);
            fetchProducts();
            setShowAddModal(false);
        } catch (error) {
            console.error('Failed to save product:', error);
        }
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const { name } = e.target.elements;
        const updatedProduct = { ...selectedProduct, name: name.value };

        try {
            await axios.put(`https://your-api-url/products/${selectedProduct.id}`, updatedProduct);
            fetchProducts();
            setShowEditModal(false);
        } catch (error) {
            console.error('Failed to update product:', error);
        }
    };

    return (
        <div>
            <h1>Produtos</h1>
            <Button variant="primary" onClick={handleAddProduct}>Adicionar Produto</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Creado em:</th>
                        <th>Atualizado em:</th>
                        <th>Ações:</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.created_at}</td>
                            <td>{product.updated_at}</td>
                            <td>
                                <Button variant="info" onClick={() => handleEditProduct(product)}>Editar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showAddModal} onHide={handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSaveProduct}>
                        <Form.Group controlId="name">
                            <Form.Label>Nome:</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" />
                        </Form.Group>
                        <Button variant="primary" type="submit">Salvar</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Produto:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdateProduct}>
                        <Form.Group controlId="name">
                            <Form.Label>Nome:</Form.Label>
                            <Form.Control type="text" placeholder="Inserir nome" defaultValue={selectedProduct.name} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Salvar</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Produtos;
