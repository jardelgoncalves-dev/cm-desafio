import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';
import { Layout, ProductModal } from '../components'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import api from '../services/api';

const Product = () => {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ id: null, name: '', sell: '', stores: [] });
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState({ fetchLoading: false, addLoading: false })
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      
      try {
        const { data } =await api.get(`product`);
        setProducts(data);
      } catch(err) {
        // tratar error
      } 
    }
    fetch()
  }, [])

  useEffect(() => {
    const fetch = async () => {
      
      try {
        const { data } =await api.get(`store`);
        setStores(data);
      } catch(err) {
        // tratar error
      } 
    }
    fetch()
  }, [])

  const onChange = (name, value) => {
    setForm(old  => ({
      ...old,
      [name]: value
    }))
  }

  const onModalCancel = () => {
    setModalVisible(false);
    setForm({
      name: '',
      id: null,
      sell: '',
      stores: []
    })
  }

  const onEdit = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      sell: product.sell,
      stores: product.stores.map(st => String(st.id))
    })

    setModalVisible(true);
  }

  const onSave = async () => {
    const { id, name, sell, stores } = form
    
    if (!name || !sell) return;

    try {
      setLoading({ addLoading: true });
      if (id) {
        const { data } = await api.put(`product/${id}`, {
          name,
          sell,
          stores,
        })

        setProducts(old => (old.map(
          pd => Number(pd.id) === Number(id) ? data : pd)))
        
      } else {
        const { data } = await api.post('product', {
          name,
          sell,
          stores,
        })
        setProducts(old => ([ ...old, data ]))
      }
    } catch(err) {
      console.log(err)
    } finally {
      setLoading({ addLoading: false });
    }

    setForm({
      name: '',
      id: null
    })

    setModalVisible(false)
  }

  const onDelete = (id) => {
    const fetchDelete = async () => {
      try {
        await api.delete(`product/${id}`);
        setProducts(old => old.filter(pd => Number(pd.id) !== Number(id)))
      } catch(err) {
        // tratar error
      }
    }

    Modal.confirm({
      title: 'Tem certeza que deseja excluir o produto?',
      content: 'Você poderá recuperar os produtos exluidos na tela de recuperações.',
      onCancel() { setForm({ name: '', id: null, stores: [], sell: '' })},
      onOk() { fetchDelete() },
      cancelText: 'Cancelar',
      okText: 'Excluir'
    })
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Preço de venda',
      dataIndex: 'sell',
      key: 'sell',
      render: (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)
    },
    {
      title: 'Vinculado á',
      dataIndex: 'stores',
      key: 'stores',
      render: (v) => {
        const active = v.filter(p=> p.delete_at === null);
        return active.length > 1 ? `${active.length} Lojas` : `${active.length} Loja`
      }
    },
    {
      title: 'Ações',
      dataIndex: 'id',
      key: 'id_Action',
      render: (v, record) => (
        <>
          <Button type="link" onClick={() =>onDelete(record.id)}><DeleteOutlined /></Button>
          <Button type="link" onClick={() => onEdit(record)}><EditOutlined /></Button>
        </>
      )
    },
  ];

  return (
    <Layout>
      <div className="header__page__home">
        <h1>Todos os produtos</h1>
        <Button
          type="primary"
          size="large"
          onClick={() => setModalVisible(true)}
        >
          Cadastrar produto
        </Button>
      </div>
      <Table dataSource={products || []} columns={columns} pagination={false} />
      <ProductModal
        onCancel={onModalCancel}
        visible={modalVisible}
        data={form}
        isEdit={form.id}
        onChange={onChange}
        onSave={onSave}
        loading={loading.addLoading}
        storesOption={stores}
      />
    </Layout>
  )
}

export default Product