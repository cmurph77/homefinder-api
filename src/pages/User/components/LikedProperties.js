import { Divider, Table } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import React, { useState } from 'react';



import './LikedProperties.scss'
const LikedProperties = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const toggleSelection = (record, selected) => {
        const key = record.key; // 假设每行数据都有唯一的key属性
        const newSelectedRowKeys = selected
          ? [...selectedRowKeys, key]
          : selectedRowKeys.filter(k => k !== key);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        
        renderCell: (checked, record, index, originNode) => {
            // 添加点击事件处理器
            const handleClick = () => toggleSelection(record, !checked);
            // 应用style使光标在悬停时变为pointer
            return checked ? (
              <HeartFilled style={{ color: 'red', cursor: 'pointer' }} onClick={handleClick} />
            ) : (
              <HeartOutlined style={{ color: 'red', cursor: 'pointer' }} onClick={handleClick} />
            );
          },
    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Rent',
            dataIndex: 'rent',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
    ];
    const data = [
        {
            key: '1',
            name: 'xxx',
            rent: '5,200',
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'xxx2',
            rent: '4,200',
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'xxx3',
            rent: '320',
            address: 'Sydney No. 1 Lake Park',
        },
        {
            key: '4',
            name: 'xxx4',
            rent: '1,500',
            address: 'Sydney No. 1 Lake Park',
        },
    ];
    return (
        <div className='liked-container'>
            <h3 className='liked-title'>Liked Properties</h3>
            <Divider />
            <Table 
                rowSelection={rowSelection} 
                columns={columns} 
                dataSource={data} 
            />
        </div>
    )
}

export default LikedProperties