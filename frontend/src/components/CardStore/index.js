import React from 'react';
import {  Card, Avatar, Button } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const CardStore = ({ id, name, onDelete, onEdit }) => {
  return (
    <Card
      style={{ width: '100%' }}
      cover={
        <img
          alt="example"
          src={`https://via.placeholder.com/470/002F6A/FFFFFF?text=${name.replace(/ /, '+')}`}
        />
      }
      actions={[
        <Link to={`store/${id}`}>
          <Button type="link" key="ver">
              <EyeOutlined key="eye" />
          </Button>
        </Link>,
        <Button type="link" key="edit" onClick={onEdit}>
          <EditOutlined key="edit" />
        </Button>,
        <Button type="link" key="delete" onClick={onDelete}>
        <DeleteOutlined key="delete" />
      </Button>
      ]}
    >
    <Meta
      avatar={<Avatar src="https://www.pinclipart.com/picdir/big/11-110975_available-app-store-vector-online-store-icon-png.png" />}
      title={name}
    />
    </Card>
  )
}

export default CardStore