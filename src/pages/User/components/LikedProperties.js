import { Button, Divider, Table, message } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { axios_instance } from '@/utils';
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

const LikedProperties = (props) => {

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
        columnTitle: 'Liked',
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

    const submitInfo = () => {
        console.log("Liked Properties", selectedRowKeys)
        // axios_instance.post('/user/update_liked_properties', {
        //     user_id: props.userInfo.firebase_id,
        //     property_ids: selectedRowKeys
        // }).then(res => {
        //     message.success('Liked Properties Updated');
        // }).catch(err => {
        //     console.log(err)
        //     message.error('Failed to update Liked Properties');
        // })
        props.toggleProfileUpdated()
    }

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
                pagination={{
                    pageSize: 20,
                    position: ['bottomCenter'],
                    showSizeChanger: false,
                }}
            />
            <Divider />
            <Button type='primary' onClick={submitInfo}>Save</Button>
        </div>
    )
}

export default LikedProperties