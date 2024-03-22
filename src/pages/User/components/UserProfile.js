import React, { useEffect, useState } from 'react';
import { Divider, Checkbox, Cascader } from 'antd';
import './UserProfile.scss'
import axios_instance from '@/utils';

const UserProfile = (props) => 
{

    const data = props.data;
    const [name, setName] = useState(data.name);
    const [bio, setBio] = useState(data.bio);
    const [phoneNumber, setPhoneNumber] = useState(data.phone_number);
    const [languages, setlanguages] = useState(data.selected_tags.languages);
    const [smoker, setsmoker] = useState(data.selected_tags.smoker);
    const [pets, setpets] = useState(data.selected_tags.pets);
    const [diet, setdiet] = useState(data.selected_tags.diet);
    const [allergies, setallergies] = useState(data.selected_tags.allergies);
    const [habit, sethabit] = useState(data.selected_tags.habit);
    const [work, setwork] = useState(data.selected_tags.work);

    const handleNameChange = (e) => {
        setName(e.target.value);
      };
    
    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleTagChange = (tag, setFunction, listName) => {
        if (listName.includes(tag)) 
        {
            setFunction(listName.filter(t => t !== tag)); // Remove tag if already exists
        } 
        else 
        {
            setFunction([...listName, tag]); // Add tag if not exists
        }
    };

    //Need special function for smoker as it can only have one tag
    const onSmokerChange = (tag) => {
        setsmoker([]);
        setsmoker(tag);
    };

    const handleSave = () => {
        data.name = name;
        data.phone_number = phoneNumber;
        data.bio = bio;
        data.selected_tags.languages = languages;
        data.selected_tags.smoker = smoker;
        data.selected_tags.pets = pets;
        data.selected_tags.diet = diet;
        data.selected_tags.allergies = allergies;
        data.selected_tags.habit = habit;
        data.selected_tags.work = work;
        console.log("Data Updated", data);
        // axios_instance.post('/update_user_info', {
        //     data
        // })
    };

    return (
        <span className="UserProfileBox">
            <h1 className='ProfileTitle'>User Profile</h1>
            <span className="UserProfile">
            <Divider />
            <span className="CurrentBio">
                <label className='SubProfileTitle'>Current Profile</label>
                <label>Name: {data.name} </label>
                <label>Bio: {data.bio}</label>
                <label>Phone Number: {data.phone_number} </label>
            </span>
            <Divider />
            <label className='SubProfileTitle'>Change Profile</label>
            <div className='UpdateProfile'>
                <div>
                    <label>Change Name:   </label>
                    <input type="text" value={name} onChange={handleNameChange} />
                </div>
                <label>Change Bio:   </label>
                <textarea value={bio} onChange={handleBioChange} />
                <div>
                    <label>Change Phone Number:   </label>
                    <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} />
                </div>
                <div className="Tags">
                    <label>Smoking Tags:   </label>
                    <Cascader placement={'bottomLeft'} options={[{value:"Smoker", label:"Smoker"}, {value:"Non-Smoker", label:"Non-Smoker"}, {value:"Social-Smoker", label:"Social Smoker"}]} onChange={onSmokerChange} placeholder={smoker.length === 0 ? "Please Select" : data.smoker} />
                </div>
                <div className="Tags">
                    <label>Language Tags:   </label>
                    <Checkbox checked={languages.includes('English')} onChange={() => handleTagChange('English', setlanguages, languages)}>
                        English
                    </Checkbox>
                    <Checkbox checked={languages.includes('Spanish')} onChange={() => handleTagChange('Spanish', setlanguages, languages)}>
                        Spanish
                    </Checkbox>
                    <Checkbox checked={languages.includes('French')} onChange={() => handleTagChange('French', setlanguages, languages)}>
                        French
                    </Checkbox>
                </div>
                <div className="Tags">
                    <label>Pet Tags:   </label>
                    <Checkbox checked={pets.includes('Dog-Friendly')} onChange={() => handleTagChange('Dog-Friendly', setpets, pets)}>
                        Dog-Friendly
                    </Checkbox>
                    <Checkbox checked={pets.includes('Cat-Friendly')} onChange={() => handleTagChange('Cat-Friendly', setpets, pets)}>
                        Cat-Friendly
                    </Checkbox>
                    <Checkbox checked={pets.includes('No-Pets')} onChange={() => handleTagChange('No-Pets', setpets, pets)}>
                        No Pets
                    </Checkbox>
                </div>
                <div className="Tags">
                    <label>Diet Tags:   </label>
                    <Checkbox checked={diet.includes('Vegan')} onChange={() => handleTagChange('Vegan', setdiet, diet)}>
                        Vegan
                    </Checkbox>
                    <Checkbox checked={diet.includes('Vegeterian')} onChange={() => handleTagChange('Vegeterian', setdiet, diet)}>
                        Vegeterian
                    </Checkbox>
                </div>
                <div className="Tags">
                    <label>Allergy Tags:   </label>
                    <Checkbox checked={allergies.includes('Peanuts')} onChange={() => handleTagChange('Peanuts', setallergies, allergies)}>
                        Peanuts
                    </Checkbox>
                    <Checkbox checked={allergies.includes('Shellfish')} onChange={() => handleTagChange('Shellfish', setallergies, allergies)}>
                        Shellfish
                    </Checkbox>
                </div>
                <div className="Tags">
                    <label>Habit Tags:   </label>
                    <Checkbox checked={habit.includes('Night-Owl')} onChange={() => handleTagChange('Night-Owl', sethabit, habit)}>
                        Night Owl
                    </Checkbox>
                    <Checkbox checked={habit.includes('Morning-Bird')} onChange={() => handleTagChange('Morning-Bird', sethabit, habit)}>
                        Morning Bird
                    </Checkbox>
                </div>
                <div className="Tags">
                    <label>Work Tags:   </label>
                    <Checkbox checked={work.includes('Work-From-Home')} onChange={() => handleTagChange('Work-From-Home', setwork, work)}>
                        Work From Home
                    </Checkbox>
                    <Checkbox checked={work.includes('Night-Worker')} onChange={() => handleTagChange('Night-Worker', setwork, work)}>
                        Night Worker
                    </Checkbox>
                </div>
                <button className="Submit" onClick={handleSave}>Save Changes</button>
            </div>
            </span>
        </span>
    )
}

export default UserProfile