import React from 'react';

import { Modal, Input } from 'antd';

const StoreModal = ({
  data,
  visible,
  isEdit,
  onChange,
  onSave,
  onCancel,
  loading,
}) => {
  return (
    <Modal
      title={isEdit ? 'Editar loja': 'Cadastrar loja'}
      visible={visible}
      onOk={onSave}
      onCancel={onCancel}
      okText="salvar"
      cancelText="Cancelar"
      okButtonProps={{
        loading,
      }}
    >
      <h5>Nome</h5>
      <Input placeholder="Nome da loja" onChange={onChange} value={data.name} />
    </Modal>
  )
}

export default StoreModal