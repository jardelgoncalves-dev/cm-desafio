import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { Layout } from '../components'

import api from '../services/api';

const Store = ({match}) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetch = async () => {
      const {id} = match.params
      if(!id) return;
      
      try {
        const { data } =await api.get(`store/${id}`);
        setProducts(data.products);
      } catch(err) {
        // tratar error
      } 
    }
    fetch()
  }, [match.params])

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
      title: 'Disponível',
      dataIndex: 'daleted_at',
      key: 'daleted_at',
      render: (v) => !v ? 'Sim' : 'Não'
    },
  ];

  return (
    <Layout>
      <h1>Produtos</h1>
      <Table dataSource={products || []} columns={columns} pagination={false} />
    </Layout>
  )
}

export default Store