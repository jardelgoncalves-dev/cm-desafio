import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Modal, Spin } from 'antd';
import { Layout, CardStore, StoreModal } from '../components'

import api from '../services/api';

const Home = () => {
  const [form, setForm] = useState({ id: null, name: ''});
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState({ fetchLoading: false, addLoading: true })
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading({ fetchLoading: true });
        const { data } =await api.get('store');
        setStores(data);
      } catch(err) {
        // tratar error
      } finally {
        setLoading({ fetchLoading: false });
      }
    }
    fetch()
  }, [])

  const onChange = (e) => {
    const { value } = e.target;
    setForm(old  => ({
      ...old,
      name: value
    }))
  }

  const onModalCancel = () => {
    setModalVisible(false);
    setForm({
      name: '',
      id: null
    })
  }

  const onDelete = (id) => {
    const fetchDelete = async () => {
      try {
        await api.delete(`store/${id}`);
        setStores(old => old.filter(store => Number(store.id) !== Number(id)))
      } catch(err) {
        // tratar error
      }
    }

    Modal.confirm({
      title: 'Tem certeza que deseja excluir a loja?',
      content: 'Ao excluir a loja, você não será mais capaz de recuperá-la',
      onCancel() { setForm({ name: '', id: null })},
      onOk() {fetchDelete()},
      cancelText: 'Cancelar',
      okText: 'Excluir'
    })
  }

  const onEdit = (store) => {
    setForm({
      name: store.name,
      id: store.id
    })

    setModalVisible(true);
  }

  const onSave = async () => {
    const { id, name } = form
    if(!name) return;
    try {
      setLoading({ addLoading: true });
      if (id) {
        const { data } = await api.put(`store/${id}`, {
          name
        })

        setStores(old => (old.map(
          st => Number(st.id) === Number(id) ? data : st)))
        
      } else {
        const { data } = await api.post('store', {
          name
        })
        setStores(old => ([ ...old, data ]))
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

  return (
    <Layout>
      <div className="header__page__home">
        <h1>Lojas</h1>
        <Button type="primary" onClick={() => setModalVisible(true)} size="large">Cadastrar loja</Button>
      </div>
      <Row >
        {loading.fetchLoading && (
          <div className="container__loading">
            <Spin size="large" />
          </div>
        )}
        {(!stores || !stores.length) && !loading.fetchLoading && (
          <span>Você não possui nenhuma loja cadastrada :(</span>
        )}
        {stores && stores.map(store => (
          <Col key={store.id} style={{ padding: 6 }} xs={32} sm={16} md={8} lg={4}>
            <CardStore
              id={store.id}
              name={store.name}
              onDelete={() => onDelete(store.id)}
              onEdit={() => onEdit(store)}
            />
          </Col>
        ))}
      </Row>
      <StoreModal
        onCancel={onModalCancel}
        visible={modalVisible}
        data={form}
        isEdit={form.id}
        onChange={onChange}
        onSave={onSave}
        loading={loading.addLoading}
      />
    </Layout>
  )
}

export default Home