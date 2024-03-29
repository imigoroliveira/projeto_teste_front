import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const Produtos = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({ id: '', name: '', created_at: '', updated_at: '' });
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
      try {
          const response = await axios.get('http://localhost:8000/api/produtos/listar');
          setProducts(response.data.data);
          console.log(products);

        } catch (error) {
          console.error('Erro ao buscar os produtos:', error);
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
            await axios.post('https://localhost:8000/produtos/criar/', newProduct);
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
      delete updatedProduct.id;
  
      try {
          await axios.put(`https://localhost:8000/produtos/editar`, updatedProduct);
          fetchProducts();
          setShowEditModal(false);
      } catch (error) {
          console.error('Failed to update product:', error);
      }
  };

    return (
        <div style={{ width: '70%', margin: '0 auto', marginTop: '100px' }}>
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
                {Array.isArray(products) && products.map((product) => (
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
            <Form.Group controlId="created_at">
                <Form.Label>Criado em:</Form.Label>
                <br />
                <DatePicker
                    selected={new Date(selectedProduct.created_at)}
                    onChange={(date) => setSelectedProduct({ ...selectedProduct, created_at: date })}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
            </Form.Group>
            <Form.Group controlId="updated_at">
                <Form.Label>Atualizado em:</Form.Label>
                <br />
                <DatePicker
                    selected={new Date(selectedProduct.updated_at)}
                    onChange={(date) => setSelectedProduct({ ...selectedProduct, updated_at: date })}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
            </Form.Group>
            <Button variant="primary" type="submit">Salvar</Button>
        </Form>
    </Modal.Body>
</Modal>
        </div>
    );
};

export default Produtos;
