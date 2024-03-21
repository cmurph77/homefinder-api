import { Divider, Table } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import React, { useState } from 'react';



import './LikedProperties.scss'

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




const LikedProperties = () => {

    const defaultSelectedRowKeys = data.map(record => record.key)

    const [selectedRowKeys, setSelectedRowKeys] = useState(defaultSelectedRowKeys);

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const toggleSelection = (record, selected) => {
        const key = record.key;
        const newSelectedRowKeys = selected
          ? [...selectedRowKeys, key]
          : selectedRowKeys.filter(k => k !== key);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        renderCell: (checked, record, index, originNode) => {
            const handleClick = () => toggleSelection(record, !checked);
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