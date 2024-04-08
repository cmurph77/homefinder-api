import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Divider, List, Skeleton, Modal, Descriptions, Tag } from 'antd';
import { axios_instance } from '@/utils';
import './UserList.scss'

const dummy_user = {
    "firebase_id": "ykaiawrX",
    "name": "James Silva",
    "profile_pic": "https://i.pinimg.com/originals/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg",
    "selected_tags": {
      "languages": [
        "English",
        "Chinese",
        "French"
      ],
      "smoker": "Social smoker",
      "pets": "Dog-friendly",
      "diet": "Vegan",
      "allergies": "Peanuts",
      "habit": "Morning-bird",
      "work": "Work-from-home"
    },
    "phone_number": "797.746.4928x455",
    "bio": "Together place reduce themselves want environment heavy. Teacher expert that.\nField establish where attention role on defense memory. Baby manager international trade."
}

const UserList = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,phone,picture&noinfo')
        .then((res) => res.json())
        .then((body) => {
            setData([...data, ...body.results]);
            setLoading(false);
        })
        .catch(() => {
            setLoading(false);
        });
        // axios_instance.post
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    const showModal = (user) => {
        // const dummy_user = {
        //     "firebase_id": "ykaiawrX",
        //     "name": "James Silva",
        //     "profile_pic": "https://i.pinimg.com/originals/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg",
        //     "selected_tags": {
        //       "languages": [
        //         "English",
        //         "Chinese",
        //         "French"
        //       ],
        //       "smoker": "Social smoker",
        //       "pets": "Dog-friendly",
        //       "diet": "Vegan",
        //       "allergies": "Peanuts",
        //       "habit": "Morning-bird",
        //       "work": "Work-from-home"
        //     },
        //     "phone_number": "797.746.4928x455",
        //     "bio": "Together place reduce themselves want environment heavy. Teacher expert that.\nField establish where attention role on defense memory. Baby manager international trade."
        // }
        setCurrentUser(dummy_user);
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
                    loader={
                        <Skeleton
                            avatar
                            paragraph={{
                                rows: 1,
                            }}
                            active
                        />
                    }
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item key={item.email}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.picture.large} />}
                                    title={<a onClick={() => showModal(item)}>{item.name.last}</a>}
                                    description={Object.entries(dummy_user.selected_tags).map(([key, value]) => {
                                        if (key === 'languages') {
                                            return value.map((lang) => <Tag color='#108ee9'>{lang}</Tag>);
                                        }
                                        else if (key === 'smoker') {
                                            return <Tag color='geekblue'>{`${key}: ${value}`}</Tag>;
                                        }
                                        else if (key === 'pets') {
                                            return <Tag color='cyan'>{`${key}: ${value}`}</Tag>;
                                        }
                                        else if (key === 'diet') {
                                            return <Tag color='green'>{`${key}: ${value}`}</Tag>;
                                        }
                                        else if (key === 'allergies') {
                                            return <Tag color='#2db7f5'>{`${key}: ${value}`}</Tag>;
                                        }
                                        else if (key === 'habit') {
                                            return <Tag color='#90d6f7' style={{color: '#333'}}>{`${key}: ${value}`}</Tag>;
                                        }
                                        else if (key === 'work') {
                                            return <Tag color='#76a9ef' style={{color: '#333'}}>{`${key}: ${value}`}</Tag>;
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