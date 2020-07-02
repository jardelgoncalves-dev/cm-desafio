import React from 'react';

import { Modal, Input, Select } from 'antd';
import CurrencyInput from 'react-currency-input';

const { Option } = Select;

const ProductModal = ({
  data,
  storesOption = [],
  visible,
  isEdit,
  onChange,
  onSave,
  onCancel,
  loading,
}) => {
  return (
    <Modal
      title={isEdit ? 'Editar Produto': 'Cadastrar Produto'}
      visible={visible}
      onOk={onSave}
      onCancel={onCancel}
      okText="salvar"
      cancelText="Cancelar"
      okButtonProps={{
        loading,
      }}
    >
      <div className="ant-input-group">
        <h5>Nome</h5>
        <Input
          placeholder="Nome do produto"
          onChange={e => onChange('name', e.target.value)}
          value={data.name}
        />
      </div>

      <div className="ant-input-group">
        <h5>Preço de venda</h5>
        <CurrencyInput
          decimalSeparator=","
          thousandSeparator="."
          prefix="R$"
          className="ant-input"
          onChangeEvent={(e, m, float) => onChange('sell', float)}
          value={data.sell}
        />
      </div>
      <div className="ant-input-group">
        <h5>Lojas</h5>
        <Select
          mode="multiple"
          placeholder="Escolha as lojas"
          defaultValue={data.stores}
          style={{ width: '100%' }}
          onChange={v => onChange('stores', v)}
        >
          {storesOption.map(st => <Option key={st.id} >{st.name}</Option>)}
        </Select>
      </div>
    </Modal>
  )
}

export default ProductModal