import { Button, Divider, Table, message } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { axios_instance } from '@/utils';
import './LikedProperties.scss'

const formatRent = (rent) => {
    const parts = rent.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
};

const LikedProperties = (props) => {
    const [data_liked_properties, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const user_id = 'YSixicUz'
            const res = await axios_instance.get(`/get-liked-properties/${user_id}`)
            let data = res.data
            data.map((record) => { 
                record.key = record.identifier 
                record['rent per month'] = '€ '+ formatRent(record['rent per month'])
                record['property-type'].bath = parseInt(record['property-type'].bath.match(/\d+/g)[0], 10) 
                record['property-type'].bed = parseInt(record['property-type'].bed.match(/\d+/g)[0], 10) 
            })
            const defaultSelectedRowKeys = data.map(record => record.key)
            console.log(data)
            setSelectedRowKeys(defaultSelectedRowKeys)
            setData(data)
        }
        fetchData()
    }, [])

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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
        const user_id = 'YSixicUz'

        console.log("Liked Properties", selectedRowKeys)
        // axios_instance.post('/get-liked-properties/${user_id}', {
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
        // {
        //     title: 'Name',
        //     dataIndex: 'name',
        // },
        {
            title: 'Rent',
            dataIndex: 'rent per month',
            // defaultSortOrder: 'descend',
            // sorter: (a, b) => a['rent per month'] - b['rent per month'],
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
                dataSource={data_liked_properties}
                pagination={{
                    pageSize: 20,
                    position: ['bottomCenter'],
                    showSizeChanger: false,
                }}
                expandable={{
                    expandedRowRender: (record) => (
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr',
                            }}
                        >
                            <span
                                style={{
                                    margin: 0,
                                }}
                            >
                                <span style={{fontWeight: '600' }} >Bed: </span>{record['property-type'].bed}
                            </span>
                            <span
                                style={{
                                    marginLeft: '20px',
                                }}
                            >
                                <span style={{fontWeight: '600' }} >Bath: </span>{record['property-type'].bath}
                            </span>
                            <span
                                style={{
                                    marginLeft: '20px',
                                }}
                            >
                                <span style={{fontWeight: '600' }} >Link: </span> <a href={`http://localhost:3000/listing/${record.key}`}>{`${record.key}`}</a>  
                            </span>
                        </div>
                    ),
                    rowExpandable: (record) => record.name !== 'Not Expandable',
                  }}
            />
            <Divider />
            <Button type='primary' onClick={submitInfo}>Save</Button>
        </div>
    )
}

export default LikedProperties