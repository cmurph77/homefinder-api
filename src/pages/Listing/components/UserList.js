import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Divider, List, Skeleton, Modal, Descriptions, Tag } from 'antd';
import { axios_instance } from '@/utils';
import './UserList.scss'

const UserList = ({property_id}) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        axios_instance.get(`/get-propertys-liked-users/${property_id}`)
        .then((response) => {
            console.log(response.data)
            setData([...data, ...response.data])
            setLoading(false)
        })
        .catch(() => {
            setLoading(false);
        })
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    const showModal = (user) => {
        setCurrentUser(user);
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    return (
        <>
            <Modal
                title="User Detail"
                open={modalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Avatar" span={1} rowspan={2} ><Avatar src={currentUser?.profile_pic} /></Descriptions.Item>  
                    <Descriptions.Item label="Name">{currentUser?.name}</Descriptions.Item>
                    <Descriptions.Item label="Phone Number">
                        <a href={`https://wa.me/${currentUser?.phone_number}`}>{currentUser?.phone_number}</a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Biograph">{currentUser?.bio}</Descriptions.Item>
                </Descriptions>
            </Modal>
            <div
                id="scrollableDiv"
            >
                <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={data.length < 50}
                    endMessage={<Divider plain>It is all, nothing more</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item key={item.firebaseid}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.profile_pic} />}
                                    title={<a onClick={() => showModal(item)}>{item.name}</a>}
                                    description={Object.entries(data.selected_tags).map(([key, value]) => {
                                        if (key === 'languages') {
                                            return value.map((lang) => <Tag color='#108ee9'>{lang}</Tag>);
                                        }
                                        else if (key === 'smoker') {
                                            return <Tag color='geekblue'>{`${key}: ${value[0]}`}</Tag>;
                                        }
                                        else if (key === 'pets') {
                                            return <Tag color='cyan'>{`${key}: ${value[0]}`}</Tag>;
                                        }
                                        else if (key === 'diet') {
                                            return <Tag color='green'>{`${key}: ${value[0]}`}</Tag>;
                                        }
                                        else if (key === 'allergies') {
                                            return <Tag color='#2db7f5'>{`${key}: ${value[0]}`}</Tag>;
                                        }
                                        else if (key === 'habit') {
                                            return <Tag color='#90d6f7' style={{color: '#333'}}>{`${key}: ${value[0]}`}</Tag>;
                                        }
                                        else if (key === 'work') {
                                            return <Tag color='#76a9ef' style={{color: '#333'}}>{`${key}: ${value[0]}`}</Tag>;
                                        }
                                    })}
                                />
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>
        </>
    );
}

export default UserList